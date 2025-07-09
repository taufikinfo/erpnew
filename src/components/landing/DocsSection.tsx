
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';
import { useStreamingData } from '@/hooks/useStreamingData';
import { LoadingSection } from './LoadingSection';

export const DocsSection = () => {
  const { data: docs = [], isLoading } = useStreamingData({
    queryKey: ['featured-docs'],
    queryFn: async () => {
      try {
        const data = await apiClient.get('/docs/');
        return data.filter((doc: { published: boolean; featured: boolean }) => 
          doc.published && doc.featured
        ).slice(0, 6);
      } catch (error) {
        return [];
      }
    },
    streamingDelay: 160,
  });

  if (isLoading) {
    return <LoadingSection type="docs" />;
  }

  if (!docs.length) return null;

  return (
    <section id="docs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Documentation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guides and documentation to help you get started with our ERP system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {docs.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">{doc.category}</span>
                </div>
                <CardTitle className="text-lg">{doc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {doc.tags && doc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {doc.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="group">
            View All Documentation
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
