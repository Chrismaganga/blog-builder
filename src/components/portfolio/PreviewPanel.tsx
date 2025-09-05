"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Maximize,
  RotateCcw,
  Download,
  Share
} from "lucide-react";

interface PreviewPanelProps {
  components: any[];
  styleMode: 'tailwind' | 'css';
  theme?: any;
}

export default function PreviewPanel({ components, styleMode, theme }: PreviewPanelProps) {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const previewSizes = {
    desktop: 'w-full',
    tablet: 'max-w-2xl mx-auto',
    mobile: 'max-w-sm mx-auto'
  };

  const renderComponent = (component: any) => {
    const styles = styleMode === 'tailwind' 
      ? { className: component.styles.tailwind } 
      : { style: parseCSSString(component.styles.css || '') };

    switch (component.type) {
      case 'header':
        return (
          <div {...styles} className="text-center py-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: theme?.colors?.text || '#000' }}>
              {component.content.title || 'Your Name'}
            </h1>
            <p className="text-xl opacity-80" style={{ color: theme?.colors?.muted || '#666' }}>
              {component.content.subtitle || 'Your Professional Title'}
            </p>
          </div>
        );
      case 'text':
        return (
          <div {...styles}>
            <p style={{ color: theme?.colors?.text || '#000' }}>
              {component.content.text || 'Add your text content here...'}
            </p>
          </div>
        );
      case 'project':
        return (
          <div {...styles} className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-2" style={{ color: theme?.colors?.text || '#000' }}>
              {component.content.title || 'Project Title'}
            </h3>
            <p className="text-gray-600 mb-4" style={{ color: theme?.colors?.muted || '#666' }}>
              {component.content.description || 'Project description...'}
            </p>
            <div className="flex gap-2">
              {(component.content.technologies || ['React', 'TypeScript']).map((tech: string) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        );
      case 'hero-section':
        return (
          <div 
            {...styles} 
            className="text-center py-20 px-4 text-white rounded-lg"
            style={{ 
              background: `linear-gradient(135deg, ${theme?.colors?.primary || '#3b82f6'}, ${theme?.colors?.secondary || '#8b5cf6'})`
            }}
          >
            <h1 className="text-5xl font-bold mb-4">
              {component.content.title || 'Welcome to My Portfolio'}
            </h1>
            <p className="text-xl mb-8 opacity-90">
              {component.content.subtitle || 'I create amazing digital experiences'}
            </p>
            <Button className="bg-white text-gray-900 hover:bg-gray-100">
              {component.content.ctaText || 'Get Started'}
            </Button>
          </div>
        );
      case 'stats-grid':
        return (
          <div {...styles} className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {(component.content.stats || [
              { label: 'Projects', value: '50+' },
              { label: 'Clients', value: '25+' },
              { label: 'Years', value: '3+' }
            ]).map((stat: any, index: number) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold" style={{ color: theme?.colors?.primary || '#3b82f6' }}>
                  {stat.value}
                </div>
                <div className="text-sm opacity-70" style={{ color: theme?.colors?.muted || '#666' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="p-4 border border-dashed border-gray-300 rounded-lg text-center text-gray-500">
            {component.type} component
          </div>
        );
    }
  };

  const parseCSSString = (cssString: string): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    cssString.split(';').forEach(rule => {
      const [property, value] = rule.split(':').map(s => s.trim());
      if (property && value) {
        const camelCaseProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        (styles as any)[camelCaseProperty] = value;
      }
    });
    return styles;
  };

  const previewContent = (
    <div className={`${previewSizes[previewMode]} transition-all duration-300`}>
      <div 
        className="min-h-screen bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ 
          backgroundColor: theme?.colors?.background || '#ffffff',
          fontFamily: theme?.typography?.fontFamily || 'Inter, sans-serif'
        }}
      >
        {components.length === 0 ? (
          <div className="flex items-center justify-center h-96 text-gray-500">
            <div className="text-center">
              <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No components added yet</p>
              <p className="text-sm opacity-70">Add components to see preview</p>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {components.map((component) => (
              <div key={component.id}>
                {renderComponent(component)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="relative w-full h-full max-w-7xl">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button
              onClick={() => setIsFullscreen(false)}
              className="bg-white/20 hover:bg-white/30"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
          {previewContent}
        </div>
      </div>
    );
  }

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Live Preview
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {styleMode === 'tailwind' ? 'Tailwind' : 'CSS'}
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsFullscreen(true)}
              className="bg-white/10 border-white/20"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Preview Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={previewMode === 'desktop' ? 'default' : 'outline'}
              onClick={() => setPreviewMode('desktop')}
              className="bg-white/10 border-white/20"
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={previewMode === 'tablet' ? 'default' : 'outline'}
              onClick={() => setPreviewMode('tablet')}
              className="bg-white/10 border-white/20"
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={previewMode === 'mobile' ? 'default' : 'outline'}
              onClick={() => setPreviewMode('mobile')}
              className="bg-white/10 border-white/20"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="bg-white/10 border-white/20">
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button size="sm" variant="outline" className="bg-white/10 border-white/20">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button size="sm" variant="outline" className="bg-white/10 border-white/20">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

        {/* Preview Container */}
        <div className="border border-white/20 rounded-lg overflow-hidden bg-gray-100 p-4">
          {previewContent}
        </div>

        {/* Preview Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-white/70">
          <div>
            {components.length} component{components.length !== 1 ? 's' : ''} • {previewMode}
          </div>
          <div className="flex items-center gap-4">
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
