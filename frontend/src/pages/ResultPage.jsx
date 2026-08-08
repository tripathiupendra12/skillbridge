import { useLocation, Link } from 'react-router-dom';
import MatchScoreCard from '../components/dashboard/MatchScoreCard';
import MissingSkillsList from '../components/dashboard/MissingSkillsList';
import SkillsGapChart from '../components/dashboard/SkillsGapChart';
import RoadmapTimeline from '../components/dashboard/RoadmapTimeline';

export default function ResultPage() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">No result data. Run a new analysis.</p>
        <Link to="/analyze" className="text-black font-medium">Start new analysis</Link>
      </div>
    );
  }

  const {
    jobTitle,
    matchScore,
    matchedSkills = [],
    missingSkills = [],
    summary,
    experienceGap,
    roadmap = [],
  } = state;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold">{jobTitle}</h2>
        {summary && <p className="text-sm text-gray-500 mt-1">{summary}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MatchScoreCard score={matchScore} />
        <SkillsGapChart matched={matchedSkills.length} missing={missingSkills.length} />
      </div>

      {experienceGap && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Experience</p>
          <p className="text-sm">{experienceGap}</p>
        </div>
      )}

      <div>
        <p className="text-sm font-medium mb-2">Matched skills</p>
        <div className="flex flex-wrap gap-2">
          {matchedSkills.map((skill, i) => (
            <span key={i} className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <MissingSkillsList skills={missingSkills} />

      {roadmap.length > 0 && <RoadmapTimeline roadmap={roadmap} />}

      <Link to="/analyze" className="text-sm text-black font-medium">Run another analysis →</Link>
    </div>
  );
}