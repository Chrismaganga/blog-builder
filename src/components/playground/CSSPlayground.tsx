"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Palette, 
  CheckCircle, 
  XCircle,
  Play,
  RotateCcw,
  Download,
  Share,
  Trophy,
  Zap
} from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  html: string;
  targetCSS: string;
  targetTailwind: string;
  hints: string[];
}

export default function CSSPlayground() {
  const [activeMode, setActiveMode] = useState<'css' | 'tailwind'>('css');
  const [cssCode, setCssCode] = useState('');
  const [tailwindCode, setTailwindCode] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    css: { valid: boolean; errors: string[] };
    tailwind: { valid: boolean; errors: string[] };
  }>({ css: { valid: true, errors: [] }, tailwind: { valid: true, errors: [] } });

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Button to Card',
      description: 'Transform this button into a card component',
      difficulty: 'easy',
      html: '<button class="btn">Click me</button>',
      targetCSS: '.btn { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem 2rem; border: none; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.2s; } .btn:hover { transform: translateY(-2px); }',
      targetTailwind: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200',
      hints: ['Use gradient backgrounds', 'Add hover effects', 'Include shadows and transitions']
    },
    {
      id: '2',
      title: 'Responsive Navbar',
      description: 'Create a responsive navigation bar',
      difficulty: 'medium',
      html: '<nav class="navbar"><ul class="nav-list"><li><a href="#">Home</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul></nav>',
      targetCSS: '.navbar { background: #1f2937; padding: 1rem; } .nav-list { display: flex; list-style: none; gap: 2rem; margin: 0; padding: 0; } .nav-list a { color: white; text-decoration: none; } @media (max-width: 768px) { .nav-list { flex-direction: column; gap: 1rem; } }',
      targetTailwind: 'bg-gray-800 p-4 flex flex-col md:flex-row gap-4 md:gap-8 list-none m-0 p-0 text-white no-underline',
      hints: ['Use flexbox for layout', 'Add responsive breakpoints', 'Style the links appropriately']
    },
    {
      id: '3',
      title: 'Card Grid Layout',
      description: 'Create a responsive card grid',
      difficulty: 'hard',
      html: '<div class="card-grid"><div class="card">Card 1</div><div class="card">Card 2</div><div class="card">Card 3</div></div>',
      targetCSS: '.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; padding: 2rem; } .card { background: white; border-radius: 0.5rem; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }',
      targetTailwind: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-white rounded-lg p-6 shadow-md',
      hints: ['Use CSS Grid', 'Make it responsive', 'Add proper spacing and shadows']
    }
  ];

  useEffect(() => {
    if (currentChallenge) {
      setHtmlCode(currentChallenge.html);
      setCssCode('');
      setTailwindCode('');
    }
  }, [currentChallenge]);

  const validateCode = async (mode: 'css' | 'tailwind') => {
    setIsValidating(true);
    
    // Simulate validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const code = mode === 'css' ? cssCode : tailwindCode;
    const target = mode === 'css' ? currentChallenge?.targetCSS : currentChallenge?.targetTailwind;
    
    // Simple validation logic (in real app, use proper CSS/Tailwind parsers)
    const isValid = code.length > 10 && code.includes(mode === 'css' ? '{' : 'bg-');
    const errors = isValid ? [] : [`${mode.toUpperCase()} code seems incomplete`];
    
    setValidationResult(prev => ({
      ...prev,
      [mode]: { valid: isValid, errors }
    }));
    
    setIsValidating(false);
  };

  const renderPreview = () => {
    const htmlWithStyles = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ${cssCode}
          ${activeMode === 'tailwind' ? `
            .btn { ${tailwindCode} }
            .navbar { ${tailwindCode} }
            .nav-list { ${tailwindCode} }
            .card-grid { ${tailwindCode} }
            .card { ${tailwindCode} }
          ` : ''}
        </style>
        ${activeMode === 'tailwind' ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
      </head>
      <body>
        ${htmlCode}
      </body>
      </html>
    `;
    
    return (
      <iframe
        srcDoc={htmlWithStyles}
        className="w-full h-96 border border-white/20 rounded-lg"
        title="Preview"
      />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            CSS vs Tailwind Playground
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="opacity-80">
            Compare CSS and Tailwind implementations side by side. Choose a challenge and code away!
          </p>
        </CardContent>
      </Card>

      {/* Challenge Selector */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle>Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challenges.map((challenge) => (
              <Button
                key={challenge.id}
                variant="outline"
                onClick={() => setCurrentChallenge(challenge)}
                className={`p-4 h-auto flex flex-col items-start bg-white/5 border-white/20 hover:bg-white/10 ${
                  currentChallenge?.id === challenge.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium">{challenge.title}</h4>
                  <Badge 
                    variant={challenge.difficulty === 'easy' ? 'secondary' : challenge.difficulty === 'medium' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {challenge.difficulty}
                  </Badge>
                </div>
                <p className="text-sm opacity-70 text-left">{challenge.description}</p>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {currentChallenge && (
        <>
          {/* Challenge Info */}
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
                <div className="flex gap-2">
                  <Button
                    onClick={() => validateCode('css')}
                    disabled={isValidating}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Validate CSS
                  </Button>
                  <Button
                    onClick={() => validateCode('tailwind')}
                    disabled={isValidating}
                    className="bg-cyan-500 hover:bg-cyan-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Validate Tailwind
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Hints:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm opacity-80">
                  {currentChallenge.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Split Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CSS Editor */}
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    CSS Editor
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {validationResult.css.valid ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                    <Button
                      size="sm"
                      onClick={() => setCssCode(currentChallenge.targetCSS)}
                      className="bg-white/10 hover:bg-white/20"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Solution
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <textarea
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  className="w-full h-64 p-4 bg-white/10 border border-white/20 rounded-lg font-mono text-sm resize-none"
                  placeholder="Write your CSS here..."
                />
                {validationResult.css.errors.length > 0 && (
                  <div className="mt-2 text-sm text-red-400">
                    {validationResult.css.errors.map((error, index) => (
                      <div key={index}>• {error}</div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tailwind Editor */}
            <Card className="glass-effect border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Tailwind Editor
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {validationResult.tailwind.valid ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                    <Button
                      size="sm"
                      onClick={() => setTailwindCode(currentChallenge.targetTailwind)}
                      className="bg-white/10 hover:bg-white/20"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Solution
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <textarea
                  value={tailwindCode}
                  onChange={(e) => setTailwindCode(e.target.value)}
                  className="w-full h-64 p-4 bg-white/10 border border-white/20 rounded-lg font-mono text-sm resize-none"
                  placeholder="Write your Tailwind classes here..."
                />
                {validationResult.tailwind.errors.length > 0 && (
                  <div className="mt-2 text-sm text-red-400">
                    {validationResult.tailwind.errors.map((error, index) => (
                      <div key={index}>• {error}</div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* HTML Editor */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle>HTML Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-32 p-4 bg-white/10 border border-white/20 rounded-lg font-mono text-sm resize-none"
                placeholder="HTML structure..."
              />
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Live Preview</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setActiveMode('css')}
                    variant={activeMode === 'css' ? 'default' : 'outline'}
                    className="bg-white/10 border-white/20"
                  >
                    CSS Mode
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setActiveMode('tailwind')}
                    variant={activeMode === 'tailwind' ? 'default' : 'outline'}
                    className="bg-white/10 border-white/20"
                  >
                    Tailwind Mode
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {renderPreview()}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
