export default function SubjectTags({ subjects }) {
  const tags = subjects?.split(",").map((s) => s.trim()) || [];

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}