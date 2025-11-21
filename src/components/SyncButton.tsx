import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSyncStore } from '@/stores/syncStore';
import { Loader2 } from 'lucide-react';

export const SyncButton = () => {
  const { status, loading, checkStatus, startSync } = useSyncStore();

  useEffect(() => {
    // Check status once on mount/refresh
    checkStatus();
  }, [checkStatus]);

  useEffect(() => {
    // Poll status every 1 minute (60000ms) if sync is running
    let interval: ReturnType<typeof setInterval>;
    if (status.isRunning) {
      interval = setInterval(() => {
        checkStatus();
      }, 60000); // 1 minute = 60000ms
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status.isRunning, checkStatus]);

  const handleSync = async () => {
    await startSync();
    // Status will be checked by the useEffect polling
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleSync}
        disabled={status.isRunning || loading}
        className="w-full sm:w-auto"
      >
        {loading || status.isRunning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {status.isRunning ? 'Syncing...' : 'Starting Sync...'}
          </>
        ) : (
          'Sync 5 Years of Data'
        )}
      </Button>
      {status.isRunning && status.status && (
        <span className="text-sm text-muted-foreground">
          {status.status.currentLeagueName
            ? `Syncing ${status.status.currentLeagueName}...`
            : 'Sync in progress...'}
        </span>
      )}
    </div>
  );
};

