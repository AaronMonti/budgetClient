'use client'
// components/DataCharts.tsx
import { Chart, ChartProps } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

export default function DataCharts ({ type, data, options, width, height }: ChartProps) {
  return (
    <div>
      <Chart type={type} data={data} options={options} width={width} height={height} />
    </div>
  )
}
