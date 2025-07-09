import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Clock,
  Award,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useEmployees, useLeaveRequests } from '@/hooks/useHumanResources';
import HumanResourcesSkeleton from '@/components/skeletons/HumanResourcesSkeleton';
import { AdvancedDataTable, ColumnDef } from '@/components/table/AdvancedDataTable';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import type { Employee, EmployeeInsert } from '@/hooks/useHumanResources';

const attendanceData = [
  { name: 'Present', value: 142, color: '#10B981' },
  { name: 'Late', value: 8, color: '#F59E0B' },
  { name: 'Absent', value: 6, color: '#EF4444' },
];

const HumanResources = () => {
  const { 
    employees, 
    isLoading: employeesLoading, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee 
  } = useEmployees();
  const { leaveRequests, isLoading: leaveRequestsLoading } = useLeaveRequests();
  const isLoading = employeesLoading || leaveRequestsLoading;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'terminated': return 'bg-red-100 text-red-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate department distribution from real data
  const departmentData = employees.reduce((acc, emp) => {
    const existing = acc.find(d => d.department === emp.department);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ department: emp.department, count: 1 });
    }
    return acc;
  }, [] as Array<{ department: string; count: number }>);

  const totalSalary = employees.reduce((sum, emp) => sum + Number(emp.salary || 0), 0);
  const pendingLeaveRequests = leaveRequests.filter(lr => lr.status === 'pending');

  // CRUD state for Employees
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState<EmployeeInsert>({
    employee_id: '',
    name: '',
    email: '',
    department: '',
    position: '',
    salary: 0,
    hire_date: '',
    status: 'active',
  });
  const [editEmployee, setEditEmployee] = useState<Partial<Employee> & { id: string }>({
    id: '',
    employee_id: '',
    name: '',
    email: '',
    department: '',
    position: '',
    salary: 0,
    hire_date: '',
    status: 'active',
  });

  const handleCreate = () => {
    createEmployee(newEmployee);
    setIsCreateOpen(false);
    setNewEmployee({ employee_id: '', name: '', email: '', department: '', position: '', salary: 0, hire_date: '', status: 'active' });
  };

  const handleEdit = (emp: Employee) => {
    setEditEmployee({
      id: emp.id,
      employee_id: emp.employee_id,
      name: emp.name,
      email: emp.email,
      department: emp.department,
      position: emp.position,
      salary: Number(emp.salary),
      hire_date: emp.hire_date,
      status: emp.status as 'active' | 'inactive' | 'terminated',
    });
    setSelectedEmployee(emp);
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    updateEmployee(editEmployee);
    setIsEditOpen(false);
    setEditEmployee({ id: '', employee_id: '', name: '', email: '', department: '', position: '', salary: 0, hire_date: '', status: 'active' });
  };

  const handleDelete = (id: string) => {
    deleteEmployee(id);
  };

  if (isLoading) {
    return <HumanResourcesSkeleton />;
  }

  const employeeColumns: ColumnDef<Employee>[] = [
    {
      id: 'employee_id',
      header: 'Employee ID',
      accessorKey: 'employee_id',
      sortable: true,
      filterable: true,
    },
    {
      id: 'name',
      header: 'Name',
      cell: (row) => row.first_name && row.last_name ? `${row.first_name} ${row.last_name}` : row.name,
      sortable: true,
      filterable: true,
    },
    {
      id: 'department',
      header: 'Department',
      accessorKey: 'department',
      sortable: true,
      filterable: true,
    },
    {
      id: 'position',
      header: 'Position',
      accessorKey: 'position',
      sortable: true,
      filterable: true,
    },
    {
      id: 'salary',
      header: 'Salary',
      accessorKey: 'salary',
      cell: (row) => `$${Number(row.salary || 0).toLocaleString()}`,
      sortable: true,
      filterable: true,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => <Badge className={getStatusColor(row.status)}>{row.status}</Badge>,
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['active', 'on-leave', 'inactive', 'terminated'],
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (emp) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="ghost" onClick={() => { setSelectedEmployee(emp); setIsViewOpen(true); }}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleEdit(emp)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-red-600" onClick={() => handleDelete(emp.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const leaveRequestColumns: ColumnDef<{
    id: string;
    employee_id: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    days_requested: number;
    reason: string | null;
    status: string;
  }>[] = [
    {
      id: 'employee_name',
      header: 'Employee',
      accessorKey: 'employee_name',
      sortable: true,
      filterable: true,
    },
    {
      id: 'leave_type',
      header: 'Type',
      accessorKey: 'leave_type',
      cell: (row) => row.leave_type.charAt(0).toUpperCase() + row.leave_type.slice(1),
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['sick', 'vacation', 'personal', 'other'],
    },
    {
      id: 'days_requested',
      header: 'Days',
      accessorKey: 'days_requested',
      sortable: true,
      filterable: true,
    },
    {
      id: 'start_date',
      header: 'Start Date',
      accessorKey: 'start_date',
      cell: (row) => new Date(row.start_date).toLocaleDateString(),
      sortable: true,
      filterable: true,
      filterType: 'date',
    },
    {
      id: 'end_date',
      header: 'End Date',
      accessorKey: 'end_date',
      cell: (row) => new Date(row.end_date).toLocaleDateString(),
      sortable: true,
      filterable: true,
      filterType: 'date',
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => <Badge className={getStatusColor(row.status)}>{row.status}</Badge>,
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['pending', 'approved', 'rejected'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Human Resources</h1>
          <p className="text-gray-600 mt-1">Manage employees, payroll, and HR operations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Employee</DialogTitle>
                <DialogDescription>Add a new employee to the directory</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={newEmployee.name} onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={newEmployee.email} onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" value={newEmployee.department} onChange={e => setNewEmployee({ ...newEmployee, department: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" value={newEmployee.position} onChange={e => setNewEmployee({ ...newEmployee, position: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="salary">Salary</Label>
                  <Input id="salary" type="number" value={String(newEmployee.salary)} onChange={e => setNewEmployee({ ...newEmployee, salary: Number(e.target.value) })} />
                </div>
                <div>
                  <Label htmlFor="hire_date">Hire Date</Label>
                  <Input id="hire_date" type="date" value={newEmployee.hire_date} onChange={e => setNewEmployee({ ...newEmployee, hire_date: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newEmployee.status} onValueChange={value => setNewEmployee({ ...newEmployee, status: value as 'active' | 'inactive' | 'terminated' })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreate}>Create Employee</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* HR Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{employees.length}</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Active employees
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">94.2%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Current period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Monthly Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              ${totalSalary > 0 ? Math.round(totalSalary / 12).toLocaleString() : '0'}
            </div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Monthly salary total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Leave Requests</CardTitle>
            <Award className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{pendingLeaveRequests.length}</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              Pending approval
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Department Distribution</span>
            </CardTitle>
            <CardDescription>Employee count by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <span>Today's Attendance</span>
            </CardTitle>
            <CardDescription>Current attendance status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {attendanceData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different HR modules */}
      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="leaves">Leave Requests</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Employee Directory</span>
              </CardTitle>
              <CardDescription>Manage employee information and records</CardDescription>
            </CardHeader>
            <CardContent>
              <AdvancedDataTable
                data={employees}
                columns={employeeColumns}
                isLoading={employeesLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaves" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span>Leave Requests</span>
              </CardTitle>
              <CardDescription>Manage employee leave applications</CardDescription>
            </CardHeader>
            <CardContent>
              <AdvancedDataTable
                data={leaveRequests}
                columns={leaveRequestColumns}
                isLoading={leaveRequestsLoading}
                actions={(request) => (
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span>Attendance Overview</span>
              </CardTitle>
              <CardDescription>Track employee attendance and punctuality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">Attendance tracking feature will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Employee dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Edit the details of the selected employee</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input id="edit-name" value={editEmployee.name} onChange={e => setEditEmployee({ ...editEmployee, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input id="edit-email" value={editEmployee.email} onChange={e => setEditEmployee({ ...editEmployee, email: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="edit-department">Department</Label>
              <Input id="edit-department" value={editEmployee.department} onChange={e => setEditEmployee({ ...editEmployee, department: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="edit-position">Position</Label>
              <Input id="edit-position" value={editEmployee.position} onChange={e => setEditEmployee({ ...editEmployee, position: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="edit-salary">Salary</Label>
              <Input id="edit-salary" type="number" value={String(editEmployee.salary)} onChange={e => setEditEmployee({ ...editEmployee, salary: Number(e.target.value) })} />
            </div>
            <div>
              <Label htmlFor="edit-hire_date">Hire Date</Label>
              <Input id="edit-hire_date" type="date" value={editEmployee.hire_date} onChange={e => setEditEmployee({ ...editEmployee, hire_date: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={editEmployee.status} onValueChange={value => setEditEmployee({ ...editEmployee, status: value as 'active' | 'inactive' | 'terminated' })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate}>Update Employee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Employee dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
            <DialogDescription>View detailed information about the selected employee</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedEmployee && (
              <>
                <div className="text-lg font-semibold">{selectedEmployee.name}</div>
                <div><span className="font-medium">Employee ID:</span> {selectedEmployee.employee_id}</div>
                <div><span className="font-medium">Email:</span> {selectedEmployee.email}</div>
                <div><span className="font-medium">Department:</span> {selectedEmployee.department}</div>
                <div><span className="font-medium">Position:</span> {selectedEmployee.position}</div>
                <div><span className="font-medium">Salary:</span> ${Number(selectedEmployee.salary || 0).toLocaleString()}</div>
                <div><span className="font-medium">Hire Date:</span> {selectedEmployee.hire_date}</div>
                <div><span className="font-medium">Status:</span> {selectedEmployee.status}</div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HumanResources;
