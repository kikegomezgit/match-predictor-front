import { create } from 'zustand';
import { startSync, getSyncStatus } from '@/api/sync';
import type { SyncStatus } from '@/api/sync';

interface SyncState {
  status: SyncStatus;
  loading: boolean;
  checkStatus: () => Promise<void>;
  startSync: () => Promise<void>;
}

export const useSyncStore = create<SyncState>((set) => ({
  status: { isRunning: false, status: null },
  loading: false,
  checkStatus: async () => {
    try {
      const status = await getSyncStatus();
      set({ status });
    } catch (error) {
      console.error('Failed to check sync status:', error);
    }
  },
  startSync: async () => {
    set({ loading: true });
    try {
      await startSync();
      // Check status immediately after starting
      const status = await getSyncStatus();
      set({ status, loading: false });
    } catch (error: any) {
      console.error('Failed to start sync:', error);
      set({ loading: false });
    }
  },
}));

