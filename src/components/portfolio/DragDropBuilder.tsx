"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Move, 
  Trash2, 
  Edit, 
  Image, 
  Type, 
  Link,
  Plus
} from "lucide-react";

interface Component {
  id: string;
  type: 'header' | 'text' | 'image' | 'project' | 'skills';
  content: any;
  styles: {
    tailwind?: string;
    css?: string;
  };
}

interface DragDropBuilderProps {
  styleMode: 'tailwind' | 'css';
  onComponentsChange: (components: Component[]) => void;
}

export default function DragDropBuilder({ styleMode, onComponentsChange }: DragDropBuilderProps) {
  const [components, setComponents] = useState<Component[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [editingComponent, setEditingComponent] = useState<string | null>(null);

  const componentTemplates = [
    { type: 'header', label: 'Header Section', icon: Type },
    { type: 'text', label: 'Text Block', icon: Type },
    { type: 'image', label: 'Image', icon: Image },
    { type: 'project', label: 'Project Card', icon: Link },
    { type: 'skills', label: 'Skills Grid', icon: Plus },
  ];

  const addComponent = useCallback((type: string) => {
    const newComponent: Component = {
      id: `${type}-${Date.now()}`,
      type: type as Component['type'],
      content: getDefaultContent(type),
      styles: {
        tailwind: getDefaultTailwindStyles(type),
        css: getDefaultCSSStyles(type),
      },
    };
    const newComponents = [...components, newComponent];
    setComponents(newComponents);
    onComponentsChange(newComponents);
  }, [components, onComponentsChange]);

  const removeComponent = useCallback((id: string) => {
    const newComponents = components.filter(comp => comp.id !== id);
    setComponents(newComponents);
    onComponentsChange(newComponents);
  }, [components, onComponentsChange]);

  const updateComponent = useCallback((id: string, updates: Partial<Component>) => {
    const newComponents = components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    );
    setComponents(newComponents);
    onComponentsChange(newComponents);
  }, [components, onComponentsChange]);

  const moveComponent = useCallback((fromIndex: number, toIndex: number) => {
    const newComponents = [...components];
    const [movedComponent] = newComponents.splice(fromIndex, 1);
    newComponents.splice(toIndex, 0, movedComponent);
    setComponents(newComponents);
    onComponentsChange(newComponents);
  }, [components, onComponentsChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Component Library */}
      <div className="lg:col-span-1">
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-sm">Component Library</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {componentTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Button
                  key={template.type}
                  variant="outline"
                  className="w-full justify-start bg-white/10 border-white/20 hover:bg-white/20"
                  onClick={() => addComponent(template.type)}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {template.label}
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Canvas */}
      <div className="lg:col-span-3">
        <Card className="glass-effect border-white/20 min-h-96">
          <CardHeader>
            <CardTitle>Portfolio Canvas</CardTitle>
          </CardHeader>
          <CardContent>
            {components.length === 0 ? (
              <div className="text-center py-12 opacity-60">
                <Type className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Start building by adding components from the library</p>
              </div>
            ) : (
              <div className="space-y-4">
                {components.map((component, index) => (
                  <div
                    key={component.id}
                    className="group relative p-4 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    draggable
                    onDragStart={() => setDraggedItem(component.id)}
                    onDragEnd={() => setDraggedItem(null)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedItem) {
                        const fromIndex = components.findIndex(c => c.id === draggedItem);
                        moveComponent(fromIndex, index);
                      }
                    }}
                  >
                    {/* Component Controls */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 bg-white/10 border-white/20"
                          onClick={() => setEditingComponent(component.id)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 bg-white/10 border-white/20"
                        >
                          <Move className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 bg-red-500/20 border-red-500/30 hover:bg-red-500/30"
                          onClick={() => removeComponent(component.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Component Content */}
                    <ComponentRenderer 
                      component={component} 
                      styleMode={styleMode}
                      isEditing={editingComponent === component.id}
                      onUpdate={(updates) => updateComponent(component.id, updates)}
                      onEditComplete={() => setEditingComponent(null)}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ComponentRenderer({ 
  component, 
  styleMode, 
  isEditing, 
  onUpdate, 
  onEditComplete 
}: {
  component: Component;
  styleMode: 'tailwind' | 'css';
  isEditing: boolean;
  onUpdate: (updates: Partial<Component>) => void;
  onEditComplete: () => void;
}) {
  if (isEditing) {
    return (
      <ComponentEditor
        component={component}
        styleMode={styleMode}
        onUpdate={onUpdate}
        onComplete={onEditComplete}
      />
    );
  }

  const styles = styleMode === 'tailwind' 
    ? { className: component.styles.tailwind } 
    : { style: parseCSSString(component.styles.css || '') };

  switch (component.type) {
    case 'header':
      return (
        <div {...styles}>
          <h1 className="text-2xl font-bold mb-2">
            {component.content.title || 'Your Name'}
          </h1>
          <p className="opacity-80">
            {component.content.subtitle || 'Your Professional Title'}
          </p>
        </div>
      );
    case 'text':
      return (
        <div {...styles}>
          <p className="opacity-90">
            {component.content.text || 'Add your text content here...'}
          </p>
        </div>
      );
    case 'project':
      return (
        <div {...styles} className="border border-white/20 rounded-lg p-4 bg-white/5">
          <h3 className="font-semibold mb-2">
            {component.content.title || 'Project Title'}
          </h3>
          <p className="opacity-70 text-sm mb-3">
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
    default:
      return (
        <div className="opacity-60 italic">
          {component.type} component
        </div>
      );
  }
}

function ComponentEditor({ 
  component, 
  styleMode, 
  onUpdate, 
  onComplete 
}: {
  component: Component;
  styleMode: 'tailwind' | 'css';
  onUpdate: (updates: Partial<Component>) => void;
  onComplete: () => void;
}) {
  const [content, setContent] = useState(component.content);
  const [styles, setStyles] = useState(component.styles[styleMode] || '');

  const handleSave = () => {
    onUpdate({
      content,
      styles: {
        ...component.styles,
        [styleMode]: styles,
      },
    });
    onComplete();
  };

  return (
    <div className="space-y-4 border border-blue-500/50 rounded-lg p-4 bg-blue-500/10">
      <h4 className="font-semibold">Editing {component.type}</h4>
      
      {/* Content Fields */}
      {component.type === 'header' && (
        <>
          <Input
            placeholder="Title"
            value={content.title || ''}
            onChange={(e) => setContent({...content, title: e.target.value})}
            className="bg-white/10 border-white/20"
          />
          <Input
            placeholder="Subtitle"
            value={content.subtitle || ''}
            onChange={(e) => setContent({...content, subtitle: e.target.value})}
            className="bg-white/10 border-white/20"
          />
        </>
      )}
      
      {component.type === 'text' && (
        <Textarea
          placeholder="Text content"
          value={content.text || ''}
          onChange={(e) => setContent({...content, text: e.target.value})}
          className="bg-white/10 border-white/20"
        />
      )}

      {/* Style Editor */}
      <div>
        <label className="text-sm opacity-80">
          {styleMode === 'tailwind' ? 'Tailwind Classes' : 'CSS Styles'}
        </label>
        <Textarea
          placeholder={styleMode === 'tailwind' ? 'text-center bg-blue-500 p-4' : 'text-align: center; background: blue; padding: 1rem;'}
          value={styles}
          onChange={(e) => setStyles(e.target.value)}
          className="bg-white/10 border-white/20 font-mono text-sm"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSave} size="sm">Save</Button>
        <Button onClick={onComplete} variant="outline" size="sm">Cancel</Button>
      </div>
    </div>
  );
}

function getDefaultContent(type: string) {
  switch (type) {
    case 'header':
      return { title: 'Your Name', subtitle: 'Your Professional Title' };
    case 'text':
      return { text: 'Add your text content here...' };
    case 'project':
      return { 
        title: 'Project Title', 
        description: 'Project description...', 
        technologies: ['React', 'TypeScript'] 
      };
    default:
      return {};
  }
}

function getDefaultTailwindStyles(type: string) {
  switch (type) {
    case 'header':
      return 'text-center py-8';
    case 'text':
      return 'py-4';
    case 'project':
      return 'mb-6';
    default:
      return '';
  }
}

function getDefaultCSSStyles(type: string) {
  switch (type) {
    case 'header':
      return 'text-align: center; padding: 2rem 0;';
    case 'text':
      return 'padding: 1rem 0;';
    case 'project':
      return 'margin-bottom: 1.5rem;';
    default:
      return '';
  }
}

function parseCSSString(cssString: string): React.CSSProperties {
  const styles: React.CSSProperties = {};
  cssString.split(';').forEach(rule => {
    const [property, value] = rule.split(':').map(s => s.trim());
    if (property && value) {
      const camelCaseProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      (styles as any)[camelCaseProperty] = value;
    }
  });
  return styles;
}
