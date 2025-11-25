type Stat = { label: string; value: string; color: string };

type FollowUsStatsProps = {
  title?: string;
  stats?: Stat[];
};

export default function FollowUsStats({
  title = "Follow us",
  stats = [
    { label: "Fans", value: "26,400", color: "bg-[#3b5aa6]" },
    { label: "Followers", value: "7,500", color: "bg-[#22c8f8]" },
    { label: "Subscribers", value: "22,700", color: "bg-[#e74848]" },
  ],
}: FollowUsStatsProps) {
  return (
    <div className="px-5">
      <h4 className="text-[#0e1d3d] font-semibold">{title}</h4>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <div key={i} className={`rounded-md text-white text-center py-4 ${s.color}`}>
            <div className="text-lg font-bold">{s.value}</div>
            <div className="text-xs opacity-90">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}