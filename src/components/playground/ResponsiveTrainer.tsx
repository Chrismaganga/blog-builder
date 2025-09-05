"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  CheckCircle,
  XCircle,
  RotateCcw,
  Eye,
  Code,
  Layout
} from "lucide-react";

interface BreakpointTest {
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
  description: string;
}

interface ResponsiveChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mockup: string;
  requirements: {
    mobile: string[];
    tablet: string[];
    desktop: string[];
  };
  hints: string[];
  targetCSS: string;
  targetTailwind: string;
}

export default function ResponsiveTrainer() {
  const [currentChallenge, setCurrentChallenge] = useState<ResponsiveChallenge | null>(null);
  const [cssCode, setCssCode] = useState('');
  const [tailwindCode, setTailwindCode] = useState('');
  const [selectedMode, setSelectedMode] = useState<'css' | 'tailwind'>('css');
  const [currentBreakpoint, setCurrentBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [testResults, setTestResults] = useState<{
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  }>({ mobile: false, tablet: false, desktop: false });
  const [showHints, setShowHints] = useState(false);

  const breakpoints: BreakpointTest[] = [
    {
      name: 'Mobile',
      width: 375,
      height: 667,
      icon: <Smartphone className="h-5 w-5" />,
      description: 'Small screens (320px - 768px)'
    },
    {
      name: 'Tablet',
      width: 768,
      height: 1024,
      icon: <Tablet className="h-5 w-5" />,
      description: 'Medium screens (768px - 1024px)'
    },
    {
      name: 'Desktop',
      width: 1440,
      height: 900,
      icon: <Monitor className="h-5 w-5" />,
      description: 'Large screens (1024px+)'
    }
  ];

  const challenges: ResponsiveChallenge[] = [
    {
      id: '1',
      title: 'Responsive Card Grid',
      description: 'Create a card grid that adapts to different screen sizes',
      difficulty: 'easy',
      mockup: '/api/placeholder/400/300',
      requirements: {
        mobile: ['Single column layout', 'Full width cards', 'Proper spacing'],
        tablet: ['Two column layout', 'Medium width cards', 'Balanced spacing'],
        desktop: ['Three column layout', 'Fixed width cards', 'Optimal spacing']
      },
      hints: [
        'Use CSS Grid with auto-fit',
        'Set different grid-template-columns for each breakpoint',
        'Use minmax() for responsive column sizing'
      ],
      targetCSS: `.card-grid {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
      targetTailwind: 'grid gap-4 p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    },
    {
      id: '2',
      title: 'Flexible Navigation',
      description: 'Build a navigation that transforms from hamburger to horizontal',
      difficulty: 'medium',
      mockup: '/api/placeholder/400/100',
      requirements: {
        mobile: ['Hamburger menu', 'Vertical layout', 'Hidden navigation'],
        tablet: ['Horizontal layout', 'Visible navigation', 'Medium spacing'],
        desktop: ['Full horizontal layout', 'All items visible', 'Optimal spacing']
      },
      hints: [
        'Use flexbox for layout',
        'Hide/show elements with display properties',
        'Use transform for smooth animations'
      ],
      targetCSS: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.nav-links {
  display: none;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
    gap: 2rem;
  }
}`,
      targetTailwind: 'flex justify-between items-center p-4 hidden md:flex gap-8'
    },
    {
      id: '3',
      title: 'Responsive Typography',
      description: 'Create text that scales appropriately across devices',
      difficulty: 'hard',
      mockup: '/api/placeholder/400/200',
      requirements: {
        mobile: ['Small font sizes', 'Tight line height', 'Compact spacing'],
        tablet: ['Medium font sizes', 'Balanced line height', 'Moderate spacing'],
        desktop: ['Large font sizes', 'Comfortable line height', 'Generous spacing']
      },
      hints: [
        'Use clamp() for fluid typography',
        'Set different font sizes for each breakpoint',
        'Adjust line-height and spacing proportionally'
      ],
      targetCSS: `.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.text {
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
}`,
      targetTailwind: 'text-2xl md:text-4xl lg:text-6xl leading-tight mb-4 text-base md:text-lg lg:text-xl leading-relaxed'
    }
  ];

  const testResponsiveness = () => {
    // Simulate responsiveness testing
    const code = selectedMode === 'css' ? cssCode : tailwindCode;
    
    // Simple validation - in real app, use proper CSS parsing
    const hasMobileStyles = code.includes('@media') || code.includes('sm:') || code.includes('md:');
    const hasTabletStyles = code.includes('768px') || code.includes('md:') || code.includes('lg:');
    const hasDesktopStyles = code.includes('1024px') || code.includes('lg:') || code.includes('xl:');
    
    setTestResults({
      mobile: hasMobileStyles,
      tablet: hasTabletStyles,
      desktop: hasDesktopStyles
    });
  };

  const getBreakpointWidth = () => {
    switch (currentBreakpoint) {
      case 'mobile': return 375;
      case 'tablet': return 768;
      case 'desktop': return 1440;
      default: return 1440;
    }
  };

  const renderPreview = () => {
    const width = getBreakpointWidth();
    const htmlWithStyles = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ${cssCode}
          ${selectedMode === 'tailwind' ? `
            .card-grid { ${tailwindCode} }
            .navbar { ${tailwindCode} }
            .heading { ${tailwindCode} }
            .text { ${tailwindCode} }
          ` : ''}
        </style>
        ${selectedMode === 'tailwind' ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
      </head>
      <body>
        <div class="preview-container" style="width: ${width}px; margin: 0 auto; border: 1px solid #ccc;">
          ${currentChallenge ? getChallengeHTML() : '<div>Select a challenge to start</div>'}
        </div>
      </body>
      </html>
    `;
    
    return (
      <iframe
        srcDoc={htmlWithStyles}
        className="w-full h-96 border border-white/20 rounded-lg"
        title="Responsive Preview"
      />
    );
  };

  const getChallengeHTML = () => {
    if (!currentChallenge) return '';
    
    switch (currentChallenge.id) {
      case '1':
        return `
          <div class="card-grid">
            <div class="card" style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem;">Card 1</div>
            <div class="card" style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem;">Card 2</div>
            <div class="card" style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem;">Card 3</div>
          </div>
        `;
      case '2':
        return `
          <nav class="navbar" style="background: #1f2937; color: white;">
            <div class="logo">Brand</div>
            <ul class="nav-links" style="list-style: none; display: flex; gap: 1rem;">
              <li><a href="#" style="color: white; text-decoration: none;">Home</a></li>
              <li><a href="#" style="color: white; text-decoration: none;">About</a></li>
              <li><a href="#" style="color: white; text-decoration: none;">Contact</a></li>
            </ul>
          </nav>
        `;
      case '3':
        return `
          <div style="padding: 2rem;">
            <h1 class="heading" style="color: #1f2937;">Responsive Heading</h1>
            <p class="text" style="color: #6b7280;">This is a responsive text that should scale appropriately across different screen sizes. It should be readable on mobile devices and comfortable on desktop screens.</p>
          </div>
        `;
      default:
        return '<div>No challenge selected</div>';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Responsive Design Trainer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="opacity-80">
            Master responsive design by building layouts that work across all devices
          </p>
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
                  <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white`}>
                    {challenge.difficulty}
                  </Badge>
                </div>
                <p className="opacity-80 text-sm">{challenge.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    Mockup Preview
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Requirements:</h4>
                    <ul className="text-xs opacity-70 space-y-1">
                      <li>• Mobile: {challenge.requirements.mobile[0]}</li>
                      <li>• Tablet: {challenge.requirements.tablet[0]}</li>
                      <li>• Desktop: {challenge.requirements.desktop[0]}</li>
                    </ul>
                  </div>

                  <Button
                    onClick={() => setCurrentChallenge(challenge)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Start Challenge
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
                    <Layout className="h-5 w-5" />
                    {currentChallenge.title}
                  </CardTitle>
                  <p className="opacity-80 mt-1">{currentChallenge.description}</p>
                </div>
                <Button
                  onClick={() => setCurrentChallenge(null)}
                  variant="outline"
                  className="bg-white/10 border-white/20"
                >
                  Exit Challenge
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {breakpoints.map((breakpoint) => (
                  <div key={breakpoint.name} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      {breakpoint.icon}
                    </div>
                    <h4 className="font-medium">{breakpoint.name}</h4>
                    <p className="text-sm opacity-60">{breakpoint.description}</p>
                    <div className="mt-2">
                      {testResults[breakpoint.name.toLowerCase() as keyof typeof testResults] ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400 mx-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Breakpoint Selector */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle>Test Different Breakpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {breakpoints.map((breakpoint) => (
                  <Button
                    key={breakpoint.name}
                    onClick={() => setCurrentBreakpoint(breakpoint.name.toLowerCase() as any)}
                    variant={currentBreakpoint === breakpoint.name.toLowerCase() ? 'default' : 'outline'}
                    className="flex items-center gap-2 bg-white/10 border-white/20"
                  >
                    {breakpoint.icon}
                    {breakpoint.name}
                  </Button>
                ))}
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
                    onClick={testResponsiveness}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Test Responsiveness
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
                <CardTitle>Hints & Requirements</CardTitle>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Hints:</h4>
                    <ul className="text-sm space-y-1 opacity-80">
                      {currentChallenge.hints.map((hint, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          {hint}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Requirements by Breakpoint:</h4>
                    <div className="space-y-3">
                      {Object.entries(currentChallenge.requirements).map(([breakpoint, requirements]) => (
                        <div key={breakpoint}>
                          <h5 className="font-medium text-sm capitalize">{breakpoint}:</h5>
                          <ul className="text-xs space-y-1 opacity-70">
                            {requirements.map((req, index) => (
                              <li key={index}>• {req}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Preview */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Preview - {currentBreakpoint.charAt(0).toUpperCase() + currentBreakpoint.slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderPreview()}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
