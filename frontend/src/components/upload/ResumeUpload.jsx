import { useState } from 'react';

export default function ResumeUpload({ onFileSelect }) {
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium block mb-2">Resume (PDF)</label>
      <label className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-sm text-gray-500 cursor-pointer hover:border-black active:bg-gray-50 text-center min-h-[100px]">
        <span className="truncate max-w-full px-2">
          {fileName || 'Tap to upload your resume'}
        </span>
        <input type="file" accept="application/pdf" onChange={handleChange} className="hidden" />
      </label>
    </div>
  );
}