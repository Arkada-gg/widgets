# Build & Release

The project has two separate build pipelines with different outputs and purposes.

---

## Two Build Pipelines

| | `npm run build` | `npm run build:lib` |
|---|---|---|
| Tool | Vite | tsup |
| Input | `src/web-components/index.ts` + widget entries | `src/index.ts` |
| Output | `dist/arkada-*.js` | `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts` |
| Format | ES modules only | ESM + CJS |
| React | Bundled in (self-contained) | Externalized (peer dep) |
| Use case | `<script type="module">` in any HTML | `import` from a React project / bundler |

Both outputs go to `dist/` and are included in the published package via `"files": ["dist"]`.

---

## Vite Build — Web Components

```bash
npm run build
# equivalent: tsc -b && vite build
```

Produces self-contained bundles where React and all dependencies are bundled in. Each file can be loaded with a single `<script type="module">` tag.

**Entries** (defined in `vite.config.ts`):

| Entry file | Output | Description |
|---|---|---|
| `src/web-components/index.ts` | `arkada-widgets.js` | All registered widgets in one file |
| `src/web-components/arkada-wvbs-widget.tsx` | `arkada-wvbs-widget.js` | Smart wallet verification button, standalone |

Shared CSS is injected into Shadow DOM at runtime via `src/index.css?inline` — no separate stylesheet needed.

---

## tsup Build — React NPM Package

```bash
npm run build:lib
# runs: tsup
```

Produces a tree-shakable package for React consumers. React and React DOM are externalized — the consumer's React installation is used.

**Config** (`tsup.config.ts`):

```ts
{
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
}
```

`splitting: false` — produces a single flat bundle per format, avoiding chunk resolution issues for consumers that don't use a bundler.

---

## What Gets Published

Controlled by `"files": ["dist"]` in `package.json`. Only the `dist/` directory is included.

```
dist/
  index.js              ← ESM (React package)
  index.cjs             ← CJS (React package)
  index.d.ts            ← TypeScript declarations
  arkada-widgets.js     ← All web components bundled
  arkada-wvbs-widget.js ← Standalone smart button web component
  arkada-widgets.css    ← Compiled Tailwind CSS (referenced by web components)
```

---

## Release Process

1. **Ensure the API types are up to date**

   ```bash
   npm run build-api
   ```

   If `src/shared/api/spec.json` has changed, commit the regenerated `types.ts` before releasing.

2. **Run TypeScript check**

   ```bash
   npx tsc --noEmit
   ```

3. **Build both pipelines**

   ```bash
   npm run build       # web component bundles
   npm run build:lib   # React NPM package
   ```

4. **Verify the dist output**

   Check that `dist/` contains all expected files. Spot-check that `index.d.ts` exports `WalletVerificationButton`.

5. **Bump the version**

   ```bash
   npm version patch   # or minor / major
   ```

   Follow [semver](https://semver.org/):
   - `patch` — bug fixes, no API changes
   - `minor` — new widget or new optional prop
   - `major` — breaking change to public API

6. **Publish**

   ```bash
   npm publish --access public
   ```

---

## Versioning Policy

The public API is defined by `src/index.ts`. Any change to what is exported from that file — a removed export, a renamed prop, a changed type — is a **breaking change** and requires a major version bump.

Internal changes (hook implementation, CSS, web component internals) that do not affect the public API are `patch` or `minor`.
