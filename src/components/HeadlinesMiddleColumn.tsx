import HeadlineCard from "./HeadlineCard";

type HeadlinesMiddleColumnProps = {
  items?: {
    imageSrc?: string;
    category: string;
    title: string;
    date?: string;
    excerpt?: string;
  }[];
};

export default function HeadlinesMiddleColumn({
  items = [
    {
      category: "Politics",
      title: "Expanding Peaceful Political Climate Gears up for this Election",
      date: "December 14, 2023",
      excerpt:
        "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
    },
    {
      category: "Politics",
      title: "New Presidential Candidates Presented in Just a Few Minutes",
      date: "December 14, 2023",
      excerpt:
        "Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you...",
    },
  ],
}: HeadlinesMiddleColumnProps) {
  return (
    <div className="space-y-8">
      {items.map((it, idx) => (
        <HeadlineCard key={idx} {...it} />
      ))}
    </div>
  );
}