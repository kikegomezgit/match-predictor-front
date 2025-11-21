import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStatisticsStore } from '@/stores/statisticsStore';
import { LeagueTableChart } from './charts/LeagueTableChart';
import { FormChart } from './charts/FormChart';
import { WeatherImpactChart } from './charts/WeatherImpactChart';
import { HeadToHeadChart } from './charts/HeadToHeadChart';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LeagueStatisticsProps {
  leagueId: 4335 | 4346;
  leagueName: string;
}

export const LeagueStatistics = ({ leagueId, leagueName }: LeagueStatisticsProps) => {
  const {
    selectedYear,
    mlsData,
    laLigaData,
    loading,
    error,
    setYear,
    fetchMLSStatistics,
    fetchLaLigaStatistics,
  } = useStatisticsStore();

  const data = leagueId === 4346 ? mlsData : laLigaData;
  const [yearInput, setYearInput] = useState(selectedYear);

  // Initial fetch on mount
  useEffect(() => {
    if (leagueId === 4346) {
      fetchMLSStatistics();
    } else {
      fetchLaLigaStatistics();
    }
  }, [leagueId]);

  // Sync yearInput with selectedYear when it changes externally
  useEffect(() => {
    setYearInput(selectedYear);
  }, [selectedYear]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYearInput(e.target.value);
  };

  const handleYearKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const year = yearInput.trim();
      if (year && year !== selectedYear) {
        setYear(year);
        if (leagueId === 4346) {
          fetchMLSStatistics(year);
        } else {
          fetchLaLigaStatistics(year);
        }
      }
    }
  };

  const hasData = (data: any) => {
    if (!data || !data.data) return false;
    return (
      (data.data.leagueTable && data.data.leagueTable.length > 0) ||
      (data.data.form && Object.keys(data.data.form).length > 0) ||
      (data.data.weatherImpact && data.data.weatherImpact.length > 0) ||
      (data.data.headToHead && data.data.headToHead.length > 0)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            value={yearInput}
            onChange={handleYearChange}
            onKeyDown={handleYearKeyDown}
            min="2000"
            max="2100"
            className="w-32"
            placeholder="Press Enter to search"
          />
        </div>
        {data && (
          <div className="text-sm text-muted-foreground">
            Season: {data.meta.season} • {data.meta.totalTeams} teams
          </div>
        )}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {error && (
        <div className="text-destructive text-center py-4">{error}</div>
      )}

      {!loading && !error && data && hasData(data) && (
        <div className="space-y-6">
          {data.data.leagueTable && data.data.leagueTable.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>League Table</CardTitle>
              </CardHeader>
              <CardContent>
                <LeagueTableChart data={data.data.leagueTable} />
              </CardContent>
            </Card>
          )}

          {data.data.form && Object.keys(data.data.form).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Team Form</CardTitle>
              </CardHeader>
              <CardContent>
                <FormChart formData={data.data.form} />
              </CardContent>
            </Card>
          )}

          {data.data.weatherImpact && data.data.weatherImpact.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Weather Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <WeatherImpactChart data={data.data.weatherImpact} />
              </CardContent>
            </Card>
          )}

          {data.data.headToHead && data.data.headToHead.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Head-to-Head Records</CardTitle>
              </CardHeader>
              <CardContent>
                <HeadToHeadChart data={data.data.headToHead} />
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {!loading && !error && (!data || !hasData(data)) && (
        <div className="text-center text-muted-foreground py-8">
          <p className="text-lg font-medium">No data retrieved</p>
          <p className="text-sm mt-2">
            {data
              ? `No statistics available for ${leagueName} in ${selectedYear}`
              : `No data found for ${leagueName} in ${selectedYear}`}
          </p>
        </div>
      )}
    </div>
  );
};

