import { Link } from 'react-router-dom';

export default function ApplicationHistory({ history = [] }) {
  if (history.length === 0) {
    return (
      <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-500 mb-3">No analyses yet</p>
        <Link to="/analyze" className="text-sm text-black font-medium">Run your first analysis →</Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm font-medium mb-3">Recent analyses</p>
      <div className="border border-gray-200 rounded-lg divide-y">
        {history.map((item) => (
          <Link
            key={item._id}
            to="/result"
            state={item}
            className="flex justify-between items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
          >
            <div className="min-w-0">
              <p className="font-medium truncate">{item.jobTitle}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ml-3 ${
              item.matchScore >= 70 ? 'bg-green-50 text-green-700' :
              item.matchScore >= 40 ? 'bg-amber-50 text-amber-700' :
              'bg-red-50 text-red-700'
            }`}>
              {item.matchScore}% match
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}