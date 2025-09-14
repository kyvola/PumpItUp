import LeaderboardTable, { type Leader } from "@/components/LeaderboardTable";

async function fetchLeaders(): Promise<Leader[]> {
  try {
    const res = await fetch("https://pump.fun/live", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch");
    // Without official JSON, use placeholder data temporarily
    // Replace with real parser when API confirmed
    return Array.from({ length: 20 }).map((_, i) => ({
      id: `lb-${i + 1}`,
      name: `Live Stream ${i + 1}`,
      viewers: Math.floor(Math.random() * 8000) + 100,
      thumbnail: `https://picsum.photos/seed/lb-${i + 1}/640/360`,
      url: "https://pump.fun/live",
    })) as Leader[];
  } catch {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: `fallback-${i + 1}`,
      name: `Live Stream ${i + 1}`,
      viewers: Math.floor(Math.random() * 5000) + 50,
      thumbnail: `https://picsum.photos/seed/fb-${i + 1}/640/360`,
      url: "https://pump.fun/live",
    }));
  }
}

export default async function LeaderboardPage() {
  const leaders = (await fetchLeaders()).sort((a, b) => b.viewers - a.viewers);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <LeaderboardTable items={leaders} />
    </div>
  );
}


