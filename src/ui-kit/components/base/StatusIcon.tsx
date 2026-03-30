import { cn } from "@/shared/utils/cn";

export type StatusType = "verified" | "unverified" | "outdated";

const statusConfig: Record<
  StatusType,
  { bg: string; icon: "check" | "cross" | "clock" }
> = {
  verified: { bg: "bg-accent", icon: "check" },
  unverified: { bg: "bg-[#9a9a9a]", icon: "cross" },
  outdated: { bg: "bg-[#f59e0b]", icon: "clock" },
};

export interface StatusIconProps {
  status: StatusType;
  size?: number;
  className?: string;
}

export function StatusIcon({ status, size = 32, className }: StatusIconProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "relative inline-grid place-items-center rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.2)]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#d9d9d9] to-[#a0a0a0]" />
      {/* Inner circle */}
      <div className="absolute inset-[3px] rounded-full bg-gradient-to-b from-[#e8e8e8] to-[#c0c0c0]" />
      {/* Icon */}
      <div
        className={cn(
          "absolute inset-[25%] flex items-center justify-center",
          config.bg,
          "rounded-full",
        )}
      >
        {config.icon === "cross" && (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            className="w-[60%] h-[60%]"
            aria-hidden="true"
          >
            <path
              d="M3 3l6 6M9 3l-6 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
        {config.icon === "check" && (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            className="w-[60%] h-[60%]"
            aria-hidden="true"
          >
            <path
              d="M2.5 6l3 3 4.5-5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {config.icon === "clock" && (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            className="w-[60%] h-[60%]"
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="4" stroke="white" strokeWidth="1.5" />
            <path
              d="M6 4v2.5l1.5 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
