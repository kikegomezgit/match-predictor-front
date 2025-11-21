import axios from 'axios';
import type { Match } from '@/types';
import { API_BASE_URL } from '@/config/api';

export const fetchUpcomingMatches = async (leagueId: number): Promise<Match[]> => {
  const response = await axios.get(`${API_BASE_URL}/sync/upcoming-matches`, {
    params: { leagueId },
  });
  return response.data.data || [];
};

