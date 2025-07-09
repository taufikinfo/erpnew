import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechCorp Solutions',
      company: 'TechCorp Solutions',
      avatar: 'SJ',
      rating: 5,
      text: 'This ERP system has completely transformed our operations. We\'ve seen a 40% increase in efficiency and our team loves how intuitive it is to use.',
    },
    {
      name: 'Michael Chen',
      role: 'Operations Director',
      company: 'Manufacturing Plus',
      avatar: 'MC',
      rating: 5,
      text: 'The manufacturing module is incredible. Real-time production tracking and quality control have helped us reduce waste by 30% and improve delivery times.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Finance Manager',
      company: 'GrowthCo',
      avatar: 'ER',
      rating: 5,
      text: 'Financial reporting that used to take us days now takes minutes. The automated workflows have eliminated manual errors and saved us countless hours.',
    },
    {
      name: 'David Park',
      role: 'HR Director',
      company: 'People First Inc',
      avatar: 'DP',
      rating: 5,
      text: 'Employee management has never been easier. From recruitment to performance reviews, everything is streamlined and our HR team can focus on strategic initiatives.',
    },
    {
      name: 'Lisa Thompson',
      role: 'Inventory Manager',
      company: 'Supply Chain Pro',
      avatar: 'LT',
      rating: 5,
      text: 'Real-time inventory tracking across multiple warehouses has eliminated stockouts. We\'ve reduced carrying costs by 25% while improving customer satisfaction.',
    },
    {
      name: 'James Wilson',
      role: 'Sales Director',
      company: 'Revenue Boost Ltd',
      avatar: 'JW',
      rating: 5,
      text: 'The CRM integration is seamless. Our sales team has increased conversion rates by 35% with better lead tracking and customer relationship management.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '4.9/5', label: 'Customer Rating' },
    { number: '24/7', label: 'Support Available' },
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. See what our customers have to say about their experience.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute top-0 left-0 h-8 w-8 text-blue-200 -translate-x-2 -translate-y-2" />
                  <p className="text-muted-foreground leading-relaxed pl-6">
                    {testimonial.text}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
