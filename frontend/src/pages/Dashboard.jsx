import { useAuth } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';
import { getHistory } from '../services/analysisService';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import ApplicationHistory from '../components/dashboard/ApplicationHistory';

export default function Dashboard() {
  const { user } = useAuth();
  const { data, loading, error } = useFetch(getHistory, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Welcome back, {user?.name}</h2>
          <p className="text-md text-gray-600">{user?.email}</p>
        </div>
        <Link
          to="/analyze"
          className="bg-black text-white px-6 py-3 rounded-md text-md text-center"
        >
          New analysis
        </Link>
      </div>

      {loading && <Loader />}

      {error && !loading && (
        <div className="bg-red-50 text-red-700 text-sm rounded-lg p-4">
          Couldn't load your history. {error}
        </div>
      )}

      {!loading && !error && (
        <ApplicationHistory history={data?.history || []} />
      )}
    </div>
  );
}