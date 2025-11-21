import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Match } from '@/types';
import { getWeatherEmoji } from '@/utils/weatherIcons';
import { Calendar, MapPin, Thermometer } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const formatDate = (dateStr: string, timeStr?: string) => {
    try {
      let date: Date;
      if (dateStr.includes('T')) {
        date = parseISO(dateStr);
      } else {
        date = new Date(dateStr);
        if (timeStr) {
          const [hours, minutes] = timeStr.split(':');
          date.setHours(parseInt(hours), parseInt(minutes));
        }
      }
      return format(date, 'MMM d, yyyy h:mm a');
    } catch {
      return `${dateStr} ${timeStr || ''}`;
    }
  };

  const weather = match.weatherAtMatchTime;
  const weatherEmoji = getWeatherEmoji(weather?.weather);

  return (
    <Card className="hover:shadow-lg transition-shadow min-w-[320px] flex-shrink-0">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{match.strLeague}</Badge>
          {weatherEmoji && (
            <span className="text-2xl" title={weather?.weatherDescription}>
              {weatherEmoji}
            </span>
          )}
        </div>
        <CardTitle className="text-lg">
          {match.strHomeTeam} vs {match.strAwayTeam}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(match.dateEvent, match.strTimeLocal)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{match.strVenue}</span>
          </div>
          {weather && (
            <div className="flex items-center gap-2 text-sm">
              <Thermometer className="h-4 w-4" />
              <span>
                {weather.temperature?.toFixed(1)}°C
                {weather.weatherDescription && ` • ${weather.weatherDescription}`}
              </span>
            </div>
          )}
          <div className="flex items-center gap-4 mt-4">
            {match.strHomeTeamBadge && (
              <img
                src={match.strHomeTeamBadge}
                alt={match.strHomeTeam}
                className="h-12 w-12 object-contain"
              />
            )}
            <span className="text-xl font-bold">VS</span>
            {match.strAwayTeamBadge && (
              <img
                src={match.strAwayTeamBadge}
                alt={match.strAwayTeam}
                className="h-12 w-12 object-contain"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

