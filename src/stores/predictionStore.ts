import { create } from 'zustand';
import type { Match } from '@/types';
import { getPrediction } from '@/api/prediction';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface PredictionState {
  matches: Match[];
  conversationId: string | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
  setMatches: (matches: Match[]) => void;
  sendQuestion: (question: string, matches: Match[]) => Promise<void>;
  clearConversation: () => void;
}

export const usePredictionStore = create<PredictionState>((set, get) => ({
  matches: [],
  conversationId: null,
  messages: [],
  loading: false,
  error: null,
  setMatches: (matches) => {
    set({ matches, messages: [], conversationId: null });
  },
  sendQuestion: async (question: string, matches: Match[]) => {
    if (!matches || matches.length === 0) return;

    const { conversationId } = get();
    set({ loading: true, error: null });
    
    // Add user message
    const userMessage: Message = { role: 'user', content: question };
    set((state) => ({
      messages: [...state.messages, userMessage],
    }));

    try {
      const response = await getPrediction({
        matches,
        question,
        conversationId: conversationId || undefined,
      });

      // Add assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.answer,
      };
      
      set({
        messages: [...get().messages, assistantMessage],
        conversationId: response.data.conversationId,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to get prediction',
        loading: false,
      });
    }
  },
  clearConversation: () => {
    set({ messages: [], conversationId: null });
  },
}));

