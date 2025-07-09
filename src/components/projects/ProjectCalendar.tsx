
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface ProjectCalendarProps {
  projects: Project[];
  onViewProject: (project: Project) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
}

const ProjectCalendar: React.FC<ProjectCalendarProps> = ({
  projects,
  onViewProject,
  onEditProject,
  onDeleteProject,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [currentYear, setCurrentYear] = React.useState<number>(new Date().getFullYear());

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

  // Get projects for the selected date
  const getProjectsForDate = (date: Date) => {
    return projects.filter(project => {
      if (!project.start_date && !project.end_date) return false;
      
      const startDate = project.start_date ? new Date(project.start_date) : null;
      const endDate = project.end_date ? new Date(project.end_date) : null;
      const selectedDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      
      // Check if the selected date falls within the project's timeline
      if (startDate && endDate) {
        const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        return selectedDateOnly >= start && selectedDateOnly <= end;
      } else if (startDate) {
        const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        return selectedDateOnly.getTime() === start.getTime();
      } else if (endDate) {
        const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        return selectedDateOnly.getTime() === end.getTime();
      }
      
      return false;
    });
  };

  // Get dates that have projects for the current year
  const getDatesWithProjects = () => {
    const dates: Date[] = [];
    const currentYearStart = new Date(currentYear, 0, 1);
    const currentYearEnd = new Date(currentYear, 11, 31);
    
    projects.forEach(project => {
      if (project.start_date) {
        const startDate = new Date(project.start_date);
        if (startDate >= currentYearStart && startDate <= currentYearEnd) {
          dates.push(startDate);
        }
      }
      if (project.end_date) {
        const endDate = new Date(project.end_date);
        if (endDate >= currentYearStart && endDate <= currentYearEnd) {
          dates.push(endDate);
        }
      }
    });
    return dates;
  };

  // Generate months for the current year
  const getMonthsForYear = () => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      months.push(new Date(currentYear, month, 1));
    }
    return months;
  };

  const selectedDateProjects = selectedDate ? getProjectsForDate(selectedDate) : [];
  const datesWithProjects = getDatesWithProjects();
  const monthsToDisplay = getMonthsForYear();

  const handlePreviousYear = () => {
    setCurrentYear(prev => prev - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <CalendarDays className="h-5 w-5" />
                  <span>Project Calendar - {currentYear}</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handlePreviousYear}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleNextYear}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {monthsToDisplay.map((month, index) => (
                  <div key={index} className="border rounded-lg p-2">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      month={month}
                      className="w-full scale-90"
                      modifiers={{
                        hasProjects: datesWithProjects,
                      }}
                      modifiersStyles={{
                        hasProjects: {
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          fontWeight: 'bold',
                        },
                      }}
                      classNames={{
                        caption: "text-sm font-medium mb-2",
                        head_cell: "text-xs font-normal text-muted-foreground w-6 h-6",
                        cell: "h-6 w-6 text-center text-xs p-0",
                        day: "h-6 w-6 p-0 font-normal text-xs",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Days with project activities</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Projects for {selectedDate?.toLocaleDateString() || 'Selected Date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateProjects.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedDateProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        {project.description && (
                          <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                        )}
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 text-sm">
                      {project.start_date && (
                        <div>
                          <span className="font-medium">Start:</span>
                          <span className="ml-2">{new Date(project.start_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {project.end_date && (
                        <div>
                          <span className="font-medium">End:</span>
                          <span className="ml-2">{new Date(project.end_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {project.progress !== null && (
                        <div>
                          <span className="font-medium">Progress:</span>
                          <span className="ml-2">{project.progress}%</span>
                        </div>
                      )}
                      {project.budget && (
                        <div>
                          <span className="font-medium">Budget:</span>
                          <span className="ml-2">${Number(project.budget).toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="ghost" onClick={() => onViewProject(project)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => onEditProject(project)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600" onClick={() => onDeleteProject(project.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No projects scheduled for this date</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectCalendar;
