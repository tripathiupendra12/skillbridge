import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Footer() {
  const { user } = useAuth();
  const year = new Date().getFullYear();

  return (
  <footer className="mt-auto border-t border-gray-200 bg-gray-50">
    <div className="mx-auto grid max-w-5xl gap-12 px-4 py-10 sm:grid-cols-3 sm:px-6">
      <div>
        <p className="font-semibold">SkillBridge</p>
        <p className="mt-2 max-w-xs text-sm text-gray-500">
          Compare your resume with any job description, find your skill gaps, and get a 2-week learning roadmap.
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Quick links</p>
        <ul className="flex flex-col gap-1.5 text-sm text-gray-500">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link></li>
              <li><Link to="/analyze" className="hover:text-blue-600">New analysis</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
              <li><Link to="/signup" className="hover:text-blue-600">Sign up</Link></li>
            </>
          )}
        </ul>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Connect</p>
        <ul className="flex flex-col gap-1.5 text-sm text-gray-500">
          <li><a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">GitHub</a></li>
          <li><a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div className="px-4 py-6 text-center text-md text-gray-600">
      © {year} SkillBridge.
    </div>
  </footer>
);
}