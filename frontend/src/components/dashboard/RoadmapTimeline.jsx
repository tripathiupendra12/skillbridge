export default function RoadmapTimeline({ roadmap = [] }) {
  return (
    <div>
      <p className="text-sm font-medium mb-3">Learning roadmap</p>
      <div className="flex flex-col gap-4">
        {roadmap.map((item, i) => (
          <div key={i} className="border-l-2 border-black pl-4">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
            {item.resources?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.resources.map((resource, j) => (
                  <span key={j} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                    {resource}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}