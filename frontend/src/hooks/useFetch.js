import { useState, useEffect } from 'react';

export const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchFn()
      .then((res) => active && setData(res.data))
      .catch((err) => active && setError(err.response?.data?.message || 'Something went wrong'))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, deps);

  return { data, loading, error };
};