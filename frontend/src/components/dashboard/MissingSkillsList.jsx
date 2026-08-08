export default function MissingSkillsList({ skills = [] }) {
  return (
    <div>
      <p className="text-sm font-medium mb-2">Missing skills</p>
      <div className="flex flex-wrap gap-2">
        {skills.length === 0 && <p className="text-sm text-gray-400">No gaps found</p>}
        {skills.map((skill, i) => (
          <span key={i} className="bg-red-50 text-red-700 text-xs px-2.5 py-1 rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}