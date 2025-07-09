import { CheckCircle, TrendingUp, Clock, Users2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const Benefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Increase Efficiency by 40%',
      description: 'Streamline operations and eliminate manual processes with intelligent automation.',
      stats: '40% increase in operational efficiency',
    },
    {
      icon: Clock,
      title: 'Save 20+ Hours Per Week',
      description: 'Reduce administrative tasks and focus on growing your business.',
      stats: '20+ hours saved weekly per employee',
    },
    {
      icon: Users2,
      title: 'Improve Team Collaboration',
      description: 'Real-time data sharing and communication across all departments.',
      stats: '85% improvement in team productivity',
    },
    {
      icon: CheckCircle,
      title: 'Reduce Errors by 95%',
      description: 'Automated data validation and workflow approvals minimize human errors.',
      stats: '95% reduction in data entry errors',
    },
  ];

  const features = [
    'Real-time data synchronization across all modules',
    'Customizable dashboards and reports',
    'Mobile-responsive design for on-the-go access',
    'Integration with popular third-party tools',
    'Multi-language and multi-currency support',
    'Advanced role-based permission system',
    'Automated backup and disaster recovery',
    '24/7 customer support and training',
  ];

  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transform Your Business Operations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See measurable results within weeks of implementation
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="bg-card hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground mb-3">{benefit.description}</p>
                      <div className="text-sm font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900 px-3 py-1 rounded-full inline-block">
                        {benefit.stats}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features List */}
        <div className="bg-card rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Everything You Need Out of the Box
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
