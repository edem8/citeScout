export default function GridBackground() {
  return (
    <>
      {/* Grid overlay that fades from outside to inside */}
      <div
        className="absolute inset-0 pointer-events-none z-[-2] grid-background top-30"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(52, 84, 87, 0.8) 0.4px, transparent 0.5px),
              linear-gradient(to bottom, rgba(52, 84, 87, 0.8) 0.4px, transparent 0.5px)`,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, transparent 80%)",
        }}
        aria-hidden="true"
      />
      {/* Dark Top overlay  */}
      <div
        className="absolute inset-0 z-[-1] pointer-events-none mix-blend-multiply"
        style={{
          background: `
        linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.95) 0px,
          rgba(0, 0, 0, 0.9) 200px,
          rgba(0, 0, 0, 0.6) 400px,
          rgba(0, 0, 0, 0.3) 600px,
          rgba(0, 0, 0, 0.1) 800px,
          rgba(0, 0, 0, 0) 1000px
        )
      `,
        }}
        aria-hidden="true"
      />

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[-3] grid-gradient"
        style={{
          background:
            "radial-gradient(70% 70% at 50% 60%, transparent 90%, #54787C 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}

// saving this gradient for later
// "radial-gradient(70% 70% at 50% 50%, transparent 0%, rgba(225, 233, 250, 0.05) 100%)",
