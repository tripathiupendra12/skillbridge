export default function MatchScoreCard({ score }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-sm text-gray-500 mb-1">Match score</p>
      <p className="text-2xl font-semibold">{score ?? 0}%</p>
    </div>
  );
}