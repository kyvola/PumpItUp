import Image from "next/image";

export type Leader = {
  id: string;
  name: string;
  viewers: number;
  thumbnail: string;
  url: string;
};

export default function LeaderboardTable({ items }: { items: Leader[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="px-3">Rank</th>
            <th className="px-3">Stream</th>
            <th className="px-3">Name</th>
            <th className="px-3">Viewers</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s, i) => (
            <tr key={s.id} className={`rounded-xl bg-card text-card-foreground shadow-sm ring-1 ring-border`}>
              <td className="px-3 py-3 font-semibold">
                <span className={`${i < 3 ? "text-green-500" : "text-foreground"}`}>{i + 1}</span>
              </td>
              <td className="px-3 py-3">
                <div className="relative w-[96px] h-[54px] rounded overflow-hidden">
                  <Image src={s.thumbnail} alt={s.name} fill className="object-cover" />
                </div>
              </td>
              <td className="px-3 py-3 font-medium truncate max-w-[240px]">
                <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-green-500">
                  {s.name}
                </a>
              </td>
              <td className="px-3 py-3">{s.viewers.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


