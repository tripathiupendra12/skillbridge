import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <h2 className="text-2xl font-semibold mb-2">404</h2>
      <p className="text-gray-500 mb-6">Page not found</p>
      <Link to="/" className="text-black font-medium">Go home</Link>
    </div>
  );
}