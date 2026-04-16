"use client";

const TICKER_ITEMS = [
  "KUBERNETES",
  "OPENTELEMETRY",
  "DOMAIN-DRIVEN DESIGN",
  "CLOUD ARCHITECTURE",
  "RABBITMQ",
  "NODE.JS",
  ".NET",
  "MICROSERVICES",
  "CQRS",
  "DOCKER",
  "AZURE",
  "AWS",
];

export default function TickerStrip() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="ticker-strip py-3 overflow-hidden">
      <div className="ticker-inner">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 px-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="text-[12px] md:text-[13px] tracking-[0.15em] text-muted uppercase">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}


