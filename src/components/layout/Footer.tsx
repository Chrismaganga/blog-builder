"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart,
  Code,
  Star,
  ExternalLink
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="glass-effect border-t border-white/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Code className="h-8 w-8 text-white mr-2" />
              <span className="text-xl font-bold text-white">Portfolio Builder</span>
            </div>
            <p className="text-white/70 mb-4 max-w-md">
              Build stunning portfolios with dual-mode styling options. 
              Create, customize, and export your professional portfolio in minutes.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Drag & Drop Builder
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Dual Styling Modes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Export Options
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Responsive Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Daily Challenges
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
              <p className="text-white/70 text-sm">
                Get the latest updates and new features delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-r-none"
              />
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center text-white/70 text-sm mb-4 md:mb-0">
            <span>© 2024 Portfolio Builder. Made with</span>
            <Heart className="h-4 w-4 text-red-400 mx-1" />
            <span>for developers</span>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* GitHub Star */}
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            <Star className="h-4 w-4 mr-2" />
            Star us on GitHub
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
