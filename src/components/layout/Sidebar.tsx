"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Trophy, 
  Download, 
  Settings,
  Play,
  Target,
  Layout,
  Palette,
  ArrowRightLeft,
  Menu,
  X,
  Home,
  Star,
  Zap,
  BookOpen,
  Award,
  ToggleLeft
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userTier: 'free' | 'pro';
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ activeTab, onTabChange, userTier, isCollapsed, onToggle }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['playground', 'challenges']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      section: 'main'
    },
    {
      id: 'builder',
      label: 'Portfolio Builder',
      icon: Code,
      section: 'main',
      badge: 'New'
    },
    {
      id: 'playground',
      label: 'Playground',
      icon: Play,
      section: 'playground',
      children: [
        { id: 'css-playground', label: 'CSS vs Tailwind', icon: Code },
        { id: 'component-arena', label: 'Component Arena', icon: Trophy },
        { id: 'css-battle', label: 'CSS Battle', icon: Target },
        { id: 'responsive-trainer', label: 'Responsive Trainer', icon: Layout },
        { id: 'style-translator', label: 'Style Translator', icon: ArrowRightLeft },
        { id: 'utility-vs-custom', label: 'Utility vs Custom', icon: ToggleLeft }
      ]
    },
    {
      id: 'challenges',
      label: 'Challenges',
      icon: Trophy,
      section: 'challenges',
      children: [
        { id: 'daily-challenges', label: 'Daily Challenges', icon: Star },
        { id: 'roadmap', label: 'Learning Roadmap', icon: BookOpen },
        { id: 'certifications', label: 'Certifications', icon: Award }
      ]
    },
    {
      id: 'theme',
      label: 'Theme Builder',
      icon: Palette,
      section: 'tools'
    },
    {
      id: 'export',
      label: 'Export',
      icon: Download,
      section: 'tools'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      section: 'tools'
    }
  ];

  const getSectionItems = (section: string) => {
    return menuItems.filter(item => item.section === section);
  };

  const renderMenuItem = (item: any, level = 0) => {
    const IconComponent = item.icon;
    const isActive = activeTab === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.includes(item.id);

    return (
      <div key={item.id} className="space-y-1">
        <Button
          variant={isActive ? 'default' : 'ghost'}
          onClick={() => {
            if (hasChildren) {
              toggleSection(item.id);
            } else {
              onTabChange(item.id);
            }
          }}
          className={`w-full justify-start ${
            level > 0 ? 'ml-4' : ''
          } ${
            isActive 
              ? 'bg-white/20 text-white' 
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <IconComponent className="h-4 w-4 mr-2" />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {item.badge}
                </Badge>
              )}
              {hasChildren && (
                <div className={`ml-2 transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                  <ArrowRightLeft className="h-3 w-3" />
                </div>
              )}
            </>
          )}
        </Button>
        
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="space-y-1">
            {item.children.map((child: any) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white/10 backdrop-blur-sm border-r border-white/20 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center">
              <Code className="h-6 w-6 text-white mr-2" />
              <span className="text-lg font-bold text-white">CSS Master</span>
            </div>
          )}
          <Button
            onClick={onToggle}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-6">
        {/* Main Navigation */}
        <div className="space-y-2">
          <h3 className={`text-xs font-semibold text-white/60 uppercase tracking-wider ${
            isCollapsed ? 'hidden' : ''
          }`}>
            Main
          </h3>
          {getSectionItems('main').map(item => renderMenuItem(item))}
        </div>

        {/* Playground Section */}
        <div className="space-y-2">
          <h3 className={`text-xs font-semibold text-white/60 uppercase tracking-wider ${
            isCollapsed ? 'hidden' : ''
          }`}>
            Playground
          </h3>
          {getSectionItems('playground').map(item => renderMenuItem(item))}
        </div>

        {/* Challenges Section */}
        <div className="space-y-2">
          <h3 className={`text-xs font-semibold text-white/60 uppercase tracking-wider ${
            isCollapsed ? 'hidden' : ''
          }`}>
            Challenges
          </h3>
          {getSectionItems('challenges').map(item => renderMenuItem(item))}
        </div>

        {/* Tools Section */}
        <div className="space-y-2">
          <h3 className={`text-xs font-semibold text-white/60 uppercase tracking-wider ${
            isCollapsed ? 'hidden' : ''
          }`}>
            Tools
          </h3>
          {getSectionItems('tools').map(item => renderMenuItem(item))}
        </div>
      </div>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {userTier === 'pro' ? 'P' : 'F'}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <div className="text-sm font-medium text-white">
                {userTier === 'pro' ? 'Pro User' : 'Free User'}
              </div>
              <div className="text-xs text-white/60">
                {userTier === 'pro' ? 'Unlimited access' : 'Limited features'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
