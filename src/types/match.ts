export interface WeatherAtMatchTime {
  temperature?: number;
  feelsLike?: number;
  humidity?: number;
  pressure?: number;
  visibility?: number;
  windSpeed?: number;
  windDirection?: number;
  clouds?: number;
  weather?: string;
  weatherDescription?: string;
  weatherIcon?: string;
  lat?: number;
  lon?: number;
  timestamp?: string;
}

export interface Match {
  idEvent: string;
  idAPIfootball?: string;
  strEvent: string;
  strEventAlternate?: string;
  strFilename?: string;
  strSport: string;
  idLeague: string;
  strLeague: string;
  strLeagueBadge?: string;
  strSeason: string;
  strDescriptionEN?: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore?: string | null;
  intRound?: string;
  intAwayScore?: string | null;
  intSpectators?: number | null;
  strOfficial?: string;
  strTimestamp: string;
  dateEvent: string;
  dateEventLocal?: string;
  strTime?: string;
  strTimeLocal?: string;
  strGroup?: string;
  idHomeTeam: string;
  strHomeTeamBadge?: string;
  idAwayTeam: string;
  strAwayTeamBadge?: string;
  intScore?: number | null;
  intScoreVotes?: number | null;
  strResult?: string;
  idVenue: string;
  strVenue: string;
  strCountry: string;
  strCity?: string;
  strPoster?: string;
  strSquare?: string;
  strFanart?: string | null;
  strThumb?: string;
  strBanner?: string;
  strMap?: string | null;
  strTweet1?: string;
  strTweet2?: string;
  strTweet3?: string;
  strVideo?: string;
  strStatus: string;
  strPostponed?: string;
  strLocked?: string;
  weatherAtMatchTime?: WeatherAtMatchTime;
}

