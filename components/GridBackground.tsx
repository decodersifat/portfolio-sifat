"use client";

export default function GridBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, #000000 85%)"
        }}
      />
    </div>
  );
}
