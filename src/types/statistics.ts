export interface TeamStats {
  teamId: string;
  teamName: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  homeRecord: {
    matches: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  awayRecord: {
    matches: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  pointsPerGame: number;
  goalsPerGame: number;
}

export interface FormData {
  form: string[];
  points: number;
  streak: string;
}

export interface HeadToHeadRecord {
  team1: string;
  team2: string;
  team1Wins: number;
  team2Wins: number;
  draws: number;
}

export interface WeatherImpact {
  weather: string;
  matches: number;
  winRate: number;
  avgGoals: number;
}

export interface LeagueTableEntry {
  team: string;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  wins: number;
  draws: number;
  losses: number;
}

export interface ChartData {
  leagueTable: LeagueTableEntry[];
  form: {
    [teamName: string]: FormData;
  };
  headToHead: HeadToHeadRecord[];
  weatherImpact: WeatherImpact[];
}

export interface StatisticsResponse {
  success: boolean;
  data: ChartData & {
    rawStats: TeamStats[];
  };
  meta: {
    year: string;
    leagueId: number;
    season: string;
    totalTeams: number;
  };
}

