import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ChainGroupIcon({
  verified = false,
  ...props
}: IconProps & { verified?: boolean }) {
  return (
    <svg
      viewBox="0 0 72 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Left circle — red-to-blue gradient with triangle logo */}
      <circle cx={20} cy={24} r={20} fill="url(#cg-left-grad)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5 13L34 31H7L20.5 13ZM14.4384 27.2704H26.5616L20.5 19.1882L14.4384 27.2704Z"
        fill="white"
      />

      {/* Right circle — gray (unverified) or green (verified), with drop shadow */}
      <g filter="url(#cg-right-shadow)">
        <circle
          cx={48}
          cy={24}
          r={20}
          fill={verified ? "url(#cg-right-grad)" : "url(#cg-right-grad)"}
        />
      </g>

      {verified ? (
        <>
          <path
            opacity={0.25}
            d="M62 24C62 31.732 55.732 38 48 38C40.268 38 34 31.732 34 24C34 16.268 40.268 10 48 10C55.732 10 62 16.268 62 24Z"
            fill="#093217"
          />
          <g filter="url(#cg-check-blur-lg)">
            <path
              d="M54.6382 18.4055C55.1206 18.9463 55.1206 19.823 54.6382 20.3637L46.4029 29.5945C45.9205 30.1352 45.1383 30.1352 44.6559 29.5945L41.3618 25.9021C40.8794 25.3614 40.8794 24.4847 41.3618 23.944C41.8442 23.4033 42.6264 23.4033 43.1088 23.944L45.5294 26.6572L49.2103 22.5314L52.8912 18.4055C53.3736 17.8648 54.1558 17.8648 54.6382 18.4055Z"
              fill="white"
            />
          </g>
          <g filter="url(#cg-check-blur-sm)">
            <path
              d="M54.6382 18.4055C55.1206 18.9463 55.1206 19.823 54.6382 20.3637L46.4029 29.5945C45.9205 30.1352 45.1383 30.1352 44.6559 29.5945L41.3618 25.9021C40.8794 25.3614 40.8794 24.4847 41.3618 23.944C41.8442 23.4033 42.6264 23.4033 43.1088 23.944L45.5294 26.6572L49.2103 22.5314L52.8912 18.4055C53.3736 17.8648 54.1558 17.8648 54.6382 18.4055Z"
              fill="white"
            />
          </g>
          <path
            d="M54.6382 18.4055C55.1206 18.9463 55.1206 19.823 54.6382 20.3637L46.4029 29.5945C45.9205 30.1352 45.1383 30.1352 44.6559 29.5945L41.3618 25.9021C40.8794 25.3614 40.8794 24.4847 41.3618 23.944C41.8442 23.4033 42.6264 23.4033 43.1088 23.944L45.5294 26.6572L49.2103 22.5314L52.8912 18.4055C53.3736 17.8648 54.1558 17.8648 54.6382 18.4055Z"
            fill="white"
          />
        </>
      ) : (
        <g filter="url(#cg-wallet-shadow)">
          <path
            d="M58.8708 28.06C58.6068 31.0441 56.4834 33 53.4028 33H43.501C40.4645 33 38 30.4965 38 27.4118V19.5882C38 16.5482 39.8043 14.4247 42.6099 14.0671C42.8959 14.0224 43.193 14 43.501 14H53.4028C53.6889 14 53.9639 14.0112 54.228 14.0559C56.8575 14.3688 58.6398 16.2353 58.8708 18.94C58.9039 19.2641 58.6398 19.5324 58.3207 19.5324H56.6154C55.5592 19.5324 54.5801 19.9459 53.8759 20.6835C53.0398 21.5106 52.6217 22.6729 52.7207 23.8353C52.8967 25.8694 54.6571 27.4676 56.7475 27.4676H58.3207C58.6398 27.4676 58.9039 27.7359 58.8708 28.06Z"
            fill="white"
          />
          <path
            d="M60 22.349V24.6514C60 25.2661 59.5159 25.769 58.8998 25.7914H56.7434C55.5552 25.7914 54.466 24.9085 54.367 23.7014C54.3009 22.9973 54.565 22.3379 55.0271 21.8796C55.4342 21.4549 55.9953 21.209 56.6114 21.209H58.8998C59.5159 21.2314 60 21.7343 60 22.349Z"
            fill="white"
          />
        </g>
      )}

      <defs>
        <filter
          id="cg-right-shadow"
          x={24}
          y={0}
          width={48}
          height={48}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>

        {verified ? (
          <>
            <filter
              id="cg-check-blur-lg"
              x={33}
              y={10}
              width={30}
              height={28}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation={4}
                result="effect1_foregroundBlur"
              />
            </filter>
            <filter
              id="cg-check-blur-sm"
              x={37}
              y={14}
              width={22}
              height={20}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation={2}
                result="effect1_foregroundBlur"
              />
            </filter>
            <linearGradient
              id="cg-right-grad"
              x1={28}
              y1={4}
              x2={68}
              y2={44}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#88F9AD" />
              <stop offset={1} stopColor="#41BD6A" />
            </linearGradient>
          </>
        ) : (
          <>
            <filter
              id="cg-wallet-shadow"
              x={34}
              y={12}
              width={30}
              height={27}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy={2} />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>
            <linearGradient
              id="cg-right-grad"
              x1={28}
              y1={4}
              x2={68}
              y2={44}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#BFBFBF" />
              <stop offset={1} stopColor="#696969" />
            </linearGradient>
          </>
        )}

        <linearGradient
          id="cg-left-grad"
          x1={-5.577}
          y1={44.571}
          x2={49.84}
          y2={36.854}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF6A59" />
          <stop offset={1} stopColor="#5377FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Toggle switch icon for compact-minimal variant.
 * Unverified: gray pill + white circle on left (off).
 * Verified: green pill + white checkmark circle on right (on).
 * Proportions: 58w × 32h (matching Figma).
 */
export function ToggleIcon({
  verified = false,
  ...props
}: IconProps & { verified?: boolean }) {
  return (
    <svg
      viewBox="0 0 59 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {verified ? (
        <>
          <rect y={1} width={58} height={32} rx={16} fill="#50C978" />
          <g filter="url(#ti-circle-shadow)">
            <circle cx={42} cy={17} r={13} fill="white" />
          </g>
          <path
            d="M47.6899 12.338C48.1034 12.7886 48.1034 13.5191 47.6899 13.9697L40.6311 21.662C40.2176 22.1127 39.5471 22.1127 39.1337 21.662L36.3101 18.5851C35.8966 18.1345 35.8966 17.4039 36.3101 16.9533C36.7236 16.5027 37.394 16.5027 37.8075 16.9533L39.8824 19.2144L43.0374 15.7762L46.1925 12.338C46.606 11.8873 47.2764 11.8873 47.6899 12.338Z"
            fill="#50C978"
          />
          <defs>
            <filter
              id="ti-circle-shadow"
              x={25}
              y={0}
              width={34}
              height={34}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>
          </defs>
        </>
      ) : (
        <>
          <rect x={1} y={1} width={58} height={32} rx={16} fill="#535353" />
          <g filter="url(#ti-circle-shadow)">
            <circle cx={17} cy={17} r={13} fill="white" />
          </g>
          <defs>
            <filter
              id="ti-circle-shadow"
              x={0}
              y={0}
              width={34}
              height={34}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>
          </defs>
        </>
      )}
    </svg>
  );
}

/**
 * Large wallet circle icon for floating variants.
 * 60×60 metallic gray circle with wallet silhouette.
 */
export function WalletCircleIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <circle cx="20" cy="20" r="20" fill="url(#paint0_linear_8567_93038)" />
      <g filter="url(#filter0_d_8567_93038)">
        <path
          d="M30.8708 24.06C30.6068 27.0441 28.4834 29 25.4028 29H15.501C12.4645 29 10 26.4965 10 23.4118V15.5882C10 12.5482 11.8043 10.4247 14.6099 10.0671C14.8959 10.0224 15.193 10 15.501 10H25.4028C25.6889 10 25.9639 10.0112 26.228 10.0559C28.8575 10.3688 30.6398 12.2353 30.8708 14.94C30.9039 15.2641 30.6398 15.5324 30.3207 15.5324H28.6154C27.5592 15.5324 26.5801 15.9459 25.8759 16.6835C25.0398 17.5106 24.6217 18.6729 24.7207 19.8353C24.8967 21.8694 26.6571 23.4676 28.7475 23.4676H30.3207C30.6398 23.4676 30.9039 23.7359 30.8708 24.06Z"
          fill="white"
        />
        <path
          d="M32 18.349V20.6514C32 21.2661 31.5159 21.769 30.8998 21.7914H28.7434C27.5552 21.7914 26.466 20.9085 26.367 19.7014C26.3009 18.9973 26.565 18.3379 27.0271 17.8796C27.4342 17.4549 27.9953 17.209 28.6114 17.209H30.8998C31.5159 17.2314 32 17.7343 32 18.349Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_8567_93038"
          x="6"
          y="8"
          width="30"
          height="27"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_8567_93038"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_8567_93038"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_8567_93038"
          x1="0"
          y1="0"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#BFBFBF" />
          <stop offset="1" stop-color="#696969" />
        </linearGradient>
      </defs>
    </svg>
  );
}
/**
 * Large wallet circle icon for floating variants.
 * 60×60 colorfull circle with wallet silhouette.
 */
export function WalletCircleGradientIcon(props: IconProps) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="24" cy="24" r="24" fill="url(#paint0_linear_10313_34517)" />
      <g filter="url(#filter0_d_10313_34517)">
        <path
          d="M33.8708 28.06C33.6068 31.0441 31.4834 33 28.4028 33H18.501C15.4645 33 13 30.4965 13 27.4118V19.5882C13 16.5482 14.8043 14.4247 17.6099 14.0671C17.8959 14.0224 18.193 14 18.501 14H28.4028C28.6889 14 28.9639 14.0112 29.228 14.0559C31.8575 14.3688 33.6398 16.2353 33.8708 18.94C33.9039 19.2641 33.6398 19.5324 33.3207 19.5324H31.6154C30.5592 19.5324 29.5801 19.9459 28.8759 20.6835C28.0398 21.5106 27.6217 22.6729 27.7207 23.8353C27.8967 25.8694 29.6571 27.4676 31.7475 27.4676H33.3207C33.6398 27.4676 33.9039 27.7359 33.8708 28.06Z"
          fill="white"
        />
        <path
          d="M35 22.349V24.6514C35 25.2661 34.5159 25.769 33.8998 25.7914H31.7434C30.5552 25.7914 29.466 24.9085 29.367 23.7014C29.3009 22.9973 29.565 22.3379 30.0271 21.8796C30.4342 21.4549 30.9953 21.209 31.6114 21.209H33.8998C34.5159 21.2314 35 21.7343 35 22.349Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_10313_34517"
          x="9"
          y="12"
          width="30"
          height="27"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_10313_34517"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_10313_34517"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_10313_34517"
          x1="-6.69231"
          y1="48.6857"
          x2="59.8085"
          y2="39.4246"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF6A59" />
          <stop offset="1" stop-color="#5377FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Green circle checkmark — 60×60 for floating, scaled for others */
export function CheckCircleIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <circle cx="20" cy="20" r="20" fill="url(#paint0_linear_8567_93055)" />
      <path
        opacity="0.25"
        d="M34 20C34 27.732 27.732 34 20 34C12.268 34 6 27.732 6 20C6 12.268 12.268 6 20 6C27.732 6 34 12.268 34 20Z"
        fill="#093217"
      />
      <g filter="url(#filter0_f_8567_93055)">
        <path
          d="M26.6382 14.4055C27.1206 14.9463 27.1206 15.823 26.6382 16.3637L18.4029 25.5945C17.9205 26.1352 17.1383 26.1352 16.6559 25.5945L13.3618 21.9021C12.8794 21.3614 12.8794 20.4847 13.3618 19.944C13.8442 19.4033 14.6264 19.4033 15.1088 19.944L17.5294 22.6572L21.2103 18.5314L24.8912 14.4055C25.3736 13.8648 26.1558 13.8648 26.6382 14.4055Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter1_f_8567_93055)">
        <path
          d="M26.6382 14.4055C27.1206 14.9463 27.1206 15.823 26.6382 16.3637L18.4029 25.5945C17.9205 26.1352 17.1383 26.1352 16.6559 25.5945L13.3618 21.9021C12.8794 21.3614 12.8794 20.4847 13.3618 19.944C13.8442 19.4033 14.6264 19.4033 15.1088 19.944L17.5294 22.6572L21.2103 18.5314L24.8912 14.4055C25.3736 13.8648 26.1558 13.8648 26.6382 14.4055Z"
          fill="white"
        />
      </g>
      <path
        d="M26.6382 14.4055C27.1206 14.9463 27.1206 15.823 26.6382 16.3637L18.4029 25.5945C17.9205 26.1352 17.1383 26.1352 16.6559 25.5945L13.3618 21.9021C12.8794 21.3614 12.8794 20.4847 13.3618 19.944C13.8442 19.4033 14.6264 19.4033 15.1088 19.944L17.5294 22.6572L21.2103 18.5314L24.8912 14.4055C25.3736 13.8648 26.1558 13.8648 26.6382 14.4055Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_f_8567_93055"
          x="5"
          y="6"
          width="30"
          height="28"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4"
            result="effect1_foregroundBlur_8567_93055"
          />
        </filter>
        <filter
          id="filter1_f_8567_93055"
          x="9"
          y="10"
          width="22"
          height="20"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_8567_93055"
          />
        </filter>
        <linearGradient
          id="paint0_linear_8567_93055"
          x1="0"
          y1="0"
          x2="40"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#88F9AD" />
          <stop offset="1" stop-color="#41BD6A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Green circle checkmark — 60×60 for floating, scaled for others */
export function CheckCircleFilledIcon(props: IconProps) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="24" cy="24" r="24" fill="url(#paint0_linear_10312_34504)" />
      <g filter="url(#filter0_f_10312_34504)">
        <path
          d="M33.4831 16.0081C34.1723 16.7805 34.1723 18.0329 33.4831 18.8054L21.7184 31.9922C21.0293 32.7647 19.9119 32.7647 19.2228 31.9922L14.5169 26.7175C13.8277 25.945 13.8277 24.6926 14.5169 23.9201C15.206 23.1477 16.3234 23.1477 17.0125 23.9201L20.4706 27.7962L25.729 21.9021L30.9875 16.0081C31.6766 15.2356 32.794 15.2356 33.4831 16.0081Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter1_f_10312_34504)">
        <path
          d="M33.4831 16.0081C34.1723 16.7805 34.1723 18.0329 33.4831 18.8054L21.7184 31.9922C21.0293 32.7647 19.9119 32.7647 19.2228 31.9922L14.5169 26.7175C13.8277 25.945 13.8277 24.6926 14.5169 23.9201C15.206 23.1477 16.3234 23.1477 17.0125 23.9201L20.4706 27.7962L25.729 21.9021L30.9875 16.0081C31.6766 15.2356 32.794 15.2356 33.4831 16.0081Z"
          fill="white"
        />
      </g>
      <path
        d="M33.4831 16.0081C34.1723 16.7805 34.1723 18.0329 33.4831 18.8054L21.7184 31.9922C21.0293 32.7647 19.9119 32.7647 19.2228 31.9922L14.5169 26.7175C13.8277 25.945 13.8277 24.6926 14.5169 23.9201C15.206 23.1477 16.3234 23.1477 17.0125 23.9201L20.4706 27.7962L25.729 21.9021L30.9875 16.0081C31.6766 15.2356 32.794 15.2356 33.4831 16.0081Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_f_10312_34504"
          x="6"
          y="7.42871"
          width="36"
          height="33.1426"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4"
            result="effect1_foregroundBlur_10312_34504"
          />
        </filter>
        <filter
          id="filter1_f_10312_34504"
          x="10"
          y="11.4287"
          width="28"
          height="25.1426"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_10312_34504"
          />
        </filter>
        <linearGradient
          id="paint0_linear_10312_34504"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#7DEFA3" />
          <stop offset="1" stop-color="#00A236" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Small green check for inline use (pill/outlined verified icon zone) */
export function CheckSmallIcon(props: IconProps) {
  return (
    <svg
      width="36"
      height="34"
      viewBox="0 0 36 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_f_8567_93098)">
        <path
          d="M27.4831 8.57935C28.1723 9.35181 28.1723 10.6042 27.4831 11.3767L15.7184 24.5635C15.0293 25.336 13.9119 25.336 13.2228 24.5635L8.51687 19.2888C7.82771 18.5163 7.82771 17.2639 8.51687 16.4914C9.20603 15.719 10.3234 15.719 11.0125 16.4914L14.4706 20.3675L19.729 14.4734L24.9875 8.57935C25.6766 7.80688 26.794 7.80688 27.4831 8.57935Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter1_f_8567_93098)">
        <path
          d="M27.4831 8.57935C28.1723 9.35181 28.1723 10.6042 27.4831 11.3767L15.7184 24.5635C15.0293 25.336 13.9119 25.336 13.2228 24.5635L8.51687 19.2888C7.82771 18.5163 7.82771 17.2639 8.51687 16.4914C9.20603 15.719 10.3234 15.719 11.0125 16.4914L14.4706 20.3675L19.729 14.4734L24.9875 8.57935C25.6766 7.80688 26.794 7.80688 27.4831 8.57935Z"
          fill="white"
        />
      </g>
      <path
        d="M27.4831 8.57935C28.1723 9.35181 28.1723 10.6042 27.4831 11.3767L15.7184 24.5635C15.0293 25.336 13.9119 25.336 13.2228 24.5635L8.51687 19.2888C7.82771 18.5163 7.82771 17.2639 8.51687 16.4914C9.20603 15.719 10.3234 15.719 11.0125 16.4914L14.4706 20.3675L19.729 14.4734L24.9875 8.57935C25.6766 7.80688 26.794 7.80688 27.4831 8.57935Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_f_8567_93098"
          x="0"
          y="0"
          width="36"
          height="33.1426"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="4"
            result="effect1_foregroundBlur_8567_93098"
          />
        </filter>
        <filter
          id="filter1_f_8567_93098"
          x="4"
          y="4"
          width="28"
          height="25.1426"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_8567_93098"
          />
        </filter>
      </defs>
    </svg>
  );
}

/** Double chevron right for pill/pill-wide unverified icon zone */
export function ChevronsRightIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <mask
        id="mask0_8568_93157"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <rect width="32" height="32" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_8568_93157)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.1257 7.13058C14.6787 6.57757 15.5746 6.57757 16.1277 7.13058L24.1384 15.1403C24.6914 15.6934 24.6914 16.5903 24.1384 17.1433L16.1277 25.154C15.5747 25.7067 14.6786 25.7068 14.1257 25.154C13.5727 24.601 13.5727 23.7041 14.1257 23.1511L21.1345 16.1413L14.1257 9.13253C13.5727 8.57956 13.5728 7.68361 14.1257 7.13058Z"
          fill="url(#paint0_linear_8568_93157)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.12556 7.12947C7.67849 6.57655 8.57545 6.57672 9.12849 7.12947L17.1392 15.1402L17.2369 15.2476C17.6905 15.8038 17.6577 16.6247 17.1392 17.1431L9.12849 25.1539C8.57546 25.7067 7.67852 25.7068 7.12556 25.1539C6.57271 24.6009 6.57275 23.704 7.12556 23.151L14.1343 16.1412L7.12556 9.1324C6.57281 8.57937 6.57265 7.6824 7.12556 7.12947Z"
          fill="url(#paint1_linear_8568_93157)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_8568_93157"
          x1="24.4996"
          y1="15.9999"
          x2="14.9999"
          y2="15.9999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_8568_93157"
          x1="17.501"
          y1="15.9995"
          x2="5.99994"
          y2="15.9995"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.5" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Shield/alert icon for outlined variant unverified icon zone */
export function ShieldAlertIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 22 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 1L20 5.5v5c0 4.5-3.2 7.5-9 9-5.8-1.5-9-4.5-9-9v-5L11 1Z"
        fill="currentColor"
        opacity={0.2}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M11 7v3.5"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <circle cx={11} cy={13.5} r={1} fill="currentColor" />
    </svg>
  );
}
