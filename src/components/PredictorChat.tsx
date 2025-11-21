import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePredictionStore } from '@/stores/predictionStore';
import { useMatchesStore } from '@/stores/matchesStore';
import { Loader2, Send } from 'lucide-react';

export const PredictorChat = () => {
  const { matches: allMatches } = useMatchesStore();
  const { messages, loading, error, sendQuestion } =
    usePredictionStore();
  const [question, setQuestion] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading || allMatches.length === 0) return;
    
    const currentQuestion = question;
    setQuestion('');
    await sendQuestion(currentQuestion, allMatches);
  };

  return (
    <Card className="h-[calc(100vh-8rem)] flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">Match Predictor</CardTitle>
        
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 p-4">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 border rounded-lg p-4 mb-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <p>Ask me anything about the upcoming matches!</p>
                <p className="text-sm mt-2">
                  Example: "What will be the predicted scores?"
                </p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            {error && (
              <div className="text-destructive text-sm text-center">{error}</div>
            )}
          </div>
        </ScrollArea>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={question}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
            placeholder="Ask about upcoming matches..."
            disabled={loading || allMatches.length === 0}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !question.trim() || allMatches.length === 0}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

