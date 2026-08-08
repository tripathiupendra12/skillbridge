import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function SkillsGapChart({ matched = 0, missing = 0 }) {
  const data = [
    { name: 'Matched', value: matched },
    { name: 'Missing', value: missing },
  ];
  const COLORS = ['#16a34a', '#dc2626'];

  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}