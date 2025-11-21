import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UpcomingMatchesSection } from './components/UpcomingMatchesSection';
import { LeagueStatistics } from './components/LeagueStatistics';
import { PredictorChat } from './components/PredictorChat';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Match Predictor & Statistics
        </h1>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Left Side - Upcoming Matches and Statistics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Matches Section */}
            <UpcomingMatchesSection />

            {/* Statistics Tabs Section */}
            <div className="mt-6">
              <Tabs defaultValue="mls" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mls">MLS</TabsTrigger>
                  <TabsTrigger value="laliga">La Liga</TabsTrigger>
                </TabsList>
                <TabsContent value="mls" className="mt-6">
                  <LeagueStatistics leagueId={4346} leagueName="MLS" />
                </TabsContent>
                <TabsContent value="laliga" className="mt-6">
                  <LeagueStatistics leagueId={4335} leagueName="La Liga" />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Side - Predictor Chat */}
          <div className="lg:col-span-1">
            <PredictorChat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

