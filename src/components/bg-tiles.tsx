import { cn } from "~/lib/utils";

export default function BgTiles({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        "absolute inset-0 -z-10 h-full w-full stroke-border opacity-20 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]",
        className,
      )}
      aria-hidden
    >
      <defs>
        <pattern
          id="bg-tiles"
          width="200"
          height="200"
          x="50%"
          y="-1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill="url(#bg-tiles)" />
    </svg>
  );
}
