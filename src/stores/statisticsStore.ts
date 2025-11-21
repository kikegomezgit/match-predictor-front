import { create } from 'zustand';
import type { StatisticsResponse } from '@/types';
import { fetchStatistics } from '@/api/statistics';

interface StatisticsState {
  mlsData: StatisticsResponse | null;
  laLigaData: StatisticsResponse | null;
  selectedYear: string;
  loading: boolean;
  error: string | null;
  setYear: (year: string) => void;
  fetchMLSStatistics: (year?: string) => Promise<void>;
  fetchLaLigaStatistics: (year?: string) => Promise<void>;
}

export const useStatisticsStore = create<StatisticsState>((set, get) => ({
  mlsData: null,
  laLigaData: null,
  selectedYear: new Date().getFullYear().toString(),
  loading: false,
  error: null,
  setYear: (year: string) => {
    set({ selectedYear: year });
  },
  fetchMLSStatistics: async (year?: string) => {
    const { selectedYear } = get();
    const yearToUse = year || selectedYear;
    set({ loading: true, error: null });
    try {
      const data = await fetchStatistics(yearToUse, 4346);
      set({ mlsData: data, loading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch MLS statistics',
        loading: false,
      });
    }
  },
  fetchLaLigaStatistics: async (year?: string) => {
    const { selectedYear } = get();
    const yearToUse = year || selectedYear;
    set({ loading: true, error: null });
    try {
      const data = await fetchStatistics(yearToUse, 4335);
      set({ laLigaData: data, loading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch La Liga statistics',
        loading: false,
      });
    }
  },
}));

