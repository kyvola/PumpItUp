import StreamerCard, { type Streamer } from "@/components/StreamerCard";

// Placeholder data while API integration is skipped
const MOCK_STREAMERS: Streamer[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `mock-${i + 1}`,
  name: `Streamer ${i + 1}`,
  title: "Grinding to top 10 — come hang!",
  viewers: Math.floor(Math.random() * 5000) + 50,
  thumbnail: `https://picsum.photos/seed/stream-${i + 1}/640/360`,
  url: "https://pump.fun/live",
}));

export default async function HighlightedStreamers() {
  const streamers = MOCK_STREAMERS.sort((a, b) => b.viewers - a.viewers).slice(0, 10);
  const duplicated = [...streamers, ...streamers];

  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Highlighted Streamers</h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex gap-4 animate-marquee will-change-transform">
          {duplicated.map((s, idx) => (
            <StreamerCard key={`${s.id}-${idx}`} streamer={s} />
          ))}
        </div>
      </div>
    </section>
  );
}


