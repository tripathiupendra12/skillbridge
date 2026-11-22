import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeUpload from '../components/upload/ResumeUpload';
import JDInput from '../components/upload/JDInput';
import { uploadResume } from '../services/resumeService';
import { analyzeResume } from '../services/analysisService';

export default function AnalyzeResume() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState('');
  const [step, setStep] = useState(''); // '' | 'uploading' | 'analyzing'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loading = step !== '';

  const handleSubmit = async () => {
    if (!file || !jd.trim()) {
      setError('Please upload a resume and paste a job description');
      return;
    }
    setError('');

    try {
      setStep('uploading');
      const formData = new FormData();
      formData.append('resume', file);
      const uploadRes = await uploadResume(formData);

      setStep('analyzing');
      const { data } = await analyzeResume({ resumeId: uploadRes.data._id, jdText: jd });

      navigate('/result', { state: data });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setStep('');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4 sm:py-10">
      <h2 className="text-2xl font-semibold mb-6">New analysis</h2>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm rounded-lg p-3 mb-4">{error}</div>
      )}

      <div className="flex w-xl flex-col gap-6">
        <ResumeUpload onFileSelect={setFile} />
        <JDInput value={jd} onChange={setJd} />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white rounded-md py-2.5 text-sm disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {step === 'uploading' && 'Uploading resume...'}
          {step === 'analyzing' && 'Analyzing with AI (this can take ~15s)...'}
          {!loading && 'Analyze'}
        </button>
      </div>
    </div>
  );
}