"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Zap, 
  ToggleLeft, 
  ToggleRight,
  CheckCircle,
  XCircle,
  Info,
  Copy,
  RotateCcw
} from "lucide-react";

interface ComponentExample {
  id: string;
  name: string;
  description: string;
  utilityImplementation: {
    html: string;
    tailwind: string;
    pros: string[];
    cons: string[];
  };
  customImplementation: {
    html: string;
    css: string;
    pros: string[];
    cons: string[];
  };
}

export default function UtilityVsCustom() {
  const [selectedExample, setSelectedExample] = useState<string>('button');
  const [activeMode, setActiveMode] = useState<'utility' | 'custom'>('utility');
  const [showComparison, setShowComparison] = useState(false);

  const examples: ComponentExample[] = [
    {
      id: 'button',
      name: 'Button Component',
      description: 'A primary action button with hover and focus states',
      utilityImplementation: {
        html: '<button class="btn-primary">Click me</button>',
        tailwind: 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200',
        pros: [
          'Quick to implement',
          'Consistent design system',
          'Easy to modify',
          'No custom CSS needed'
        ],
        cons: [
          'Large HTML classes',
          'Less semantic',
          'Harder to customize deeply',
          'Bundle size concerns'
        ]
      },
      customImplementation: {
        html: '<button class="btn-primary">Click me</button>',
        css: `.btn-primary {
  background-color: #3b82f6;
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6, 0 0 0 4px rgba(59, 130, 246, 0.1);
}`,
        pros: [
          'Clean HTML',
          'Full control over styling',
          'Better performance',
          'Semantic class names'
        ],
        cons: [
          'More code to write',
          'Inconsistent across projects',
          'Harder to maintain',
          'Requires CSS knowledge'
        ]
      }
    },
    {
      id: 'card',
      name: 'Card Component',
      description: 'A content container with shadow and rounded corners',
      utilityImplementation: {
        html: '<div class="card">\n  <h3>Card Title</h3>\n  <p>Card content goes here</p>\n</div>',
        tailwind: 'bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200',
        pros: [
          'Rapid prototyping',
          'Design system consistency',
          'Easy responsive design',
          'No CSS maintenance'
        ],
        cons: [
          'Verbose class names',
          'Less flexible',
          'Harder to theme',
          'Learning curve'
        ]
      },
      customImplementation: {
        html: '<div class="card">\n  <h3>Card Title</h3>\n  <p>Card content goes here</p>\n</div>',
        css: `.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}`,
        pros: [
          'Clean markup',
          'Full customization',
          'Better performance',
          'Semantic naming'
        ],
        cons: [
          'More development time',
          'Inconsistent styling',
          'CSS maintenance',
          'Responsive complexity'
        ]
      }
    },
    {
      id: 'form',
      name: 'Form Input',
      description: 'A styled form input with validation states',
      utilityImplementation: {
        html: '<input type="text" placeholder="Enter your name" class="form-input" />',
        tailwind: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400',
        pros: [
          'Consistent form styling',
          'Built-in focus states',
          'Easy validation styling',
          'Responsive by default'
        ],
        cons: [
          'Long class strings',
          'Less semantic',
          'Harder to customize',
          'Bundle size impact'
        ]
      },
      customImplementation: {
        html: '<input type="text" placeholder="Enter your name" class="form-input" />',
        css: `.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #111827;
  background-color: white;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}`,
        pros: [
          'Clean HTML',
          'Full control',
          'Better performance',
          'Semantic classes'
        ],
        cons: [
          'More CSS code',
          'Inconsistent styling',
          'Maintenance overhead',
          'Responsive challenges'
        ]
      }
    }
  ];

  const currentExample = examples.find(ex => ex.id === selectedExample) || examples[0];

  const renderPreview = () => {
    const implementation = activeMode === 'utility' 
      ? currentExample.utilityImplementation 
      : currentExample.customImplementation;

    const htmlWithStyles = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          ${activeMode === 'custom' ? implementation.css : ''}
          ${activeMode === 'utility' ? `
            .btn-primary { ${implementation.tailwind} }
            .card { ${implementation.tailwind} }
            .form-input { ${implementation.tailwind} }
          ` : ''}
        </style>
        ${activeMode === 'utility' ? '<script src="https://cdn.tailwindcss.com"></script>' : ''}
      </head>
      <body style="padding: 2rem; background: #f9fafb;">
        ${implementation.html}
      </body>
      </html>
    `;

    return (
      <iframe
        srcDoc={htmlWithStyles}
        className="w-full h-64 border border-white/20 rounded-lg"
        title="Component Preview"
      />
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ToggleLeft className="h-5 w-5" />
            Utility vs Custom CSS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="opacity-80">
            Compare utility-first (Tailwind) and custom CSS approaches. See the trade-offs 
            between rapid development and full control.
          </p>
        </CardContent>
      </Card>

      {/* Example Selector */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle>Component Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {examples.map((example) => (
              <Button
                key={example.id}
                variant={selectedExample === example.id ? 'default' : 'outline'}
                onClick={() => setSelectedExample(example.id)}
                className={`p-4 h-auto flex flex-col items-start bg-white/5 border-white/20 hover:bg-white/10 ${
                  selectedExample === example.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <h4 className="font-medium mb-1">{example.name}</h4>
                <p className="text-sm opacity-70 text-left">{example.description}</p>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Toggle */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Implementation Comparison</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setActiveMode('utility')}
                variant={activeMode === 'utility' ? 'default' : 'outline'}
                className="flex items-center gap-2 bg-white/10 border-white/20"
              >
                <Zap className="h-4 w-4" />
                Utility (Tailwind)
              </Button>
              <Button
                onClick={() => setActiveMode('custom')}
                variant={activeMode === 'custom' ? 'default' : 'outline'}
                className="flex items-center gap-2 bg-white/10 border-white/20"
              >
                <Code className="h-4 w-4" />
                Custom CSS
              </Button>
              <Button
                onClick={() => setShowComparison(!showComparison)}
                variant="outline"
                className="bg-white/10 border-white/20"
              >
                <Info className="h-4 w-4 mr-2" />
                {showComparison ? 'Hide' : 'Show'} Comparison
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Implementation */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">HTML Structure</h4>
                <div className="relative">
                  <pre className="bg-white/10 p-4 rounded-lg text-sm overflow-x-auto">
                    {activeMode === 'utility' 
                      ? currentExample.utilityImplementation.html 
                      : currentExample.customImplementation.html
                    }
                  </pre>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(
                      activeMode === 'utility' 
                        ? currentExample.utilityImplementation.html 
                        : currentExample.customImplementation.html
                    )}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">
                  {activeMode === 'utility' ? 'Tailwind Classes' : 'CSS Styles'}
                </h4>
                <div className="relative">
                  <pre className="bg-white/10 p-4 rounded-lg text-sm overflow-x-auto">
                    {activeMode === 'utility' 
                      ? currentExample.utilityImplementation.tailwind 
                      : currentExample.customImplementation.css
                    }
                  </pre>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(
                      activeMode === 'utility' 
                        ? currentExample.utilityImplementation.tailwind 
                        : currentExample.customImplementation.css
                    )}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div>
              <h4 className="font-medium mb-2">Live Preview</h4>
              {renderPreview()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pros and Cons Comparison */}
      {showComparison && (
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle>Pros & Cons Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Utility Approach */}
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-400" />
                  Utility-First (Tailwind)
                </h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-green-400 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Advantages
                    </h5>
                    <ul className="space-y-1 text-sm">
                      {currentExample.utilityImplementation.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-400 mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Disadvantages
                    </h5>
                    <ul className="space-y-1 text-sm">
                      {currentExample.utilityImplementation.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Custom CSS Approach */}
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-400" />
                  Custom CSS
                </h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-green-400 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Advantages
                    </h5>
                    <ul className="space-y-1 text-sm">
                      {currentExample.customImplementation.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-400 mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Disadvantages
                    </h5>
                    <ul className="space-y-1 text-sm">
                      {currentExample.customImplementation.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* When to Use What */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle>When to Use What?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-blue-400">Use Utility-First When:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  Rapid prototyping and MVP development
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  Team prefers consistency over customization
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  Building design system components
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  Need responsive design out of the box
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-purple-400">Use Custom CSS When:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  Building unique, brand-specific designs
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  Performance is critical (smaller bundle)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  Complex animations and interactions
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  Working with existing CSS architecture
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
