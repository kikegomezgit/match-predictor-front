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
import type { HeadToHeadRecord } from '@/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HeadToHeadChartProps {
  data: HeadToHeadRecord[];
}

export const HeadToHeadChart = ({ data }: HeadToHeadChartProps) => {
  const top10 = data.slice(0, 10);

  const chartData = {
    labels: top10.map((item) => `${item.team1} vs ${item.team2}`),
    datasets: [
      {
        label: 'Team 1 Wins',
        data: top10.map((item) => item.team1Wins),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Team 2 Wins',
        data: top10.map((item) => item.team2Wins),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
      {
        label: 'Draws',
        data: top10.map((item) => item.draws),
        backgroundColor: 'rgba(156, 163, 175, 0.5)',
        borderColor: 'rgba(156, 163, 175, 1)',
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
        text: 'Head-to-Head Records',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

