"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Image, 
  Video, 
  Music, 
  FileText, 
  Code2, 
  Palette,
  Layout,
  Grid,
  List,
  Plus,
  Settings,
  Eye,
  Download
} from "lucide-react";

interface AdvancedComponentsProps {
  onAddComponent: (component: any) => void;
  styleMode: 'tailwind' | 'css';
}

export default function AdvancedComponents({ onAddComponent, styleMode }: AdvancedComponentsProps) {
  const [selectedCategory, setSelectedCategory] = useState('media');

  const componentCategories = {
    media: {
      name: 'Media & Content',
      icon: Image,
      components: [
        {
          type: 'hero-section',
          name: 'Hero Section',
          description: 'Eye-catching hero with background image',
          icon: Layout,
          preview: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-20'
        },
        {
          type: 'image-gallery',
          name: 'Image Gallery',
          description: 'Responsive image grid with lightbox',
          icon: Grid,
          preview: 'grid grid-cols-3 gap-4'
        },
        {
          type: 'video-player',
          name: 'Video Player',
          description: 'Custom video player with controls',
          icon: Video,
          preview: 'bg-black rounded-lg overflow-hidden'
        },
        {
          type: 'audio-player',
          name: 'Audio Player',
          description: 'Music/audio player component',
          icon: Music,
          preview: 'bg-gray-800 text-white p-4 rounded-lg'
        }
      ]
    },
    layout: {
      name: 'Layout & Structure',
      icon: Layout,
      components: [
        {
          type: 'two-column',
          name: 'Two Column Layout',
          description: 'Side-by-side content sections',
          icon: Grid,
          preview: 'grid grid-cols-1 md:grid-cols-2 gap-8'
        },
        {
          type: 'three-column',
          name: 'Three Column Layout',
          description: 'Three equal width columns',
          icon: Grid,
          preview: 'grid grid-cols-1 md:grid-cols-3 gap-6'
        },
        {
          type: 'sidebar-layout',
          name: 'Sidebar Layout',
          description: 'Main content with sidebar',
          icon: Layout,
          preview: 'flex flex-col md:flex-row gap-8'
        },
        {
          type: 'masonry-grid',
          name: 'Masonry Grid',
          description: 'Pinterest-style grid layout',
          icon: Grid,
          preview: 'columns-1 md:columns-2 lg:columns-3 gap-4'
        }
      ]
    },
    interactive: {
      name: 'Interactive Elements',
      icon: Code2,
      components: [
        {
          type: 'contact-form',
          name: 'Contact Form',
          description: 'Functional contact form with validation',
          icon: FileText,
          preview: 'bg-white p-6 rounded-lg shadow-lg'
        },
        {
          type: 'testimonial-carousel',
          name: 'Testimonial Carousel',
          description: 'Swipeable testimonial slider',
          icon: Layout,
          preview: 'bg-gray-50 p-6 rounded-lg'
        },
        {
          type: 'pricing-table',
          name: 'Pricing Table',
          description: 'Compare pricing plans',
          icon: Grid,
          preview: 'grid grid-cols-1 md:grid-cols-3 gap-6'
        },
        {
          type: 'timeline',
          name: 'Timeline',
          description: 'Vertical timeline component',
          icon: List,
          preview: 'relative pl-8 border-l-2 border-gray-300'
        }
      ]
    },
    data: {
      name: 'Data & Charts',
      icon: FileText,
      components: [
        {
          type: 'stats-grid',
          name: 'Stats Grid',
          description: 'Key metrics and statistics',
          icon: Grid,
          preview: 'grid grid-cols-2 md:grid-cols-4 gap-4'
        },
        {
          type: 'skill-bars',
          name: 'Skill Bars',
          description: 'Animated progress bars for skills',
          icon: Layout,
          preview: 'space-y-4'
        },
        {
          type: 'experience-timeline',
          name: 'Experience Timeline',
          description: 'Work experience with dates',
          icon: List,
          preview: 'space-y-6'
        },
        {
          type: 'certifications',
          name: 'Certifications',
          description: 'Display certificates and badges',
          icon: FileText,
          preview: 'grid grid-cols-1 md:grid-cols-2 gap-4'
        }
      ]
    }
  };

  const handleAddComponent = (component: any) => {
    const newComponent = {
      id: `${component.type}-${Date.now()}`,
      type: component.type,
      name: component.name,
      content: getDefaultContent(component.type),
      styles: {
        tailwind: getDefaultTailwindStyles(component.type),
        css: getDefaultCSSStyles(component.type),
      },
    };
    onAddComponent(newComponent);
  };

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Advanced Components
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 glass-effect border-white/20">
            {Object.entries(componentCategories).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger key={key} value={key} className="font-medium">
                  <IconComponent className="h-4 w-4 mr-2" />
                  {category.name}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(componentCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.components.map((component) => {
                  const IconComponent = component.icon;
                  return (
                    <Card key={component.type} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-5 w-5 opacity-80" />
                            <h4 className="font-medium">{component.name}</h4>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddComponent(component)}
                            className="bg-white/10 hover:bg-white/20"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm opacity-70 mb-3">{component.description}</p>
                        <div className="flex items-center justify-between">
                          <div className={`p-2 rounded text-xs font-mono ${component.preview}`}>
                            Preview
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Settings className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

function getDefaultContent(type: string) {
  switch (type) {
    case 'hero-section':
      return {
        title: 'Welcome to My Portfolio',
        subtitle: 'I create amazing digital experiences',
        backgroundImage: '',
        ctaText: 'Get Started',
        ctaLink: '#contact'
      };
    case 'image-gallery':
      return {
        images: [
          { src: '', alt: 'Project 1', title: 'Project 1' },
          { src: '', alt: 'Project 2', title: 'Project 2' }
        ]
      };
    case 'contact-form':
      return {
        title: 'Get In Touch',
        fields: ['name', 'email', 'message'],
        submitText: 'Send Message'
      };
    case 'stats-grid':
      return {
        stats: [
          { label: 'Projects', value: '50+' },
          { label: 'Clients', value: '25+' },
          { label: 'Years', value: '3+' }
        ]
      };
    default:
      return {};
  }
}

function getDefaultTailwindStyles(type: string) {
  switch (type) {
    case 'hero-section':
      return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-20 px-4';
    case 'image-gallery':
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
    case 'contact-form':
      return 'bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto';
    case 'stats-grid':
      return 'grid grid-cols-2 md:grid-cols-4 gap-4 text-center';
    default:
      return '';
  }
}

function getDefaultCSSStyles(type: string) {
  switch (type) {
    case 'hero-section':
      return 'background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; text-align: center; padding: 5rem 1rem;';
    case 'image-gallery':
      return 'display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;';
    case 'contact-form':
      return 'background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 28rem; margin: 0 auto;';
    case 'stats-grid':
      return 'display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; text-align: center;';
    default:
      return '';
  }
}
