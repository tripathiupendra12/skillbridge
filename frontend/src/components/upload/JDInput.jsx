export default function JDInput({ value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium block mb-2">Job description</label>
      <textarea
        rows={8}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}