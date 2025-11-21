import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { FormData } from '@/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FormChartProps {
  formData: { [teamName: string]: FormData };
}

export const FormChart = ({ formData }: FormChartProps) => {
  const teams = Object.keys(formData).slice(0, 15);
  
  const chartData = {
    labels: teams,
    datasets: [
      {
        label: 'Points from Last 5 Matches',
        data: teams.map((team) => formData[team].points),
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Team Form - Points from Last 5 Matches',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 15,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

