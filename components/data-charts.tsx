'use client'
// components/DataCharts.tsx
import { Chart, ChartProps } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto';

export default function DataCharts ({ type, data, options, width, height }: ChartProps) {
  return (
    <div>
      <Chart type={type} data={data} options={options} width={width} height={height} />
    </div>
  )
}
