import axios from 'axios';
import type { StatisticsResponse } from '@/types';
import { API_BASE_URL } from '@/config/api';

export const fetchStatistics = async (
  year: string,
  leagueId: number
): Promise<StatisticsResponse> => {
  const response = await axios.get<StatisticsResponse>(
    `${API_BASE_URL}/statistics/year`,
    {
      params: { year, leagueId },
    }
  );
  return response.data;
};

