import { cn } from "@/lib/utils";

const VortXLogo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      className="h-12 text-primary"
      fill="currentColor"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <text
        x="10"
        y="40"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="40"
        fontWeight="bold"
        fill="url(#grad1)"
      >
        VORT-X
      </text>
      <path d="M 85 15 L 100 45 L 115 15 L 130 45" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.3" />
    </svg>
  );
  

export default function SplashScreen() {
    return (
        <div className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background",
            "splash-screen"
        )}>
            <div className="splash-logo">
                <VortXLogo />
            </div>
            <p className="text-muted-foreground text-sm mt-2 splash-logo">The LinkedIn for Gamers</p>
        </div>
    )
}
