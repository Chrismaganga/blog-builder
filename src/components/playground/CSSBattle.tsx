"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Trophy, 
  Clock, 
  Star,
  CheckCircle,
  XCircle,
  RotateCcw,
  Download,
  Share,
  Crown,
  Zap
} from "lucide-react";

interface Battle {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  targetImage: string;
  targetCSS: string;
  targetTailwind: string;
  maxScore: number;
  timeLimit: number; // in minutes
  hints: string[];
}

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  battlesCompleted: number;
  avatar: string;
}

export default function CSSBattle() {
  const [currentBattle, setCurrentBattle] = useState<Battle | null>(null);
  const [cssCode, setCssCode] = useState('');
  const [tailwindCode, setTailwindCode] = useState('');
  const [selectedMode, setSelectedMode] = useState<'css' | 'tailwind'>('css');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [battlesCompleted, setBattlesCompleted] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const battles: Battle[] = [
    {
      id: '1',
      title: 'Simple Square',
      description: 'Create a simple red square',
      difficulty: 'easy',
      targetImage: '/api/placeholder/100/100',
      targetCSS: '.square { width: 100px; height: 100px; background: red; }',
      targetTailwind: 'w-24 h-24 bg-red-500',
      maxScore: 100,
      timeLimit: 5,
      hints: ['Use width and height properties', 'Set background color to red']
    },
    {
      id: '2',
      title: 'Centered Circle',
      description: 'Create a blue circle centered on the page',
      difficulty: 'medium',
      targetImage: '/api/placeholder/200/200',
      targetCSS: '.circle { width: 100px; height: 100px; background: blue; border-radius: 50%; margin: 50px auto; }',
      targetTailwind: 'w-24 h-24 bg-blue-500 rounded-full mx-auto my-12',
      maxScore: 200,
      timeLimit: 10,
      hints: ['Use border-radius: 50% for circle', 'Center with margin auto', 'Add some margin for spacing']
    },
    {
      id: '3',
      title: 'Gradient Button',
      description: 'Create a button with gradient background and hover effect',
      difficulty: 'hard',
      targetImage: '/api/placeholder/150/50',
      targetCSS: '.btn { background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; transition: transform 0.2s; } .btn:hover { transform: translateY(-2px); }',
      targetTailwind: 'bg-gradient-to-r from-red-400 to-cyan-400 text-white px-6 py-3 rounded-lg cursor-pointer transition-transform hover:-translate-y-0.5',
      maxScore: 300,
      timeLimit: 15,
      hints: ['Use linear-gradient for background', 'Add hover effects with transform', 'Include proper padding and border-radius']
    },
    {
      id: '4',
      title: 'Card Layout',
      description: 'Create a card with shadow and rounded corners',
      difficulty: 'expert',
      targetImage: '/api/placeholder/300/200',
      targetCSS: '.card { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 24px; max-width: 300px; }',
      targetTailwind: 'bg-white rounded-xl shadow-lg p-6 max-w-sm',
      maxScore: 400,
      timeLimit: 20,
      hints: ['Use box-shadow for depth', 'Apply border-radius for rounded corners', 'Set max-width for responsive design']
    }
  ];

  useEffect(() => {
    // Mock leaderboard data
    setLeaderboard([
      { id: '1', name: 'CSS Master', score: 2500, battlesCompleted: 8, avatar: '👑' },
      { id: '2', name: 'Tailwind Pro', score: 2200, battlesCompleted: 7, avatar: '⚡' },
      { id: '3', name: 'Style Ninja', score: 1900, battlesCompleted: 6, avatar: '🥷' },
      { id: '4', name: 'Code Warrior', score: 1650, battlesCompleted: 5, avatar: '⚔️' },
      { id: '5', name: 'Design Hero', score: 1400, battlesCompleted: 4, avatar: '🦸' }
    ]);
  }, []);

  const startBattle = (battle: Battle) => {
    setCurrentBattle(battle);
    setTimeLeft(battle.timeLimit * 60);
    setCssCode('');
    setTailwindCode('');
    setScore(0);
    setShowHints(false);
    setIsRunning(true);
  };

  const validateCode = () => {
    if (!currentBattle) return;
    
    const code = selectedMode === 'css' ? cssCode : tailwindCode;
    const target = selectedMode === 'css' ? currentBattle.targetCSS : currentBattle.targetTailwind;
    
    // Simple validation - in real app, use proper CSS parsing
    const similarity = calculateSimilarity(code, target);
    const newScore = Math.floor(similarity * currentBattle.maxScore);
    
    setScore(newScore);
    
    if (similarity > 0.8) {
      setBattlesCompleted(prev => [...prev, currentBattle.id]);
    }
  };

  const calculateSimilarity = (code1: string, code2: string) => {
    // Simple similarity calculation - in real app, use proper CSS parsing
    const words1 = code1.toLowerCase().split(/\s+/);
    const words2 = code2.toLowerCase().split(/\s+/);
    
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-orange-500';
      case 'expert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Crown className="h-5 w-5 text-yellow-400" />;
      case 1: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 2: return <Trophy className="h-5 w-5 text-orange-400" />;
      default: return <span className="text-lg font-bold">#{index + 1}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            CSS Battle Arena
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="opacity-80">
              Replicate target designs with the shortest, most efficient code
            </p>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{score}</div>
                <div className="text-sm opacity-60">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{battlesCompleted.length}</div>
                <div className="text-sm opacity-60">Battles Won</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Battle List */}
        <div className="lg:col-span-2 space-y-4">
          {!currentBattle && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {battles.map((battle) => (
                <Card key={battle.id} className="glass-effect border-white/20 hover:bg-white/5 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{battle.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getDifficultyColor(battle.difficulty)} text-white`}>
                          {battle.difficulty}
                        </Badge>
                        {battlesCompleted.includes(battle.id) && (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        )}
                      </div>
                    </div>
                    <p className="opacity-80 text-sm">{battle.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {battle.timeLimit} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {battle.maxScore} pts
                        </span>
                      </div>
                      
                      <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                        Target Design
                      </div>

                      <Button
                        onClick={() => startBattle(battle)}
                        className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
                        disabled={battlesCompleted.includes(battle.id)}
                      >
                        {battlesCompleted.includes(battle.id) ? 'Completed' : 'Start Battle'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Battle Interface */}
          {currentBattle && (
            <div className="space-y-6">
              {/* Battle Header */}
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        {currentBattle.title}
                      </CardTitle>
                      <p className="opacity-80 mt-1">{currentBattle.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">
                          {formatTime(timeLeft)}
                        </div>
                        <div className="text-sm opacity-60">Time Left</div>
                      </div>
                      <Button
                        onClick={() => setCurrentBattle(null)}
                        variant="outline"
                        className="bg-white/10 border-white/20"
                      >
                        Exit Battle
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Target Design:</h4>
                      <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                        Target Image
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Your Score:</h4>
                      <div className="text-3xl font-bold text-yellow-400">{score}</div>
                      <div className="text-sm opacity-60">out of {currentBattle.maxScore}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Code Editor */}
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Code Editor</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => setSelectedMode('css')}
                        variant={selectedMode === 'css' ? 'default' : 'outline'}
                        className="bg-white/10 border-white/20"
                      >
                        CSS
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setSelectedMode('tailwind')}
                        variant={selectedMode === 'tailwind' ? 'default' : 'outline'}
                        className="bg-white/10 border-white/20"
                      >
                        Tailwind
                      </Button>
                      <Button
                        onClick={validateCode}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Validate
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={selectedMode === 'css' ? cssCode : tailwindCode}
                    onChange={(e) => {
                      if (selectedMode === 'css') {
                        setCssCode(e.target.value);
                      } else {
                        setTailwindCode(e.target.value);
                      }
                    }}
                    className="w-full h-64 p-4 bg-white/10 border border-white/20 rounded-lg font-mono text-sm resize-none"
                    placeholder={`Write your ${selectedMode.toUpperCase()} code here...`}
                  />
                </CardContent>
              </Card>

              {/* Hints */}
              <Card className="glass-effect border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Hints</CardTitle>
                    <Button
                      size="sm"
                      onClick={() => setShowHints(!showHints)}
                      variant="outline"
                      className="bg-white/10 border-white/20"
                    >
                      {showHints ? 'Hide' : 'Show'} Hints
                    </Button>
                  </div>
                </CardHeader>
                {showHints && (
                  <CardContent>
                    <ul className="text-sm space-y-1 opacity-80">
                      {currentBattle.hints.map((hint, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          {hint}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            </div>
          )}
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div key={entry.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(index)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{entry.name}</div>
                      <div className="text-xs opacity-60">{entry.score} pts</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{entry.battlesCompleted}</div>
                      <div className="text-xs opacity-60">battles</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">Total Score</span>
                  <span className="font-bold text-yellow-400">{score}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">Battles Won</span>
                  <span className="font-bold text-green-400">{battlesCompleted.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">Win Rate</span>
                  <span className="font-bold text-blue-400">
                    {battlesCompleted.length > 0 ? '100%' : '0%'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
