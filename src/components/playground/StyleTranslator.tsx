"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRightLeft, 
  Code, 
  Zap,
  Copy,
  RotateCcw,
  CheckCircle
} from "lucide-react";

export default function StyleTranslator() {
  const [cssInput, setCssInput] = useState('');
  const [tailwindInput, setTailwindInput] = useState('');
  const [translationMode, setTranslationMode] = useState<'css-to-tailwind' | 'tailwind-to-css'>('css-to-tailwind');
  const [isTranslating, setIsTranslating] = useState(false);
  const [lastTranslation, setLastTranslation] = useState('');

  const cssToTailwindMap: { [key: string]: string } = {
    'display: flex': 'flex',
    'display: grid': 'grid',
    'justify-content: center': 'justify-center',
    'justify-content: space-between': 'justify-between',
    'align-items: center': 'items-center',
    'flex-direction: column': 'flex-col',
    'flex-direction: row': 'flex-row',
    'gap: 1rem': 'gap-4',
    'gap: 0.5rem': 'gap-2',
    'gap: 2rem': 'gap-8',
    'padding: 1rem': 'p-4',
    'padding: 0.5rem': 'p-2',
    'padding: 2rem': 'p-8',
    'margin: 1rem': 'm-4',
    'margin: 0 auto': 'mx-auto',
    'width: 100%': 'w-full',
    'height: 100%': 'h-full',
    'background-color: red': 'bg-red-500',
    'background-color: blue': 'bg-blue-500',
    'background-color: green': 'bg-green-500',
    'color: white': 'text-white',
    'color: black': 'text-black',
    'font-size: 1rem': 'text-base',
    'font-size: 1.5rem': 'text-xl',
    'font-size: 2rem': 'text-2xl',
    'font-weight: bold': 'font-bold',
    'text-align: center': 'text-center',
    'border-radius: 0.5rem': 'rounded-lg',
    'border-radius: 0.25rem': 'rounded',
    'box-shadow: 0 4px 6px rgba(0,0,0,0.1)': 'shadow-lg',
    'opacity: 0.5': 'opacity-50',
    'opacity: 0.75': 'opacity-75',
    'position: absolute': 'absolute',
    'position: relative': 'relative',
    'position: fixed': 'fixed',
    'top: 0': 'top-0',
    'left: 0': 'left-0',
    'right: 0': 'right-0',
    'bottom: 0': 'bottom-0',
    'z-index: 10': 'z-10',
    'cursor: pointer': 'cursor-pointer',
    'user-select: none': 'select-none',
    'overflow: hidden': 'overflow-hidden',
    'text-decoration: none': 'no-underline',
    'list-style: none': 'list-none',
    'outline: none': 'outline-none',
    'border: none': 'border-none',
    'transition: all 0.2s': 'transition-all duration-200',
    'transform: translateY(-2px)': 'hover:-translate-y-0.5',
    'transform: scale(1.05)': 'hover:scale-105'
  };

  const tailwindToCssMap: { [key: string]: string } = {
    'flex': 'display: flex;',
    'grid': 'display: grid;',
    'justify-center': 'justify-content: center;',
    'justify-between': 'justify-content: space-between;',
    'items-center': 'align-items: center;',
    'flex-col': 'flex-direction: column;',
    'flex-row': 'flex-direction: row;',
    'gap-4': 'gap: 1rem;',
    'gap-2': 'gap: 0.5rem;',
    'gap-8': 'gap: 2rem;',
    'p-4': 'padding: 1rem;',
    'p-2': 'padding: 0.5rem;',
    'p-8': 'padding: 2rem;',
    'm-4': 'margin: 1rem;',
    'mx-auto': 'margin: 0 auto;',
    'w-full': 'width: 100%;',
    'h-full': 'height: 100%;',
    'bg-red-500': 'background-color: #ef4444;',
    'bg-blue-500': 'background-color: #3b82f6;',
    'bg-green-500': 'background-color: #22c55e;',
    'text-white': 'color: white;',
    'text-black': 'color: black;',
    'text-base': 'font-size: 1rem;',
    'text-xl': 'font-size: 1.25rem;',
    'text-2xl': 'font-size: 1.5rem;',
    'font-bold': 'font-weight: bold;',
    'text-center': 'text-align: center;',
    'rounded-lg': 'border-radius: 0.5rem;',
    'rounded': 'border-radius: 0.25rem;',
    'shadow-lg': 'box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);',
    'opacity-50': 'opacity: 0.5;',
    'opacity-75': 'opacity: 0.75;',
    'absolute': 'position: absolute;',
    'relative': 'position: relative;',
    'fixed': 'position: fixed;',
    'top-0': 'top: 0;',
    'left-0': 'left: 0;',
    'right-0': 'right: 0;',
    'bottom-0': 'bottom: 0;',
    'z-10': 'z-index: 10;',
    'cursor-pointer': 'cursor: pointer;',
    'select-none': 'user-select: none;',
    'overflow-hidden': 'overflow: hidden;',
    'no-underline': 'text-decoration: none;',
    'list-none': 'list-style: none;',
    'outline-none': 'outline: none;',
    'border-none': 'border: none;',
    'transition-all': 'transition: all 0.2s;',
    'duration-200': 'transition-duration: 200ms;',
    'hover:-translate-y-0.5': 'transform: translateY(-2px);',
    'hover:scale-105': 'transform: scale(1.05);'
  };

  const translateCssToTailwind = (css: string) => {
    let result = css;
    
    // Remove CSS selectors and braces
    result = result.replace(/[^{}]+{([^}]+)}/g, '$1');
    
    // Split by semicolons and process each property
    const properties = result.split(';').filter(prop => prop.trim());
    const tailwindClasses: string[] = [];
    
    properties.forEach(property => {
      const trimmed = property.trim();
      if (cssToTailwindMap[trimmed]) {
        tailwindClasses.push(cssToTailwindMap[trimmed]);
      } else {
        // Try to find partial matches
        const found = Object.keys(cssToTailwindMap).find(key => 
          trimmed.includes(key.split(':')[0])
        );
        if (found) {
          tailwindClasses.push(cssToTailwindMap[found]);
        }
      }
    });
    
    return tailwindClasses.join(' ');
  };

  const translateTailwindToCss = (tailwind: string) => {
    const classes = tailwind.split(' ').filter(cls => cls.trim());
    const cssProperties: string[] = [];
    
    classes.forEach(cls => {
      if (tailwindToCssMap[cls]) {
        cssProperties.push(tailwindToCssMap[cls]);
      } else {
        // Handle responsive prefixes
        const responsiveMatch = cls.match(/^(sm|md|lg|xl):(.+)$/);
        if (responsiveMatch) {
          const [, breakpoint, baseClass] = responsiveMatch;
          if (tailwindToCssMap[baseClass]) {
            const mediaQuery = `@media (min-width: ${getBreakpointValue(breakpoint)}) { ${tailwindToCssMap[baseClass]} }`;
            cssProperties.push(mediaQuery);
          }
        }
      }
    });
    
    return cssProperties.join('\n');
  };

  const getBreakpointValue = (breakpoint: string) => {
    const breakpoints: { [key: string]: string } = {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    };
    return breakpoints[breakpoint] || '640px';
  };

  const handleTranslate = async () => {
    setIsTranslating(true);
    
    // Simulate translation delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (translationMode === 'css-to-tailwind') {
      const result = translateCssToTailwind(cssInput);
      setTailwindInput(result);
      setLastTranslation(result);
    } else {
      const result = translateTailwindToCss(tailwindInput);
      setCssInput(result);
      setLastTranslation(result);
    }
    
    setIsTranslating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const resetInputs = () => {
    setCssInput('');
    setTailwindInput('');
    setLastTranslation('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            Style Translator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="opacity-80">
            Convert between CSS and Tailwind classes instantly. Learn how Tailwind maps to CSS properties.
          </p>
        </CardContent>
      </Card>

      {/* Translation Mode Selector */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle>Translation Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              onClick={() => setTranslationMode('css-to-tailwind')}
              variant={translationMode === 'css-to-tailwind' ? 'default' : 'outline'}
              className="flex items-center gap-2 bg-white/10 border-white/20"
            >
              <Code className="h-4 w-4" />
              CSS → Tailwind
            </Button>
            <Button
              onClick={() => setTranslationMode('tailwind-to-css')}
              variant={translationMode === 'tailwind-to-css' ? 'default' : 'outline'}
              className="flex items-center gap-2 bg-white/10 border-white/20"
            >
              <Zap className="h-4 w-4" />
              Tailwind → CSS
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Translation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {translationMode === 'css-to-tailwind' ? (
                  <>
                    <Code className="h-5 w-5" />
                    CSS Input
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    Tailwind Input
                  </>
                )}
              </CardTitle>
              <Button
                onClick={resetInputs}
                size="sm"
                variant="outline"
                className="bg-white/10 border-white/20"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              value={translationMode === 'css-to-tailwind' ? cssInput : tailwindInput}
              onChange={(e) => {
                if (translationMode === 'css-to-tailwind') {
                  setCssInput(e.target.value);
                } else {
                  setTailwindInput(e.target.value);
                }
              }}
              className="w-full h-64 p-4 bg-white/10 border border-white/20 rounded-lg font-mono text-sm resize-none"
              placeholder={
                translationMode === 'css-to-tailwind' 
                  ? 'Enter your CSS code here...\n\nExample:\n.button {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 1rem;\n  background-color: blue;\n  color: white;\n}'
                  : 'Enter your Tailwind classes here...\n\nExample:\nflex justify-center items-center p-4 bg-blue-500 text-white'
              }
            />
            <div className="mt-4 flex justify-end">
              <Button
                onClick={handleTranslate}
                disabled={isTranslating || (translationMode === 'css-to-tailwind' ? !cssInput.trim() : !tailwindInput.trim())}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isTranslating ? 'Translating...' : 'Translate'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {translationMode === 'css-to-tailwind' ? (
                  <>
                    <Zap className="h-5 w-5" />
                    Tailwind Output
                  </>
                ) : (
                  <>
                    <Code className="h-5 w-5" />
                    CSS Output
                  </>
                )}
              </CardTitle>
              {lastTranslation && (
                <Button
                  onClick={() => copyToClipboard(lastTranslation)}
                  size="sm"
                  variant="outline"
                  className="bg-white/10 border-white/20"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full h-64 p-4 bg-white/10 border border-white/20 rounded-lg font-mono text-sm overflow-auto">
              {lastTranslation ? (
                <pre className="whitespace-pre-wrap">{lastTranslation}</pre>
              ) : (
                <div className="text-gray-500 italic">
                  {translationMode === 'css-to-tailwind' 
                    ? 'Tailwind classes will appear here...'
                    : 'CSS code will appear here...'
                  }
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Reference */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle>Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Common CSS → Tailwind</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(cssToTailwindMap).slice(0, 10).map(([css, tailwind]) => (
                  <div key={css} className="flex items-center justify-between p-2 bg-white/5 rounded">
                    <code className="text-blue-400">{css}</code>
                    <ArrowRightLeft className="h-3 w-3 mx-2" />
                    <code className="text-green-400">{tailwind}</code>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Common Tailwind → CSS</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(tailwindToCssMap).slice(0, 10).map(([tailwind, css]) => (
                  <div key={tailwind} className="flex items-center justify-between p-2 bg-white/5 rounded">
                    <code className="text-green-400">{tailwind}</code>
                    <ArrowRightLeft className="h-3 w-3 mx-2" />
                    <code className="text-blue-400">{css}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
