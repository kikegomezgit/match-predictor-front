import { create } from 'zustand';
import type { Match } from '@/types';
import { fetchUpcomingMatches } from '@/api/matches';

interface MatchesState {
  matches: Match[];
  loading: boolean;
  error: string | null;
  fetchMatches: () => Promise<void>;
}

export const useMatchesStore = create<MatchesState>((set) => ({
  matches: [],
  loading: false,
  error: null,
  fetchMatches: async () => {
    set({ loading: true, error: null });
    try {
      const [mlsMatches, laLigaMatches] = await Promise.all([
        fetchUpcomingMatches(4346),
        fetchUpcomingMatches(4335),
      ]);
      const allMatches = [...mlsMatches, ...laLigaMatches].sort(
        (a, b) => new Date(a.strTimestamp).getTime() - new Date(b.strTimestamp).getTime()
      );
      set({ matches: allMatches, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch matches', loading: false });
    }
  },
}));

