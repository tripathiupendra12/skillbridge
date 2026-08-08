import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-xl mx-auto text-center py-24 px-4">
      <h1 className="text-3xl font-semibold mb-3">SkillBridge</h1>
      <p className="text-gray-500 mb-8">AI-powered resume-to-job gap analyzer with a personalized learning roadmap.</p>
      <div className="flex justify-center gap-3">
        <Link to="/signup" className="bg-black text-white px-5 py-2.5 rounded-md text-sm">Get started</Link>
        <Link to="/login" className="border border-gray-300 px-5 py-2.5 rounded-md text-sm">Login</Link>
      </div>
    </div>
  );
}