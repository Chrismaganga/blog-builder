"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Palette, 
  Type, 
  Layout, 
  Sparkles,
  Save,
  RotateCcw,
  Eye,
  Download
} from "lucide-react";

interface ThemeCustomizerProps {
  onThemeChange: (theme: any) => void;
  styleMode: 'tailwind' | 'css';
}

export default function ThemeCustomizer({ onThemeChange, styleMode }: ThemeCustomizerProps) {
  const [theme, setTheme] = useState({
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#000000',
      muted: '#6b7280'
    },
    typography: {
      fontFamily: 'Inter',
      headingFont: 'Inter',
      fontSize: {
        base: '16px',
        sm: '14px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px'
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem'
    },
    shadows: {
      sm: '0 1px 2px rgba(0,0,0,0.05)',
      md: '0 4px 6px rgba(0,0,0,0.1)',
      lg: '0 10px 15px rgba(0,0,0,0.1)',
      xl: '0 20px 25px rgba(0,0,0,0.1)'
    }
  });

  const colorPresets = [
    {
      name: 'Ocean Blue',
      colors: {
        primary: '#0ea5e9',
        secondary: '#3b82f6',
        accent: '#06b6d4',
        background: '#ffffff',
        text: '#0f172a',
        muted: '#64748b'
      }
    },
    {
      name: 'Purple Dreams',
      colors: {
        primary: '#8b5cf6',
        secondary: '#a855f7',
        accent: '#ec4899',
        background: '#ffffff',
        text: '#1e1b4b',
        muted: '#6b7280'
      }
    },
    {
      name: 'Forest Green',
      colors: {
        primary: '#10b981',
        secondary: '#059669',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#064e3b',
        muted: '#6b7280'
      }
    },
    {
      name: 'Sunset Orange',
      colors: {
        primary: '#f97316',
        secondary: '#ea580c',
        accent: '#dc2626',
        background: '#ffffff',
        text: '#7c2d12',
        muted: '#6b7280'
      }
    }
  ];

  const fontPresets = [
    { name: 'Inter', value: 'Inter' },
    { name: 'Roboto', value: 'Roboto' },
    { name: 'Poppins', value: 'Poppins' },
    { name: 'Open Sans', value: 'Open Sans' },
    { name: 'Lato', value: 'Lato' },
    { name: 'Montserrat', value: 'Montserrat' }
  ];

  const handleColorChange = (colorKey: string, value: string) => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        [colorKey]: value
      }
    };
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  const handlePresetApply = (preset: any) => {
    const newTheme = {
      ...theme,
      colors: preset.colors
    };
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  const handleFontChange = (fontKey: string, value: string) => {
    const newTheme = {
      ...theme,
      typography: {
        ...theme.typography,
        [fontKey]: value
      }
    };
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  const generateThemeCode = () => {
    if (styleMode === 'tailwind') {
      return `// Tailwind CSS Custom Theme
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${theme.colors.primary}',
        secondary: '${theme.colors.secondary}',
        accent: '${theme.colors.accent}',
      },
      fontFamily: {
        sans: ['${theme.typography.fontFamily}', 'sans-serif'],
        heading: ['${theme.typography.headingFont}', 'sans-serif'],
      },
      fontSize: {
        'xs': '${theme.typography.fontSize.sm}',
        'sm': '${theme.typography.fontSize.sm}',
        'base': '${theme.typography.fontSize.base}',
        'lg': '${theme.typography.fontSize.lg}',
        'xl': '${theme.typography.fontSize.xl}',
        '2xl': '${theme.typography.fontSize['2xl']}',
        '3xl': '${theme.typography.fontSize['3xl']}',
        '4xl': '${theme.typography.fontSize['4xl']}',
      },
      spacing: {
        'xs': '${theme.spacing.xs}',
        'sm': '${theme.spacing.sm}',
        'md': '${theme.spacing.md}',
        'lg': '${theme.spacing.lg}',
        'xl': '${theme.spacing.xl}',
        '2xl': '${theme.spacing['2xl']}',
      },
      borderRadius: {
        'sm': '${theme.borderRadius.sm}',
        'md': '${theme.borderRadius.md}',
        'lg': '${theme.borderRadius.lg}',
        'xl': '${theme.borderRadius.xl}',
      },
      boxShadow: {
        'sm': '${theme.shadows.sm}',
        'md': '${theme.shadows.md}',
        'lg': '${theme.shadows.lg}',
        'xl': '${theme.shadows.xl}',
      }
    }
  }
}`;
    } else {
      return `/* Custom CSS Variables */
:root {
  --color-primary: ${theme.colors.primary};
  --color-secondary: ${theme.colors.secondary};
  --color-accent: ${theme.colors.accent};
  --color-background: ${theme.colors.background};
  --color-text: ${theme.colors.text};
  --color-muted: ${theme.colors.muted};
  
  --font-family: '${theme.typography.fontFamily}', sans-serif;
  --font-heading: '${theme.typography.headingFont}', sans-serif;
  
  --font-size-xs: ${theme.typography.fontSize.sm};
  --font-size-sm: ${theme.typography.fontSize.sm};
  --font-size-base: ${theme.typography.fontSize.base};
  --font-size-lg: ${theme.typography.fontSize.lg};
  --font-size-xl: ${theme.typography.fontSize.xl};
  --font-size-2xl: ${theme.typography.fontSize['2xl']};
  --font-size-3xl: ${theme.typography.fontSize['3xl']};
  --font-size-4xl: ${theme.typography.fontSize['4xl']};
  
  --spacing-xs: ${theme.spacing.xs};
  --spacing-sm: ${theme.spacing.sm};
  --spacing-md: ${theme.spacing.md};
  --spacing-lg: ${theme.spacing.lg};
  --spacing-xl: ${theme.spacing.xl};
  --spacing-2xl: ${theme.spacing['2xl']};
  
  --border-radius-sm: ${theme.borderRadius.sm};
  --border-radius-md: ${theme.borderRadius.md};
  --border-radius-lg: ${theme.borderRadius.lg};
  --border-radius-xl: ${theme.borderRadius.xl};
  
  --shadow-sm: ${theme.shadows.sm};
  --shadow-md: ${theme.shadows.md};
  --shadow-lg: ${theme.shadows.lg};
  --shadow-xl: ${theme.shadows.xl};
}`;
    }
  };

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme Customizer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass-effect border-white/20">
            <TabsTrigger value="colors" className="font-medium">Colors</TabsTrigger>
            <TabsTrigger value="typography" className="font-medium">Typography</TabsTrigger>
            <TabsTrigger value="spacing" className="font-medium">Spacing</TabsTrigger>
            <TabsTrigger value="export" className="font-medium">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-6">
            {/* Color Presets */}
            <div>
              <h4 className="font-medium mb-3">Color Presets</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {colorPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    onClick={() => handlePresetApply(preset)}
                    className="flex flex-col items-center p-3 h-auto bg-white/5 border-white/20 hover:bg-white/10"
                  >
                    <div className="flex gap-1 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20" 
                        style={{ backgroundColor: preset.colors.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20" 
                        style={{ backgroundColor: preset.colors.secondary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20" 
                        style={{ backgroundColor: preset.colors.accent }}
                      />
                    </div>
                    <span className="text-xs">{preset.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div>
              <h4 className="font-medium mb-3">Custom Colors</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(theme.colors).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <label className="w-20 text-sm font-medium capitalize">
                      {key}
                    </label>
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-8 h-8 rounded border border-white/20 cursor-pointer"
                      />
                      <Input
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="flex-1 bg-white/10 border-white/20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Font Families</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Body Font</label>
                  <select
                    value={theme.typography.fontFamily}
                    onChange={(e) => handleFontChange('fontFamily', e.target.value)}
                    className="w-full p-2 rounded bg-white/10 border border-white/20"
                  >
                    {fontPresets.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Heading Font</label>
                  <select
                    value={theme.typography.headingFont}
                    onChange={(e) => handleFontChange('headingFont', e.target.value)}
                    className="w-full p-2 rounded bg-white/10 border border-white/20"
                  >
                    {fontPresets.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Font Sizes</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(theme.typography.fontSize).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-sm font-medium mb-1 block capitalize">
                      {key}
                    </label>
                    <Input
                      value={value}
                      onChange={(e) => {
                        const newTheme = {
                          ...theme,
                          typography: {
                            ...theme.typography,
                            fontSize: {
                              ...theme.typography.fontSize,
                              [key]: e.target.value
                            }
                          }
                        };
                        setTheme(newTheme);
                        onThemeChange(newTheme);
                      }}
                      className="bg-white/10 border-white/20"
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spacing" className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Spacing Scale</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(theme.spacing).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-sm font-medium mb-1 block capitalize">
                      {key}
                    </label>
                    <Input
                      value={value}
                      onChange={(e) => {
                        const newTheme = {
                          ...theme,
                          spacing: {
                            ...theme.spacing,
                            [key]: e.target.value
                          }
                        };
                        setTheme(newTheme);
                        onThemeChange(newTheme);
                      }}
                      className="bg-white/10 border-white/20"
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Export Theme</h4>
              <div className="bg-white/5 p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto text-white/80">
                  {generateThemeCode()}
                </pre>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(generateThemeCode());
                  }}
                  className="bg-white/10 hover:bg-white/20"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
                <Button
                  onClick={() => {
                    const blob = new Blob([generateThemeCode()], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `theme.${styleMode === 'tailwind' ? 'js' : 'css'}`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="bg-white/10 hover:bg-white/20"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
