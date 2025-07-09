import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  DollarSign, 
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useDashboardStats, useDashboardChartData } from '@/hooks/useDashboard';
import { AdvancedDataTable, ColumnDef } from '@/components/table/AdvancedDataTable';
import { DashboardSkeleton } from '@/components/skeletons/DashboardSkeleton';
import BlogManagementSkeleton from '@/components/skeletons/BlogManagementSkeleton';
import DocsManagementSkeleton from '@/components/skeletons/DocsManagementSkeleton';
import FaqManagementSkeleton from '@/components/skeletons/FaqManagementSkeleton';

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

const Dashboard = () => {
  const { stats, isLoading: statsLoading } = useDashboardStats();
  const { chartData, isLoading: chartLoading } = useDashboardChartData();

  // Recent activities with advanced table if needed
  const recentActivities = [
    { id: 1, action: 'New order received', time: '2 minutes ago', type: 'success', user: 'System', category: 'Order' },
    { id: 2, action: `${stats?.lowStockItems} items low on stock`, time: '15 minutes ago', type: 'warning', user: 'System', category: 'Inventory' },
    { id: 3, action: 'Monthly report generated', time: '1 hour ago', type: 'info', user: 'Admin', category: 'Report' },
    { id: 4, action: 'Payment processed', time: '2 hours ago', type: 'success', user: 'Finance', category: 'Payment' },
    { id: 5, action: 'New employee onboarded', time: '1 day ago', type: 'info', user: 'HR', category: 'Employee' },
  ];

  const activityColumns: ColumnDef<any>[] = [
    {
      id: 'action',
      header: 'Activity',
      accessorKey: 'action',
      sortable: true,
      filterable: true,
      cell: (activity) => <span className="font-medium">{activity.action}</span>
    },
    {
      id: 'user',
      header: 'User',
      accessorKey: 'user',
      sortable: true,
      filterable: true,
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['Order', 'Inventory', 'Report', 'Payment', 'Employee']
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: ['success', 'warning', 'info'],
      cell: (activity) => (
        <Badge className={
          activity.type === 'success' ? 'bg-green-100 text-green-800' :
          activity.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }>
          {activity.type}
        </Badge>
      )
    },
    {
      id: 'time',
      header: 'Time',
      accessorKey: 'time',
      sortable: true,
      filterable: true,
    }
  ];

  if (statsLoading || chartLoading) {
    if (window.location.pathname.includes('blog')) {
      return <BlogManagementSkeleton />;
    }
    if (window.location.pathname.includes('docs')) {
      return <DocsManagementSkeleton />;
    }
    if (window.location.pathname.includes('faq')) {
      return <FaqManagementSkeleton />;
    }
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <ArrowUpRight className="mr-2 h-4 w-4" />
          View Full Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">${stats?.totalRevenue?.toLocaleString() || 0}</div>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              From paid invoices
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats?.totalOrders || 0}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Total invoices
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Active Employees</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats?.activeEmployees || 0}</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Inventory Items</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{stats?.totalInventoryItems || 0}</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              {stats?.lowStockItems ? <TrendingDown className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
              {stats?.lowStockItems || 0} low stock items
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Sales Trend</span>
            </CardTitle>
            <CardDescription>Revenue performance from invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData?.salesData || []}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>Department Distribution</span>
            </CardTitle>
            <CardDescription>Employee distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData?.departmentData || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData?.departmentData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {chartData?.departmentData?.map((item, index) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities with Advanced Table */}
        <Card className="lg:col-span-2 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>Latest activities across all modules</CardDescription>
          </CardHeader>
          <CardContent>
            <AdvancedDataTable
              data={recentActivities}
              columns={activityColumns}
              searchPlaceholder="Search activities..."
              defaultPageSize={5}
            />
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-800">Total Stock</p>
                <p className="text-2xl font-bold text-blue-900">{stats?.totalStock || 0}</p>
              </div>
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">Items</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-800">Leads Value</p>
                <p className="text-2xl font-bold text-green-900">${stats?.totalLeadsValue?.toLocaleString() || 0}</p>
              </div>
              <Badge variant="secondary" className="bg-green-200 text-green-800">Sales</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
              <div>
                <p className="text-sm font-medium text-yellow-800">Low Stock Items</p>
                <p className="text-2xl font-bold text-yellow-900">{stats?.lowStockItems || 0}</p>
              </div>
              <Badge variant="secondary" className="bg-yellow-200 text-yellow-800">Warning</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
              <div>
                <p className="text-sm font-medium text-red-800">Out of Stock</p>
                <p className="text-2xl font-bold text-red-900">{stats?.outOfStockItems || 0}</p>
              </div>
              <Badge variant="secondary" className="bg-red-200 text-red-800">Alert</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
