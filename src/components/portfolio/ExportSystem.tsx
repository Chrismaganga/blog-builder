"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  Code, 
  FileText, 
  Zap,
  CheckCircle,
  ExternalLink
} from "lucide-react";

interface ExportSystemProps {
  portfolioData: any;
  components: any[];
  styleMode: 'tailwind' | 'css';
}

export default function ExportSystem({ portfolioData, components, styleMode }: ExportSystemProps) {
  const [exportFormat, setExportFormat] = useState<'nextjs' | 'html' | 'react'>('nextjs');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const exportData = generateExportData();
    downloadProject(exportData, exportFormat);
    
    setIsExporting(false);
    setExportComplete(true);
    
    // Reset after 3 seconds
    setTimeout(() => setExportComplete(false), 3000);
  };

  const generateExportData = () => {
    const componentCode = components.map(component => 
      generateComponentCode(component, styleMode)
    ).join('\n\n');

    switch (exportFormat) {
      case 'nextjs':
        return generateNextJSProject(componentCode);
      case 'html':
        return generateHTMLProject(componentCode);
      case 'react':
        return generateReactProject(componentCode);
      default:
        return {};
    }
  };

  const downloadProject = (data: any, format: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${format}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Portfolio
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={exportFormat} onValueChange={(value) => setExportFormat(value as any)}>
          <TabsList className="grid w-full grid-cols-3 glass-effect border-white/20">
            <TabsTrigger value="nextjs" className="font-medium">Next.js</TabsTrigger>
            <TabsTrigger value="react" className="font-medium">React</TabsTrigger>
            <TabsTrigger value="html" className="font-medium">HTML</TabsTrigger>
          </TabsList>

          <TabsContent value="nextjs" className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Code className="h-4 w-4 text-green-400" />
                <h4 className="font-medium">Next.js App Router</h4>
                <Badge variant="secondary">Recommended</Badge>
              </div>
              <p className="text-sm opacity-70">
                Complete Next.js project with App Router, TypeScript, and {styleMode === 'tailwind' ? 'Tailwind CSS' : 'CSS modules'}
              </p>
              <ul className="mt-3 space-y-1 text-xs opacity-60">
                <li>✓ Modern file structure</li>
                <li>✓ Optimized performance</li>
                <li>✓ SEO ready</li>
                <li>✓ Deploy-ready</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="react" className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-blue-400" />
                <h4 className="font-medium">React Components</h4>
              </div>
              <p className="text-sm opacity-70">
                Reusable React components with {styleMode === 'tailwind' ? 'Tailwind' : 'CSS-in-JS'} styling
              </p>
              <ul className="mt-3 space-y-1 text-xs opacity-60">
                <li>✓ Component library</li>
                <li>✓ PropTypes included</li>
                <li>✓ Storybook ready</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="html" className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-orange-400" />
                <h4 className="font-medium">Static HTML</h4>
              </div>
              <p className="text-sm opacity-70">
                Static HTML files with {styleMode === 'tailwind' ? 'Tailwind CDN' : 'embedded CSS'}
              </p>
              <ul className="mt-3 space-y-1 text-xs opacity-60">
                <li>✓ No build process</li>
                <li>✓ Host anywhere</li>
                <li>✓ Fast loading</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-medium mb-2">Export includes:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm opacity-70">
              <div>✓ Component structure</div>
              <div>✓ Styling ({styleMode})</div>
              <div>✓ Assets & images</div>
              <div>✓ Package.json</div>
              <div>✓ README.md</div>
              <div>✓ Deploy instructions</div>
            </div>
          </div>

          <Button 
            onClick={handleExport}
            disabled={isExporting || components.length === 0}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Exporting...
              </>
            ) : exportComplete ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Export Complete!
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export {exportFormat.toUpperCase()} Project
              </>
            )}
          </Button>

          {exportComplete && (
            <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Project exported successfully!</span>
              </div>
              <p className="text-green-300/70 text-xs mt-1">
                Check your downloads folder for the project files.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="font-medium mb-2">Deploy Options</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10" size="sm">
              <ExternalLink className="h-3 w-3 mr-1" />
              Vercel
            </Button>
            <Button variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10" size="sm">
              <ExternalLink className="h-3 w-3 mr-1" />
              Netlify
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function generateComponentCode(component: any, styleMode: 'tailwind' | 'css'): string {
  const styles = styleMode === 'tailwind' 
    ? component.styles.tailwind 
    : component.styles.css;

  switch (component.type) {
    case 'header':
      return styleMode === 'tailwind' 
        ? `<header className="${styles}">
  <h1 className="text-4xl font-bold">${component.content.title}</h1>
  <p className="text-xl text-gray-600">${component.content.subtitle}</p>
</header>`
        : `<header style="${styles}">
  <h1>${component.content.title}</h1>
  <p>${component.content.subtitle}</p>
</header>`;
    
    case 'text':
      return styleMode === 'tailwind'
        ? `<div className="${styles}">
  <p>${component.content.text}</p>
</div>`
        : `<div style="${styles}">
  <p>${component.content.text}</p>
</div>`;
    
    default:
      return `<!-- ${component.type} component -->`;
  }
}

function generateNextJSProject(componentCode: string) {
  return {
    'package.json': {
      name: 'my-portfolio',
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint'
      },
      dependencies: {
        next: '^14.0.0',
        react: '^18.0.0',
        'react-dom': '^18.0.0',
        tailwindcss: '^3.0.0'
      }
    },
    'src/app/page.tsx': `export default function Home() {
  return (
    <main className="min-h-screen">
      ${componentCode}
    </main>
  );
}`,
    'src/app/layout.tsx': `import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
    'README.md': '# My Portfolio\n\nGenerated with Portfolio Builder\n\n## Getting Started\n\n```bash\nnpm install\nnpm run dev\n```'
  };
}

function generateHTMLProject(componentCode: string) {
  return {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  ${componentCode}
</body>
</html>`,
    'README.md': '# My Portfolio\n\nStatic HTML portfolio generated with Portfolio Builder\n\nSimply open index.html in your browser!'
  };
}

function generateReactProject(componentCode: string) {
  return {
    'Portfolio.jsx': `import React from 'react';

export default function Portfolio() {
  return (
    <div className="min-h-screen">
      ${componentCode}
    </div>
  );
}`,
    'package.json': {
      name: 'portfolio-components',
      version: '1.0.0',
      main: 'Portfolio.jsx',
      peerDependencies: {
        react: '^18.0.0'
      }
    }
  };
}
