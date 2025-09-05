"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Code, 
  Play, 
  Trophy, 
  Clock, 
  Star,
  CheckCircle,
  XCircle,
  RotateCcw,
  Download,
  Share
} from "lucide-react";
import Editor from '@monaco-editor/react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'layout' | 'components' | 'animations' | 'responsive';
  timeLimit: number; // in minutes
  points: number;
  html: string;
  targetImage: string;
  requirements: string[];
  hints: string[];
}

export default function ComponentArena() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [cssCode, setCssCode] = useState('');
  const [tailwindCode, setTailwindCode] = useState('');
  const [selectedMode, setSelectedMode] = useState<'css' | 'tailwind'>('css');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const editorRef = useRef<any>(null);

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Card Component',
      description: 'Create a modern card component with hover effects',
      difficulty: 'easy',
      category: 'components',
      timeLimit: 10,
      points: 100,
      html: '<div class="card"><h3>Card Title</h3><p>Card description goes here</p><button>Learn More</button></div>',
      targetImage: '/api/placeholder/300/200',
      requirements: [
        'Use rounded corners',
        'Add shadow on hover',
        'Include proper spacing',
        'Make button interactive'
      ],
      hints: [
        'Use border-radius for rounded corners',
        'Apply box-shadow with hover pseudo-class',
        'Use padding for internal spacing',
        'Add transition for smooth effects'
      ]
    },
    {
      id: '2',
      title: 'Responsive Navigation',
      description: 'Build a responsive navigation bar that collapses on mobile',
      difficulty: 'medium',
      category: 'responsive',
      timeLimit: 15,
      points: 200,
      html: '<nav class="navbar"><div class="logo">Brand</div><ul class="nav-links"><li><a href="#">Home</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul><button class="menu-toggle">☰</button></nav>',
      targetImage: '/api/placeholder/400/60',
      requirements: [
        'Horizontal layout on desktop',
        'Collapsible menu on mobile',
        'Smooth transitions',
        'Accessible navigation'
      ],
      hints: [
        'Use flexbox for layout',
        'Implement media queries for mobile',
        'Add JavaScript for menu toggle',
        'Use transform for smooth animations'
      ]
    },
    {
      id: '3',
      title: 'Animated Button',
      description: 'Create a button with multiple animation states',
      difficulty: 'hard',
      category: 'animations',
      timeLimit: 20,
      points: 300,
      html: '<button class="animated-btn">Click Me</button>',
      targetImage: '/api/placeholder/150/50',
      requirements: [
        'Hover scale effect',
        'Click ripple animation',
        'Loading state',
        'Success state'
      ],
      hints: [
        'Use transform: scale() for hover',
        'Create keyframe animations',
        'Use pseudo-elements for effects',
        'Implement state management'
      ]
    }
  ];

  const startChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
    setTimeLeft(challenge.timeLimit * 60);
    setCssCode('');
    setTailwindCode('');
    setScore(0);
    setShowHints(false);
    setIsRunning(true);
  };

  const runCode = () => {
    // Simulate code execution
    const code = selectedMode === 'css' ? cssCode : tailwindCode;
    console.log('Running code:', code);
    
    // In a real implementation, this would execute the code and show results
    // For now, we'll just simulate success
    const isSuccess = code.length > 20;
    
    if (isSuccess && currentChallenge) {
      setScore(prev => prev + currentChallenge.points);
      setCompletedChallenges(prev => [...prev, currentChallenge.id]);
    }
  };

  const resetChallenge = () => {
    setCssCode('');
    setTailwindCode('');
    setScore(0);
    setShowHints(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Component Challenge Arena
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="opacity-80">
              Daily UI challenges to test your CSS and Tailwind skills
            </p>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{score}</div>
                <div className="text-sm opacity-60">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{completedChallenges.length}</div>
                <div className="text-sm opacity-60">Completed</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenge List */}
      {!currentChallenge && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="glass-effect border-white/20 hover:bg-white/5 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white`}>
                      {challenge.difficulty}
                    </Badge>
                    {completedChallenges.includes(challenge.id) && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                  </div>
                </div>
                <p className="opacity-80 text-sm">{challenge.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {challenge.timeLimit} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {challenge.points} pts
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Requirements:</h4>
                    <ul className="text-xs opacity-70 space-y-1">
                      {challenge.requirements.slice(0, 2).map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                      {challenge.requirements.length > 2 && (
                        <li>• +{challenge.requirements.length - 2} more...</li>
                      )}
                    </ul>
                  </div>

                  <Button
                    onClick={() => startChallenge(challenge)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={completedChallenges.includes(challenge.id)}
                  >
                    {completedChallenges.includes(challenge.id) ? 'Completed' : 'Start Challenge'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Challenge Interface */}
      {currentChallenge && (
        <div className="space-y-6">
          {/* Challenge Header */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    {currentChallenge.title}
                  </CardTitle>
                  <p className="opacity-80 mt-1">{currentChallenge.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-sm opacity-60">Time Left</div>
                  </div>
                  <Button
                    onClick={() => setCurrentChallenge(null)}
                    variant="outline"
                    className="bg-white/10 border-white/20"
                  >
                    Exit Challenge
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="text-sm space-y-1 opacity-80">
                    {currentChallenge.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Target Design:</h4>
                  <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    Preview Image
                  </div>
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
                    onClick={runCode}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Run Code
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96 border border-white/20 rounded-lg overflow-hidden">
                <Editor
                  height="100%"
                  language={selectedMode === 'css' ? 'css' : 'html'}
                  value={selectedMode === 'css' ? cssCode : tailwindCode}
                  onChange={(value) => {
                    if (selectedMode === 'css') {
                      setCssCode(value || '');
                    } else {
                      setTailwindCode(value || '');
                    }
                  }}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Hints and Help */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Hints & Help</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setShowHints(!showHints)}
                    variant="outline"
                    className="bg-white/10 border-white/20"
                  >
                    {showHints ? 'Hide' : 'Show'} Hints
                  </Button>
                  <Button
                    size="sm"
                    onClick={resetChallenge}
                    variant="outline"
                    className="bg-white/10 border-white/20"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>
            {showHints && (
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium">Hints:</h4>
                  <ul className="text-sm space-y-1 opacity-80">
                    {currentChallenge.hints.map((hint, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Preview */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 border border-white/20 rounded-lg bg-white flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Play className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Click "Run Code" to see your result</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
