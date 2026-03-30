import { getCloudflareLink } from "@/shared/utils/cloudflare";
import { cn } from "@/shared/utils/cn";

export interface ProgressMilestone {
  position: number; // 0-100 percent
  icon: string; // R2 asset path
  reached: boolean;
}

export interface ProgressBarProps {
  progress: number; // 0-100
  milestones: ProgressMilestone[];
  currentPosition?: number; // marker position 0-100
  className?: string;
}

export function ProgressBar({
  progress,
  milestones,
  currentPosition,
  className,
}: ProgressBarProps) {
  return (
    <div className={cn("relative flex items-center w-full", className)}>
      {/* Track */}
      <div className="relative w-full h-2 bg-(--arkada-bg-progress-track) rounded-full overflow-visible">
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-[#ff6a59] to-[#5377ff]"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />

        {/* Milestones */}
        {milestones.map((milestone, i) => (
          <div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${milestone.position}%` }}
          >
            <img
              src={getCloudflareLink(milestone.icon)}
              alt=""
              className={cn(
                "w-3.5 h-3.5",
                !milestone.reached && "opacity-40 grayscale",
              )}
            />
          </div>
        ))}

        {/* Current position marker */}
        {currentPosition !== undefined && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3"
            style={{ left: `${currentPosition}%` }}
          >
            <div className="w-full h-full rounded-full bg-white shadow-md border-2 border-accent" />
          </div>
        )}
      </div>
    </div>
  );
}
