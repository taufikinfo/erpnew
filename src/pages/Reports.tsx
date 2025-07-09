import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Package,
  Download,
  Filter,
  Calendar
} from 'lucide-react';
import { useReports } from '@/hooks/useReports';
import { useHumanResources } from '@/hooks/useHumanResources';
import { useFinance } from '@/hooks/useFinance';
import { useInventory } from '@/hooks/useInventory';
import { useSales } from '@/hooks/useSales';
import ReportsSkeleton from '@/components/skeletons/ReportsSkeleton';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const { 
    reports, 
    isLoading: reportsLoading, 
    createReport 
  } = useReports();
  
  const { employees, isLoading: employeesLoading } = useHumanResources();
  const { invoices, expenses, isLoading: financeLoading } = useFinance();
  const { inventoryItems, isLoading: inventoryLoading } = useInventory();
  const { salesLeads, isLoading: salesLoading } = useSales();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Calculate department distribution from employees data
  const departmentData = employees.reduce((acc: { [key: string]: number }, employee) => {
    const dept = employee.department || 'Unknown';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const departmentChartData = Object.entries(departmentData).map(([name, value]) => ({
    name,
    value
  }));

  // Revenue calculations
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const revenueData = [
    { name: 'Revenue', value: totalRevenue },
  ];

  // Expense calculations
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expenseData = [
    { name: 'Expenses', value: totalExpenses },
  ];

  // Inventory data
  const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + (item.stock * item.unit_price), 0);
  const inventoryData = [
    { name: 'Inventory Value', value: totalInventoryValue },
  ];

  // Sales data
  const totalSalesLeads = salesLeads.length;
  const salesData = [
    { name: 'Sales Leads', value: totalSalesLeads },
  ];

  if (reportsLoading || employeesLoading || financeLoading || inventoryLoading || salesLoading) {
    return <ReportsSkeleton />;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Analyze your business performance with detailed reports</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            {selectedPeriod}
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="hr">Human Resources</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Total Revenue</span>
                </CardTitle>
                <CardDescription>Overall income generated</CardDescription>
              </CardHeader>
              <CardContent>
                {financeLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-red-600" />
                  <span>Total Expenses</span>
                </CardTitle>
                <CardDescription>Total business expenses</CardDescription>
              </CardHeader>
              <CardContent>
                {financeLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  <span>Inventory Value</span>
                </CardTitle>
                <CardDescription>Current value of all stock</CardDescription>
              </CardHeader>
              <CardContent>
                {inventoryLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="text-2xl font-bold">${totalInventoryValue.toFixed(2)}</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-orange-600" />
                  <span>Sales Leads</span>
                </CardTitle>
                <CardDescription>Number of potential customers</CardDescription>
              </CardHeader>
              <CardContent>
                {salesLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="text-2xl font-bold">{totalSalesLeads}</div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Revenue vs Expenses</CardTitle>
              <CardDescription>A visual representation of income against expenses</CardDescription>
            </CardHeader>
            <CardContent>
              {financeLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <p>Loading...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      { name: 'Page A', revenue: totalRevenue, expenses: totalExpenses },
                    ]}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="expenses" stroke="#e48989" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Revenue Chart</span>
                </CardTitle>
                <CardDescription>Visual representation of revenue data</CardDescription>
              </CardHeader>
              <CardContent>
                {financeLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <p>Loading...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-red-600" />
                  <span>Expense Chart</span>
                </CardTitle>
                <CardDescription>Visual representation of expense data</CardDescription>
              </CardHeader>
              <CardContent>
                {financeLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <p>Loading...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={expenseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#e48989" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hr" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Department Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {employeesLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <p>Loading...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {departmentChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Employee Status</span>
                </CardTitle>
                <CardDescription>Distribution of employee statuses</CardDescription>
              </CardHeader>
              <CardContent>
                {employeesLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <p>Loading...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Active', value: employees.filter(e => e.status === 'active').length },
                          { name: 'Inactive', value: employees.filter(e => e.status === 'inactive').length },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell key="cell-0" fill={COLORS[0]} />
                        <Cell key="cell-1" fill={COLORS[1]} />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-600" />
                <span>Inventory Overview</span>
              </CardTitle>
              <CardDescription>Summary of current inventory levels</CardDescription>
            </CardHeader>
            <CardContent>
              {inventoryLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <p>Loading...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={inventoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-orange-600" />
                <span>Sales Leads Overview</span>
              </CardTitle>
              <CardDescription>Summary of sales leads</CardDescription>
            </CardHeader>
            <CardContent>
              {salesLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <p>Loading...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
