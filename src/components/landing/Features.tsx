import { 
  DollarSign, 
  Users, 
  Package, 
  ShoppingCart, 
  Truck, 
  Factory, 
  FolderOpen, 
  FileText,
  BarChart3,
  Shield,
  Cloud,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Features = () => {
  const coreModules = [
    {
      icon: DollarSign,
      title: 'Finance Management',
      description: 'Complete financial control with accounting, budgeting, and reporting tools.',
    },
    {
      icon: Users,
      title: 'Human Resources',
      description: 'Employee management, payroll, attendance, and performance tracking.',
    },
    {
      icon: Package,
      title: 'Inventory Control',
      description: 'Real-time stock management, warehouse operations, and supply chain visibility.',
    },
    {
      icon: ShoppingCart,
      title: 'Sales & CRM',
      description: 'Customer relationship management with sales pipeline and lead tracking.',
    },
    {
      icon: Truck,
      title: 'Procurement',
      description: 'Vendor management, purchase orders, and supplier relationship management.',
    },
    {
      icon: Factory,
      title: 'Manufacturing',
      description: 'Production planning, quality control, and manufacturing resource planning.',
    },
    {
      icon: FolderOpen,
      title: 'Project Management',
      description: 'Task management, resource allocation, and project timeline tracking.',
    },
    {
      icon: FileText,
      title: 'Reports & Analytics',
      description: 'Comprehensive reporting with real-time dashboards and business intelligence.',
    },
  ];

  const keyFeatures = [
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Get instant insights with live dashboards and customizable reports.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with role-based access and data encryption.',
    },
    {
      icon: Cloud,
      title: 'Cloud-based',
      description: 'Access your data anywhere, anytime with automatic backups and updates.',
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Streamline workflows with intelligent automation and AI-powered insights.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Complete ERP Solution
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to run your business efficiently in one integrated platform
          </p>
        </div>

        {/* Core Modules */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-foreground mb-12">Core Business Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {module.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Key Features */}
        <div>
          <h3 className="text-2xl font-bold text-center text-foreground mb-12">Why Choose Our ERP?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
