import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FolderOpen, Plus, Eye, Edit, Trash2, LayoutGrid, Table, Calendar } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { AdvancedDataTable, ColumnDef } from '@/components/table/AdvancedDataTable';
import ProjectsSkeleton from '@/components/skeletons/ProjectsSkeleton';
import KanbanBoard from '@/components/projects/KanbanBoard';
import ProjectCalendar from '@/components/projects/ProjectCalendar';

// Define the Project type locally
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

const Projects = () => {
  const { projects, isLoading, createProject, updateProject, deleteProject } = useProjects();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeView, setActiveView] = useState<'table' | 'kanban' | 'calendar'>('table');

  const [form, setForm] = useState({
    name: '',
    description: '',
    progress: '0',
    status: 'planning',
    start_date: '',
    end_date: '',
    budget: '',
  });

  const handleCreate = () => {
    createProject({
      ...form,
      progress: parseInt(form.progress) || 0,
      budget: form.budget ? parseFloat(form.budget) : undefined,
    });
    setIsCreateOpen(false);
    setForm({ name: '', description: '', progress: '0', status: 'planning', start_date: '', end_date: '', budget: '' });
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setForm({
      name: project.name || '',
      description: project.description || '',
      progress: project.progress?.toString() || '0',
      status: project.status || 'planning',
      start_date: project.start_date || '',
      end_date: project.end_date || '',
      budget: project.budget?.toString() || '',
    });
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedProject) return;
    updateProject({
      id: selectedProject.id,
      ...form,
      progress: parseInt(form.progress) || 0,
      budget: form.budget ? parseFloat(form.budget) : undefined,
    });
    setIsEditOpen(false);
    setSelectedProject(null);
    setForm({ name: '', description: '', progress: '0', status: 'planning', start_date: '', end_date: '', budget: '' });
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
  };

  const handleView = (project: Project) => {
    setSelectedProject(project);
    setIsViewOpen(true);
  };

  const handleCloseView = () => {
    setIsViewOpen(false);
    setSelectedProject(null);
  };

  const handleStatusChange = (projectId: string, newStatus: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      updateProject({
        id: projectId,
        name: project.name,
        description: project.description,
        progress: project.progress || 0,
        status: newStatus,
        start_date: project.start_date,
        end_date: project.end_date,
        budget: project.budget,
      });
    }
  };

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

  // Column definitions for AdvancedDataTable
  const projectColumns: ColumnDef<Project>[] = [
    {
      id: 'name',
      header: 'Project',
      accessorKey: 'name',
      sortable: true,
      filterable: true,
      cell: (project) => <span className="font-medium">{project.name}</span>
    },
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
      sortable: true,
      filterable: true,
      cell: (project) => project.description || 'No description'
    },
    {
      id: 'progress',
      header: 'Progress',
      accessorKey: 'progress',
      sortable: true,
      cell: (project) => (
        <div className="space-y-1">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${project.progress || 0}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">{project.progress || 0}%</span>
        </div>
      )
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['planning', 'active', 'completed', 'on-hold'],
      cell: (project) => (
        <Badge className={getStatusColor(project.status)}>
          {project.status}
        </Badge>
      )
    },
    {
      id: 'end_date',
      header: 'End Date',
      accessorKey: 'end_date',
      sortable: true,
      filterable: true,
      filterType: 'date',
      cell: (project) => project.end_date || 'Not set'
    },
    {
      id: 'budget',
      header: 'Budget',
      accessorKey: 'budget',
      sortable: true,
      cell: (project) => (
        <span className="font-semibold">
          ${project.budget ? Number(project.budget).toLocaleString() : '0'}
        </span>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (project) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="ghost" onClick={() => handleView(project)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleEdit(project)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-red-600" onClick={() => handleDelete(project.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your projects and tasks</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <Button
              variant={activeView === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('table')}
            >
              <Table className="mr-2 h-4 w-4" />
              Table
            </Button>
            <Button
              variant={activeView === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('kanban')}
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              Kanban
            </Button>
            <Button
              variant={activeView === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('calendar')}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Project</DialogTitle>
                <DialogDescription>Add a new project to the system</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={form.progress}
                    onChange={(e) => setForm({ ...form, progress: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    type="number"
                    step="0.01"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreate}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Active Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{projects.filter(p => p.status === 'active').length}</div>
            <p className="text-xs text-blue-600">In progress</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Completed Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{projects.filter(p => p.status === 'completed').length}</div>
            <p className="text-xs text-green-600">Successfully finished</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">On-Hold Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{projects.filter(p => p.status === 'on-hold').length}</div>
            <p className="text-xs text-yellow-600">Temporarily paused</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Planning Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{projects.filter(p => p.status === 'planning').length}</div>
            <p className="text-xs text-purple-600">In planning phase</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-0">
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'table' | 'kanban' | 'calendar')}>
          <TabsContent value="table">
            <AdvancedDataTable
              data={projects}
              columns={projectColumns}
              title="Projects"
              description="Manage your active and completed projects"
              searchPlaceholder="Search projects by name, description, or status..."
              defaultPageSize={10}
            />
          </TabsContent>
          
          <TabsContent value="kanban" className="p-6">
            <KanbanBoard
              projects={projects}
              onViewProject={handleView}
              onEditProject={handleEdit}
              onDeleteProject={handleDelete}
              onStatusChange={handleStatusChange}
            />
          </TabsContent>

          <TabsContent value="calendar" className="p-6">
            <ProjectCalendar
              projects={projects}
              onViewProject={handleView}
              onEditProject={handleEdit}
              onDeleteProject={handleDelete}
            />
          </TabsContent>
        </Tabs>
      </Card>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProject?.name}</DialogTitle>
            <DialogDescription>Project details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Description</Label>
              <Input value={selectedProject?.description || 'No description'} readOnly />
            </div>
            <div>
              <Label>Progress</Label>
              <Input value={`${selectedProject?.progress || 0}%`} readOnly />
            </div>
            <div>
              <Label>Status</Label>
              <Input value={selectedProject?.status || ''} readOnly />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input value={selectedProject?.start_date || 'Not set'} readOnly />
            </div>
            <div>
              <Label>End Date</Label>
              <Input value={selectedProject?.end_date || 'Not set'} readOnly />
            </div>
            <div>
              <Label>Budget</Label>
              <Input value={`$${selectedProject?.budget ? parseFloat(selectedProject.budget.toString()).toLocaleString() : '0'}`} readOnly />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCloseView}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update project details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-name">Project Name</Label>
              <Input
                id="edit-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-progress">Progress (%)</Label>
              <Input
                id="edit-progress"
                type="number"
                min="0"
                max="100"
                value={form.progress}
                onChange={(e) => setForm({ ...form, progress: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-start_date">Start Date</Label>
              <Input
                id="edit-start_date"
                type="date"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-end_date">End Date</Label>
              <Input
                id="edit-end_date"
                type="date"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-budget">Budget</Label>
              <Input
                id="edit-budget"
                type="number"
                step="0.01"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Update Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
