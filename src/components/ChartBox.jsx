import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

function ChartBox({ title, type, data, options }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
      <h3 className="mb-4 text-xl font-semibold text-slate-100">{title}</h3>
      <div className="h-72">
        {type === 'line' && <Line data={data} options={options} />}
        {type === 'bar' && <Bar data={data} options={options} />}
        {type === 'pie' && <Pie data={data} options={options} />}
      </div>
    </div>
  );
}

export default ChartBox;
