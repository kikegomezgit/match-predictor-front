import axios from 'axios';
import type { PredictionRequest, PredictionResponse } from '@/types';
import { API_BASE_URL } from '@/config/api';

export const getPrediction = async (
  request: PredictionRequest
): Promise<PredictionResponse> => {
  const response = await axios.post<PredictionResponse>(
    `${API_BASE_URL}/prediction/predict-match`,
    {
      matches: request.matches,
      question: request.question,
      conversationId: request.conversationId,
    }
  );
  return response.data;
};

