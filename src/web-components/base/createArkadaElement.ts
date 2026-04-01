import styles from "@/index.css?inline";
import type { WidgetSize, WidgetTheme } from "@/shared/config";
import { DEFAULT_SIZE, DEFAULT_THEME } from "@/shared/config";
import React from "react";
import ReactDOM from "react-dom/client";

// ---------------------------------------------------------------------------
// Module-level: one shared CSSStyleSheet for Tailwind + theme CSS.
// Shared across ALL widget types that originate from this module instance.
// ---------------------------------------------------------------------------
let _sharedSheet: CSSStyleSheet | null = null;

function getSharedSheet(): CSSStyleSheet {
  if (!_sharedSheet) {
    _sharedSheet = new CSSStyleSheet();
    _sharedSheet.replaceSync(styles);
  }
  return _sharedSheet;
}

function supportsAdoptedStyleSheets(): boolean {
  return (
    typeof CSSStyleSheet !== "undefined" &&
    typeof CSSStyleSheet.prototype.replaceSync === "function" &&
    "adoptedStyleSheets" in ShadowRoot.prototype
  );
}

/**
 * Derive the URL of the co-located arkada-widgets.css from this module's URL.
 * Vite preserves import.meta.url in ES library output.
 */
function getCssUrl(override?: string): string {
  return override ?? new URL("./arkada-widgets.css", import.meta.url).href;
}

/**
 * Adopt sheets into a shadow root without duplicating already-present sheets.
 * Preserves any sheets attached by other code.
 */
function adoptSheets(shadowRoot: ShadowRoot, sheets: CSSStyleSheet[]): void {
  const current = [...shadowRoot.adoptedStyleSheets];
  let changed = false;
  for (const sheet of sheets) {
    if (!current.includes(sheet)) {
      current.push(sheet);
      changed = true;
    }
  }
  if (changed) {
    shadowRoot.adoptedStyleSheets = current;
  }
}

// ---------------------------------------------------------------------------

export interface ArkadaElementConfig<TData> {
  /** The React component to render inside Shadow DOM */
  component: React.ComponentType<{
    data: TData;
    theme?: WidgetTheme;
    size?: WidgetSize;
    [key: string]: unknown;
  }>;
  /** Additional observed attributes beyond the shared ones (theme, size, data) */
  observedAttributes?: string[];
  /**
   * Map of event handler prop names to event config.
   * e.g. { onVerify: { eventName: "verify", buildDetail: (el, args) => ({ entryId: args[0] }) } }
   * Simpler form: { onVerify: "verify" } — detail is the first argument passed to the handler.
   */
  events?: Record<
    string,
    | string
    | {
        eventName: string;
        buildDetail: (el: HTMLElement, args: unknown[]) => unknown;
      }
  >;
  /**
   * Widget-specific CSS injected only into this widget type's shadow root.
   * Import the CSS file with ?inline and pass the string here.
   * Example: import widgetStyles from "./styles/widget.css?inline"
   *
   * CSS custom properties (--my-token) defined on :root or any ancestor
   * pierce the Shadow DOM boundary naturally — consumers can override
   * widget tokens by setting custom properties on the host element:
   *   arkada-wv-widget { --arkada-bg: #fff; }
   */
  widgetStyles?: string;
  /**
   * Override CSS file URL for the legacy <link> fallback.
   * Defaults to auto-detection: ./arkada-widgets.css relative to this module.
   */
  cssUrl?: string;
}

const SHARED_ATTRIBUTES = ["theme", "size", "data"] as const;

export function createArkadaElement<TData>(config: ArkadaElementConfig<TData>) {
  const allObserved = [
    ...SHARED_ATTRIBUTES,
    ...(config.observedAttributes ?? []),
  ];

  // ---------------------------------------------------------------------------
  // Per-widget-type CSSStyleSheet — CLOSURE-SCOPED, not module-level.
  // Each call to createArkadaElement() gets its own _widgetSheet variable,
  // so arkada-wv-widget and arkada-wvbs-widget have separate sheets.
  // ---------------------------------------------------------------------------
  let _widgetSheet: CSSStyleSheet | null = null;

  function getWidgetSheet(): CSSStyleSheet {
    if (!_widgetSheet) {
      _widgetSheet = new CSSStyleSheet();
      _widgetSheet.replaceSync(config.widgetStyles!);
    }
    return _widgetSheet;
  }

  return class extends HTMLElement {
    static observedAttributes = allObserved;

    private _root: ReactDOM.Root | null = null;
    private _shadowRoot: ShadowRoot;
    private _mountPoint: HTMLDivElement;
    private _data: TData | null = null;

    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });

      if (supportsAdoptedStyleSheets()) {
        // Modern path: shared sheet + optional per-widget sheet.
        // adoptSheets() deduplicates — safe to call on every instance.
        const sheets: CSSStyleSheet[] = [getSharedSheet()];
        if (config.widgetStyles) {
          sheets.push(getWidgetSheet());
        }
        adoptSheets(this._shadowRoot, sheets);
      } else {
        // Legacy fallback (Safari < 16.4):
        // Preload shared CSS in <head> to reduce FOUC — one preload per URL.
        const href = getCssUrl(config.cssUrl);
        const preloadSel = `link[rel="preload"][as="style"][href="${href}"]`;
        if (!document.head.querySelector(preloadSel)) {
          const preload = document.createElement("link");
          preload.rel = "preload";
          preload.as = "style";
          preload.href = href;
          preload.crossOrigin = "anonymous";
          document.head.appendChild(preload);
        }
        // Shared CSS via <link> — HTTP-cached, browser deduplicates parsing
        // across same-href links on the page.
        const linkEl = document.createElement("link");
        linkEl.rel = "stylesheet";
        linkEl.href = href;
        linkEl.crossOrigin = "anonymous";
        this._shadowRoot.appendChild(linkEl);

        // Per-widget CSS as inline <style> (small, synchronous, no FOUC).
        if (config.widgetStyles) {
          const styleEl = document.createElement("style");
          styleEl.textContent = config.widgetStyles;
          this._shadowRoot.appendChild(styleEl);
        }
      }

      this._mountPoint = document.createElement("div");
      this._mountPoint.style.width = "100%";
      this._mountPoint.style.height = "100%";
      this._shadowRoot.appendChild(this._mountPoint);
    }

    connectedCallback() {
      // Ensure theme attribute is always present so :host([theme]) CSS matches.
      // Without this, :host(:not([theme])) would be the only fallback selector.
      if (!this.hasAttribute("theme")) {
        this.setAttribute("theme", DEFAULT_THEME);
      }
      this.style.display = "block";
      this._root = ReactDOM.createRoot(this._mountPoint);
      this._render();
    }

    disconnectedCallback() {
      this._root?.unmount();
      this._root = null;
    }

    attributeChangedCallback() {
      this._render();
    }

    set data(value: TData) {
      this._data = value;
      this._render();
    }

    get data(): TData | null {
      return this._data;
    }

    private _render() {
      if (!this._root) return;

      let data = this._data;
      if (!data) {
        const dataAttr = this.getAttribute("data");
        if (dataAttr) {
          try {
            data = JSON.parse(dataAttr) as TData;
          } catch {
            console.error(
              `[${this.tagName.toLowerCase()}] Invalid JSON in data attribute`,
            );
            return;
          }
        }
      }

      if (!data) return;

      const theme =
        (this.getAttribute("theme") as WidgetTheme) || DEFAULT_THEME;
      const size = (this.getAttribute("size") as WidgetSize) || DEFAULT_SIZE;

      const eventProps: Record<string, (...args: unknown[]) => void> = {};
      if (config.events) {
        for (const [propName, eventConfig] of Object.entries(config.events)) {
          const isSimple = typeof eventConfig === "string";
          const eventName = isSimple ? eventConfig : eventConfig.eventName;
          const buildDetail = isSimple
            ? (_el: HTMLElement, args: unknown[]) =>
                args.length === 1 ? args[0] : args
            : eventConfig.buildDetail;

          eventProps[propName] = (...args: unknown[]) => {
            this.dispatchEvent(
              new CustomEvent(eventName, {
                detail: buildDetail(this, args),
                bubbles: true,
                composed: true,
              }),
            );
          };
        }
      }

      this._root.render(
        React.createElement(config.component, {
          data,
          theme,
          size,
          ...eventProps,
        }),
      );
    }
  };
}
