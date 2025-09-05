"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Palette, 
  Download, 
  Star, 
  Trophy, 
  Zap,
  Play,
  Target,
  Layout,
  ArrowRightLeft,
  Home,
  BookOpen,
  Award,
  ToggleLeft
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import DragDropBuilder from "@/components/portfolio/DragDropBuilder";
import AdvancedComponents from "@/components/portfolio/AdvancedComponents";
import ThemeCustomizer from "@/components/portfolio/ThemeCustomizer";
import PreviewPanel from "@/components/portfolio/PreviewPanel";
import ExportSystem from "@/components/portfolio/ExportSystem";
import ChallengeSystem from "@/components/portfolio/ChallengeSystem";

// Import playground components
import CSSPlayground from "@/components/playground/CSSPlayground";
import ComponentArena from "@/components/playground/ComponentArena";
import CSSBattle from "@/components/playground/CSSBattle";
import ResponsiveTrainer from "@/components/playground/ResponsiveTrainer";
import StyleTranslator from "@/components/playground/StyleTranslator";
import UtilityVsCustom from "@/components/playground/UtilityVsCustom";

export default function PortfolioBuilder() {
  const [activeTab, setActiveTab] = useState('home');
  const [styleMode, setStyleMode] = useState<'tailwind' | 'css'>('tailwind');
  const [userTier, setUserTier] = useState<'free' | 'pro'>('free');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    name: '',
    title: '',
    bio: '',
    skills: [],
    projects: []
  });
  const [components, setComponents] = useState<any[]>([]);
  const [theme, setTheme] = useState<any>(null);

  const handleAddComponent = (component: any) => {
    setComponents(prev => [...prev, component]);
  };

  const handleUpgrade = () => {
    setUserTier('pro');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage userTier={userTier} onUpgrade={handleUpgrade} />;
      case 'builder':
        return (
          <div className="space-y-6">
            <DragDropBuilder 
              styleMode={styleMode} 
              onComponentsChange={setComponents}
            />
            <AdvancedComponents 
              onAddComponent={handleAddComponent}
              styleMode={styleMode}
            />
          </div>
        );
      case 'css-playground':
        return <CSSPlayground />;
      case 'component-arena':
        return <ComponentArena />;
      case 'css-battle':
        return <CSSBattle />;
      case 'responsive-trainer':
        return <ResponsiveTrainer />;
      case 'style-translator':
        return <StyleTranslator />;
      case 'utility-vs-custom':
        return <UtilityVsCustom />;
      case 'theme':
        return <ThemeCustomizer onThemeChange={setTheme} styleMode={styleMode} />;
      case 'preview':
        return <PreviewPanel components={components} styleMode={styleMode} theme={theme} />;
      case 'export':
        return <ExportSystem portfolioData={portfolioData} components={components} styleMode={styleMode} />;
      case 'challenges':
        return <ChallengeSystem userTier={userTier} />;
      default:
        return <HomePage userTier={userTier} onUpgrade={handleUpgrade} />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userTier={userTier}
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userTier={userTier}
          onUpgrade={handleUpgrade}
        />

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

function HomePage({ userTier, onUpgrade }: { userTier: 'free' | 'pro', onUpgrade: () => void }) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="glass-effect border-white/20">
        <CardHeader className="text-center py-12">
          <CardTitle className="text-5xl font-bold mb-4">
            Master CSS & Tailwind
            <Badge variant="secondary" className="ml-4">
              {userTier === 'pro' ? 'Pro' : 'Free'}
            </Badge>
          </CardTitle>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            The ultimate platform for learning CSS and Tailwind CSS through interactive challenges, 
            playgrounds, and real-world projects.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Learning
            </Button>
            {userTier === 'free' && (
              <Button 
                size="lg"
                variant="outline"
                onClick={onUpgrade}
                className="bg-white/10 border-white/20 hover:bg-white/20"
              >
                <Star className="h-5 w-5 mr-2" />
                Upgrade to Pro
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Code className="h-8 w-8" />}
          title="CSS vs Tailwind Playground"
          description="Compare CSS and Tailwind implementations side by side with live preview"
          color="from-blue-500 to-cyan-500"
        />
        <FeatureCard
          icon={<Trophy className="h-8 w-8" />}
          title="Component Challenge Arena"
          description="Daily UI challenges with Monaco Editor and real-time code execution"
          color="from-purple-500 to-pink-500"
        />
        <FeatureCard
          icon={<Target className="h-8 w-8" />}
          title="CSS Battle Clone"
          description="Replicate designs with the shortest code - compete on the leaderboard"
          color="from-red-500 to-orange-500"
        />
        <FeatureCard
          icon={<Layout className="h-8 w-8" />}
          title="Responsive Design Trainer"
          description="Master responsive layouts with breakpoint testing and validation"
          color="from-green-500 to-teal-500"
        />
        <FeatureCard
          icon={<ArrowRightLeft className="h-8 w-8" />}
          title="Style Translator"
          description="Convert between CSS and Tailwind classes with instant translation"
          color="from-yellow-500 to-orange-500"
        />
        <FeatureCard
          icon={<ToggleLeft className="h-8 w-8" />}
          title="Utility vs Custom"
          description="Compare utility-first and custom CSS approaches with real examples"
          color="from-indigo-500 to-purple-500"
        />
      </div>

      {/* Learning Path */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">CSS Basics</h3>
              <p className="text-sm opacity-70">Learn fundamental CSS properties and selectors</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Layout Systems</h3>
              <p className="text-sm opacity-70">Master Flexbox and CSS Grid layouts</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Tailwind Utilities</h3>
              <p className="text-sm opacity-70">Explore Tailwind's utility-first approach</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Advanced Projects</h3>
              <p className="text-sm opacity-70">Build real-world applications and portfolios</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Active Users" value="10,000+" icon={<Zap className="h-6 w-6" />} />
        <StatCard title="Challenges Completed" value="50,000+" icon={<Trophy className="h-6 w-6" />} />
        <StatCard title="Projects Built" value="5,000+" icon={<Code className="h-6 w-6" />} />
        <StatCard title="Certificates Earned" value="2,000+" icon={<Award className="h-6 w-6" />} />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <Card className="glass-effect border-white/20 hover:bg-white/5 transition-colors">
      <CardContent className="p-6">
        <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="opacity-80">{description}</p>
      </CardContent>
    </Card>
  );
}

function StatCard({ title, value, icon }: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="glass-effect border-white/20">
      <CardContent className="p-6 text-center">
        <div className="text-white/60 mb-2">{icon}</div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm opacity-70">{title}</div>
      </CardContent>
    </Card>
  );
}
