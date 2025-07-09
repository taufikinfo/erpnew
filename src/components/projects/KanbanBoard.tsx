
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  budget: number | null;
  progress: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface KanbanBoardProps {
  projects: Project[];
  onViewProject: (project: Project) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onStatusChange: (projectId: string, newStatus: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  projects,
  onViewProject,
  onEditProject,
  onDeleteProject,
  onStatusChange,
}) => {
  const columns = [
    { id: 'planning', title: 'Planning', color: 'bg-purple-50 border-purple-200' },
    { id: 'active', title: 'Active', color: 'bg-blue-50 border-blue-200' },
    { id: 'completed', title: 'Completed', color: 'bg-green-50 border-green-200' },
    { id: 'on-hold', title: 'On Hold', color: 'bg-yellow-50 border-yellow-200' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'planning':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDragStart = (e: React.DragEvent, project: Project) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(project));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const projectData = e.dataTransfer.getData('text/plain');
    const project = JSON.parse(projectData);
    if (project.status !== newStatus) {
      onStatusChange(project.id, newStatus);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
      {columns.map((column) => (
        <div
          key={column.id}
          className={`${column.color} rounded-lg p-4 min-h-96`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className="mb-4">
            <h3 className="font-semibold text-lg text-gray-800">{column.title}</h3>
            <p className="text-sm text-gray-600">
              {projects.filter(p => p.status === column.id).length} projects
            </p>
          </div>
          
          <div className="space-y-3">
            {projects
              .filter(project => project.status === column.id)
              .map((project) => (
                <Card
                  key={project.id}
                  className="cursor-move hover:shadow-md transition-shadow bg-white border"
                  draggable
                  onDragStart={(e) => handleDragStart(e, project)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium line-clamp-2">
                        {project.name}
                      </CardTitle>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    {project.description && (
                      <CardDescription className="text-xs line-clamp-2">
                        {project.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{project.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${project.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {project.budget && (
                        <div className="text-xs text-gray-600">
                          Budget: ${Number(project.budget).toLocaleString()}
                        </div>
                      )}
                      
                      {project.end_date && (
                        <div className="text-xs text-gray-600">
                          Due: {new Date(project.end_date).toLocaleDateString()}
                        </div>
                      )}
                      
                      <div className="flex space-x-1 pt-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0"
                          onClick={() => onViewProject(project)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0"
                          onClick={() => onEditProject(project)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0 text-red-600"
                          onClick={() => onDeleteProject(project.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
