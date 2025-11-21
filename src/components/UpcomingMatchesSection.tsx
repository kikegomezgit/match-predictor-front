import { useEffect } from 'react';
import { useMatchesStore } from '@/stores/matchesStore';
import { usePredictionStore } from '@/stores/predictionStore';
import { MatchCard } from './MatchCard';
import { SyncButton } from './SyncButton';
import { Loader2 } from 'lucide-react';

export const UpcomingMatchesSection = () => {
  const { matches, loading, error, fetchMatches } = useMatchesStore();
  const { setMatches } = usePredictionStore();

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  useEffect(() => {
    if (matches.length > 0) {
      setMatches(matches);
    }
  }, [matches, setMatches]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Upcoming Matches</h2>
        <SyncButton />
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {error && (
        <div className="text-destructive text-center py-4">{error}</div>
      )}

      {!loading && !error && matches.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No upcoming matches found
        </div>
      )}

      {!loading && matches.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {matches.map((match) => (
            <MatchCard key={match.idEvent} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

