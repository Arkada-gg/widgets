import { cn } from "@/shared/utils/cn";
import { getCloudflareLink } from "@/shared/utils/cloudflare";

export interface NetworkIconProps {
  icon: string; // R2 asset path
  name: string;
  size?: number;
  className?: string;
}

export function NetworkIcon({
  icon,
  name,
  size = 32,
  className,
}: NetworkIconProps) {
  return (
    <div
      className={cn("relative shrink-0 rounded-full overflow-hidden", className)}
      style={{ width: size, height: size }}
    >
      <img
        src={getCloudflareLink(icon)}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
