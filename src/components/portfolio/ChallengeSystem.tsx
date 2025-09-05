"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Clock, 
  Target,
  CheckCircle,
  Lock,
  Flame,
  Award
} from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'free' | 'pro';
  timeEstimate: string;
  points: number;
  completed: boolean;
  category: 'responsive' | 'animations' | 'theming' | 'components';
}

interface ChallengeSystemProps {
  userTier: 'free' | 'pro';
}

export default function ChallengeSystem({ userTier }: ChallengeSystemProps) {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [userProgress, setUserProgress] = useState({
    totalPoints: 245,
    streak: 7,
    completedChallenges: 12,
    level: 3
  });

  const completedChallenges = challenges.filter(c => c.completed).length;
  const totalChallenges = challenges.length;
  const progressPercentage = (completedChallenges / totalChallenges) * 100;

  const handleStartChallenge = (challenge: Challenge) => {
    if (challenge.type === 'pro' && userTier === 'free') {
      return; // Show upgrade modal in real app
    }
    setSelectedChallenge(challenge);
  };

  const handleCompleteChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(c => 
        c.id === challengeId 
          ? { ...c, completed: true }
          : c
      )
    );
    setUserProgress(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + (selectedChallenge?.points || 0),
      completedChallenges: prev.completedChallenges + 1,
      streak: prev.streak + 1
    }));
    setSelectedChallenge(null);
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{userProgress.totalPoints}</div>
              <div className="text-sm opacity-60">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold flex items-center justify-center gap-1">
                <Flame className="h-5 w-5 text-orange-400" />
                {userProgress.streak}
              </div>
              <div className="text-sm opacity-60">Day Streak</div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm opacity-80 mb-2">
              <span>Challenges Completed</span>
              <span>{completedChallenges}/{totalChallenges}</span>
            </div>
            <Progress value={progressPercentage} className="bg-white/20" />
          </div>

          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-purple-400" />
            <span className="text-sm opacity-80">Level {userProgress.level} Builder</span>
          </div>
        </CardContent>
      </Card>

      {/* Daily Challenge */}
      <Card className="glass-effect border-white/20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            Daily Challenge
            <Badge className="bg-yellow-500 text-black">2x Points</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h4 className="font-medium">Responsive Navigation Menu</h4>
            <p className="text-sm opacity-70">
              Create a mobile-first navigation that transforms from hamburger menu to horizontal layout on desktop.
            </p>
            <div className="flex items-center gap-4 text-sm opacity-60">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>45 min</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                <span>50 points</span>
              </div>
            </div>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
              Start Challenge
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Challenge Categories */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle>Challenge Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(challengeCategories).map(([category, data]) => {
              const categoryProgress = challenges.filter(c => 
                c.category === category && c.completed
              ).length;
              const categoryTotal = challenges.filter(c => c.category === category).length;
              
              return (
                <div key={category} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <data.icon className="h-4 w-4 opacity-80" />
                      <span className="font-medium">{data.name}</span>
                    </div>
                    <span className="text-sm opacity-60">
                      {categoryProgress}/{categoryTotal}
                    </span>
                  </div>
                  <Progress 
                    value={(categoryProgress / categoryTotal) * 100} 
                    className="bg-white/20 h-2" 
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Available Challenges */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle>Available Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {challenges.slice(0, 5).map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                userTier={userTier}
                onStart={() => handleStartChallenge(challenge)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Challenge Modal */}
      {selectedChallenge && (
        <ChallengeModal
          challenge={selectedChallenge}
          onComplete={() => handleCompleteChallenge(selectedChallenge.id)}
          onClose={() => setSelectedChallenge(null)}
        />
      )}
    </div>
  );
}

function ChallengeCard({ 
  challenge, 
  userTier, 
  onStart 
}: { 
  challenge: Challenge; 
  userTier: 'free' | 'pro'; 
  onStart: () => void; 
}) {
  const isLocked = challenge.type === 'pro' && userTier === 'free';
  
  return (
    <div className={`p-3 rounded-lg border ${
      challenge.completed 
        ? 'bg-green-500/20 border-green-500/30' 
        : isLocked
        ? 'bg-gray-500/20 border-gray-500/30'
        : 'bg-white/5 border-white/20'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`font-medium ${
              challenge.completed ? 'text-green-300' : ''
            }`}>
              {challenge.title}
            </h4>
            <Badge 
              variant={challenge.difficulty === 'beginner' ? 'secondary' : 'outline'}
              className="text-xs"
            >
              {challenge.difficulty}
            </Badge>
            {challenge.type === 'pro' && (
              <Badge className="bg-yellow-500 text-black text-xs">Pro</Badge>
            )}
          </div>
          <p className="text-sm opacity-60 mb-2">{challenge.description}</p>
          <div className="flex items-center gap-3 text-xs opacity-50">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {challenge.timeEstimate}
            </span>
            <span className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {challenge.points} pts
            </span>
          </div>
        </div>
        
        <div className="ml-4">
          {challenge.completed ? (
            <CheckCircle className="h-5 w-5 text-green-400" />
          ) : isLocked ? (
            <Lock className="h-5 w-5 text-gray-400" />
          ) : (
            <Button size="sm" onClick={onStart}>
              Start
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ChallengeModal({ 
  challenge, 
  onComplete, 
  onClose 
}: { 
  challenge: Challenge; 
  onComplete: () => void; 
  onClose: () => void; 
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="glass-effect border-white/20 w-full max-w-md">
        <CardHeader>
          <CardTitle>{challenge.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="opacity-80">{challenge.description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="opacity-60">Progress</span>
              <span className="opacity-60">{progress}%</span>
            </div>
            <Progress value={progress} className="bg-white/20" />
          </div>

          <div className="flex gap-2">
            {progress === 100 ? (
              <Button onClick={onComplete} className="flex-1">
                Complete Challenge (+{challenge.points} points)
              </Button>
            ) : (
              <Button disabled className="flex-1">
                Working on challenge...
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const challengeCategories = {
  responsive: { name: 'Responsive Design', icon: Target },
  animations: { name: 'Animations', icon: Star },
  theming: { name: 'Theming', icon: Flame },
  components: { name: 'Components', icon: Trophy }
};

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Mobile-First Navigation',
    description: 'Create a responsive navigation menu that works on all devices',
    difficulty: 'beginner',
    type: 'free',
    timeEstimate: '30 min',
    points: 25,
    completed: true,
    category: 'responsive'
  },
  {
    id: '2',
    title: 'Smooth Page Transitions',
    description: 'Implement page transitions with Framer Motion',
    difficulty: 'advanced',
    type: 'pro',
    timeEstimate: '90 min',
    points: 75,
    completed: false,
    category: 'animations'
  },
  {
    id: '3',
    title: 'Dark Mode Toggle',
    description: 'Add a dark/light theme switcher with smooth transitions',
    difficulty: 'intermediate',
    type: 'free',
    timeEstimate: '45 min',
    points: 40,
    completed: false,
    category: 'theming'
  },
  {
    id: '4',
    title: 'Reusable Card Component',
    description: 'Build a flexible card component with multiple variants',
    difficulty: 'beginner',
    type: 'free',
    timeEstimate: '25 min',
    points: 20,
    completed: true,
    category: 'components'
  },
  {
    id: '5',
    title: 'Advanced Grid Layouts',
    description: 'Master CSS Grid with complex responsive layouts',
    difficulty: 'advanced',
    type: 'pro',
    timeEstimate: '120 min',
    points: 100,
    completed: false,
    category: 'responsive'
  }
];
