"use client";

export default function GridBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{
        backgroundImage:
          "linear-gradient(color-mix(in srgb, var(--foreground) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--foreground) 7%, transparent) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, var(--background) 100%)"
        }}
      />
    </div>
  );
}

