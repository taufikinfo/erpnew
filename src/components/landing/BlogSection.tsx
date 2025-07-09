
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { useStreamingData } from '@/hooks/useStreamingData';
import { LoadingSection } from './LoadingSection';

export const BlogSection = () => {
  const { data: blogs = [], isLoading } = useStreamingData({
    queryKey: ['featured-blogs'],
    queryFn: async () => {
      try {
        const data = await apiClient.get('/blogs/');
        return data
          .filter((blog: { published: boolean }) => blog.published)
          .sort((a: { publish_date: string }, b: { publish_date: string }) => 
            new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
          )
          .slice(0, 3);
      } catch (error) {
        return [];
      }
    },
    streamingDelay: 180,
  });

  if (isLoading) {
    return <LoadingSection type="blog" />;
  }

  if (!blogs.length) return null;

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, tips, and news about ERP systems and business optimization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {blogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              {blog.featured_image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blog.featured_image}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {blog.category}
                  </span>
                  {blog.publish_date && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(blog.publish_date), 'MMM dd, yyyy')}</span>
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl leading-tight">{blog.title}</CardTitle>
                {blog.excerpt && (
                  <CardDescription className="text-gray-600">
                    {blog.excerpt}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <Button variant="ghost" className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="group">
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
