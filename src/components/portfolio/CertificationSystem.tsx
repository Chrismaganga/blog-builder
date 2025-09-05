"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Award, 
  Trophy, 
  Star, 
  CheckCircle,
  Lock,
  Download,
  Share,
  Calendar,
  Clock,
  Target,
  Zap,
  Crown,
  Medal,
  Certificate,
  BookOpen,
  Code,
  Palette
} from "lucide-react";

interface Certification {
  id: string;
  name: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon: React.ReactNode;
  requirements: {
    challenges: number;
    projects: number;
    hours: number;
    skills: string[];
  };
  rewards: {
    badge: string;
    points: number;
    features: string[];
  };
  progress: {
    challengesCompleted: number;
    projectsCompleted: number;
    hoursSpent: number;
    skillsMastered: string[];
  };
  isUnlocked: boolean;
  isCompleted: boolean;
  completedAt?: Date;
}

interface UserProgress {
  totalChallenges: number;
  totalProjects: number;
  totalHours: number;
  completedCertifications: string[];
  currentLevel: string;
  totalPoints: number;
  streak: number;
}

export default function CertificationSystem({ userTier }: { userTier: 'free' | 'pro' }) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalChallenges: 0,
    totalProjects: 0,
    totalHours: 0,
    completedCertifications: [],
    currentLevel: 'Beginner',
    totalPoints: 0,
    streak: 0
  });
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    // Initialize certifications
    const initialCertifications: Certification[] = [
      {
        id: 'css-fundamentals',
        name: 'CSS Fundamentals',
        description: 'Master the basics of CSS including selectors, properties, and layout',
        level: 'beginner',
        icon: <Code className="h-6 w-6" />,
        requirements: {
          challenges: 10,
          projects: 2,
          hours: 5,
          skills: ['Selectors', 'Properties', 'Box Model', 'Typography']
        },
        rewards: {
          badge: 'CSS Master',
          points: 100,
          features: ['Basic CSS Editor', 'Color Picker', 'Font Tools']
        },
        progress: {
          challengesCompleted: 0,
          projectsCompleted: 0,
          hoursSpent: 0,
          skillsMastered: []
        },
        isUnlocked: true,
        isCompleted: false
      },
      {
        id: 'tailwind-basics',
        name: 'Tailwind CSS Basics',
        description: 'Learn utility-first CSS with Tailwind framework',
        level: 'beginner',
        icon: <Zap className="h-6 w-6" />,
        requirements: {
          challenges: 15,
          projects: 3,
          hours: 8,
          skills: ['Utility Classes', 'Responsive Design', 'Components', 'Customization']
        },
        rewards: {
          badge: 'Tailwind Ninja',
          points: 150,
          features: ['Tailwind IntelliSense', 'Component Library', 'Theme Builder']
        },
        progress: {
          challengesCompleted: 0,
          projectsCompleted: 0,
          hoursSpent: 0,
          skillsMastered: []
        },
        isUnlocked: false,
        isCompleted: false
      },
      {
        id: 'responsive-design',
        name: 'Responsive Design Expert',
        description: 'Master responsive layouts and mobile-first design',
        level: 'intermediate',
        icon: <Target className="h-6 w-6" />,
        requirements: {
          challenges: 20,
          projects: 5,
          hours: 15,
          skills: ['Flexbox', 'CSS Grid', 'Media Queries', 'Mobile Design']
        },
        rewards: {
          badge: 'Responsive Pro',
          points: 300,
          features: ['Breakpoint Tools', 'Device Preview', 'Layout Generator']
        },
        progress: {
          challengesCompleted: 0,
          projectsCompleted: 0,
          hoursSpent: 0,
          skillsMastered: []
        },
        isUnlocked: false,
        isCompleted: false
      },
      {
        id: 'advanced-animations',
        name: 'Advanced Animations',
        description: 'Create stunning animations and micro-interactions',
        level: 'advanced',
        icon: <Palette className="h-6 w-6" />,
        requirements: {
          challenges: 25,
          projects: 8,
          hours: 25,
          skills: ['Keyframes', 'Transitions', 'Transforms', 'Performance']
        },
        rewards: {
          badge: 'Animation Wizard',
          points: 500,
          features: ['Animation Studio', 'Performance Tools', 'Code Generator']
        },
        progress: {
          challengesCompleted: 0,
          projectsCompleted: 0,
          hoursSpent: 0,
          skillsMastered: []
        },
        isUnlocked: false,
        isCompleted: false
      },
      {
        id: 'css-architect',
        name: 'CSS Architecture Master',
        description: 'Design scalable CSS architectures and design systems',
        level: 'expert',
        icon: <Crown className="h-6 w-6" />,
        requirements: {
          challenges: 40,
          projects: 15,
          hours: 50,
          skills: ['BEM', 'CSS Modules', 'Design Systems', 'Performance']
        },
        rewards: {
          badge: 'CSS Architect',
          points: 1000,
          features: ['Design System Builder', 'Code Review Tools', 'Mentorship Access']
        },
        progress: {
          challengesCompleted: 0,
          projectsCompleted: 0,
          hoursSpent: 0,
          skillsMastered: []
        },
        isUnlocked: false,
        isCompleted: false
      }
    ];

    setCertifications(initialCertifications);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-blue-500';
      case 'advanced': return 'bg-purple-500';
      case 'expert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner': return <BookOpen className="h-4 w-4" />;
      case 'intermediate': return <Medal className="h-4 w-4" />;
      case 'advanced': return <Trophy className="h-4 w-4" />;
      case 'expert': return <Crown className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  const calculateProgress = (cert: Certification) => {
    const totalRequirements = cert.requirements.challenges + cert.requirements.projects + cert.requirements.hours;
    const completed = cert.progress.challengesCompleted + cert.progress.projectsCompleted + (cert.progress.hoursSpent / 10);
    return Math.min((completed / totalRequirements) * 100, 100);
  };

  const checkCompletion = (cert: Certification) => {
    return (
      cert.progress.challengesCompleted >= cert.requirements.challenges &&
      cert.progress.projectsCompleted >= cert.requirements.projects &&
      cert.progress.hoursSpent >= cert.requirements.hours &&
      cert.requirements.skills.every(skill => cert.progress.skillsMastered.includes(skill))
    );
  };

  const completeCertification = (certId: string) => {
    setCertifications(prev => prev.map(cert => {
      if (cert.id === certId) {
        const isCompleted = checkCompletion(cert);
        return {
          ...cert,
          isCompleted,
          completedAt: isCompleted ? new Date() : cert.completedAt
        };
      }
      return cert;
    }));

    // Update user progress
    setUserProgress(prev => ({
      ...prev,
      completedCertifications: [...prev.completedCertifications, certId],
      totalPoints: prev.totalPoints + certifications.find(c => c.id === certId)?.rewards.points || 0
    }));
  };

  const generateCertificate = (cert: Certification) => {
    // In a real app, this would generate a PDF certificate
    const certificateData = {
      name: cert.name,
      level: cert.level,
      completedAt: cert.completedAt,
      badge: cert.rewards.badge,
      points: cert.rewards.points
    };
    
    console.log('Generating certificate:', certificateData);
    alert(`🎉 Certificate generated for ${cert.name}! Check your downloads.`);
  };

  const shareAchievement = (cert: Certification) => {
    const shareText = `I just earned the ${cert.name} certification! 🏆 #CSSMaster #WebDev`;
    if (navigator.share) {
      navigator.share({
        title: 'CSS Master Certification',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Achievement copied to clipboard! Share it on social media!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6" />
            Certification System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{userProgress.totalPoints}</div>
              <div className="text-sm opacity-60">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{userProgress.completedCertifications.length}</div>
              <div className="text-sm opacity-60">Certificates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{userProgress.streak}</div>
              <div className="text-sm opacity-60">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{userProgress.currentLevel}</div>
              <div className="text-sm opacity-60">Current Level</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => {
          const progress = calculateProgress(cert);
          const isCompleted = checkCompletion(cert);
          
          return (
            <Card 
              key={cert.id} 
              className={`glass-effect border-white/20 hover:bg-white/5 transition-colors ${
                cert.isCompleted ? 'ring-2 ring-yellow-400' : ''
              } ${!cert.isUnlocked ? 'opacity-50' : ''}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 ${getLevelColor(cert.level)} rounded-lg flex items-center justify-center text-white`}>
                      {cert.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{cert.name}</CardTitle>
                      <Badge className={`${getLevelColor(cert.level)} text-white text-xs`}>
                        {cert.level.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  {cert.isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  ) : !cert.isUnlocked ? (
                    <Lock className="h-6 w-6 text-gray-400" />
                  ) : null}
                </div>
                <p className="opacity-80 text-sm">{cert.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Requirements:</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {cert.progress.challengesCompleted}/{cert.requirements.challenges} Challenges
                      </div>
                      <div className="flex items-center gap-1">
                        <Code className="h-3 w-3" />
                        {cert.progress.projectsCompleted}/{cert.requirements.projects} Projects
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {cert.progress.hoursSpent}/{cert.requirements.hours}h
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {cert.progress.skillsMastered.length}/{cert.requirements.skills.length} Skills
                      </div>
                    </div>
                  </div>

                  {/* Rewards */}
                  <div className="bg-white/5 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Rewards:</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1">
                        <Trophy className="h-3 w-3 text-yellow-400" />
                        {cert.rewards.badge} Badge
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400" />
                        {cert.rewards.points} Points
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedCert(cert)}
                      size="sm"
                      className="flex-1 bg-white/10 hover:bg-white/20"
                    >
                      View Details
                    </Button>
                    {cert.isCompleted && (
                      <Button
                        onClick={() => generateCertificate(cert)}
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-600"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Certificate Detail Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="glass-effect border-white/20 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {selectedCert.icon}
                  {selectedCert.name}
                </CardTitle>
                <Button
                  onClick={() => setSelectedCert(null)}
                  variant="ghost"
                  size="sm"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Description */}
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm opacity-80">{selectedCert.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="font-medium mb-3">Requirements</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Challenges</span>
                      <span className="text-sm font-medium">
                        {selectedCert.progress.challengesCompleted}/{selectedCert.requirements.challenges}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Projects</span>
                      <span className="text-sm font-medium">
                        {selectedCert.progress.projectsCompleted}/{selectedCert.requirements.projects}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Hours</span>
                      <span className="text-sm font-medium">
                        {selectedCert.progress.hoursSpent}/{selectedCert.requirements.hours}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Skills Required:</h5>
                    <div className="space-y-1">
                      {selectedCert.requirements.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          {selectedCert.progress.skillsMastered.includes(skill) ? (
                            <CheckCircle className="h-3 w-3 text-green-400" />
                          ) : (
                            <div className="w-3 h-3 border border-gray-400 rounded-full" />
                          )}
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rewards */}
              <div>
                <h4 className="font-medium mb-3">Rewards</h4>
                <div className="bg-white/5 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-400" />
                    <span className="font-medium">{selectedCert.rewards.badge} Badge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{selectedCert.rewards.points} Points</span>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-1">Unlocked Features:</h5>
                    <ul className="text-sm space-y-1">
                      {selectedCert.rewards.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedCert.isCompleted ? (
                  <>
                    <Button
                      onClick={() => generateCertificate(selectedCert)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Certificate
                    </Button>
                    <Button
                      onClick={() => shareAchievement(selectedCert)}
                      variant="outline"
                      className="flex-1 bg-white/10 border-white/20"
                    >
                      <Share className="h-4 w-4 mr-2" />
                      Share Achievement
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => completeCertification(selectedCert.id)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={!checkCompletion(selectedCert)}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Complete Certification
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
