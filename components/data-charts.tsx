'use client'
// components/DataCharts.tsx
import { Chart, ChartProps } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DataCharts ({ type, data, options, width, height }: ChartProps) {
  return (
    <div>
      <Chart type={type} data={data} options={options} />
    </div>
  )
}
