import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

export interface SyncStatus {
  isRunning: boolean;
  status?: {
    startedAt?: string;
    currentLeague?: number;
    currentLeagueName?: string;
    status?: string;
    completedAt?: string;
    error?: string;
  } | null;
}

export const startSync = async (): Promise<void> => {
  await axios.post(`${API_BASE_URL}/sync/previous-matches`);
};

export const getSyncStatus = async (): Promise<SyncStatus> => {
  const response = await axios.get<{ success: boolean; data: SyncStatus }>(
    `${API_BASE_URL}/sync/sync-status`
  );
  return response.data.data;
};
