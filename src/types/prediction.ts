import type { Match } from './match';

export interface PredictionRequest {
  matches: Match[];
  question: string;
  conversationId?: string;
}

export interface PredictionResponse {
  success: boolean;
  data: {
    answer: string;
    matchesUsed: number;
    cached: boolean;
    conversationId: string;
    upcomingMatches: Array<{
      homeTeam: string;
      awayTeam: string;
      venue: string;
      date: string;
      weather?: any;
    }>;
  };
}

