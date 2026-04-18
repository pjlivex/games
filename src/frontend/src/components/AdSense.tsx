import { useEffect, useRef } from "react";

type AdSlot = "header" | "sidebar" | "content" | "game-top" | "game-bottom";

interface AdSenseProps {
  slot: AdSlot;
  className?: string;
}

const SLOT_CONFIGS: Record<
  AdSlot,
  { label: string; minHeight: string; adSlotId: string }
> = {
  header: {
    label: "Advertisement — 728×90",
    minHeight: "90px",
    adSlotId: "1234567890",
  },
  sidebar: {
    label: "Advertisement — 300×250",
    minHeight: "250px",
    adSlotId: "2345678901",
  },
  content: {
    label: "Advertisement — 728×90",
    minHeight: "90px",
    adSlotId: "3456789012",
  },
  "game-top": {
    label: "Advertisement — 970×90",
    minHeight: "90px",
    adSlotId: "4567890123",
  },
  "game-bottom": {
    label: "Advertisement — 728×90",
    minHeight: "90px",
    adSlotId: "5678901234",
  },
};

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function AdSense({ slot, className = "" }: AdSenseProps) {
  const config = SLOT_CONFIGS[slot];
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    if (typeof window !== "undefined" && window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
        pushed.current = true;
      } catch {
        // AdSense not loaded yet
      }
    }
  }, []);

  const isAdSenseLoaded = typeof window !== "undefined" && !!window.adsbygoogle;

  if (isAdSenseLoaded) {
    return (
      <div className={`overflow-hidden ${className}`} data-ad-slot={slot}>
        {/* AdSense Banner */}
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXX"
          data-ad-slot={config.adSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Placeholder shown when AdSense is not yet loaded
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-border bg-muted/30 rounded-lg ${className}`}
      style={{ minHeight: config.minHeight }}
      data-ad-slot={slot}
    >
      <div className="text-center">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest select-none">
          Advertisement
        </p>
        <p className="text-xs text-muted-foreground/50 mt-0.5 select-none">
          {config.label}
        </p>
      </div>
    </div>
  );
}
