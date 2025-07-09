import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/landing/Navigation';
import ReactMarkdown from 'react-markdown';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string[];
  publish_date: string;
}

const Blog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['public-blogs'],
    queryFn: async () => {
      try {
        const data = await apiClient.getBlogs(true);
        return data;
      } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
      }
    },
  });

  const { data: currentBlog } = useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      if (!slug) return null;
      try {
        return await apiClient.getBlogBySlug(slug);
      } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
      }
    },
    enabled: !!slug,
  });

  const categories = [...new Set(blogs.map(blog => blog.category))];
  
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">Loading blog...</div>
          </div>
        </div>
      </div>
    );
  }

  if (currentBlog) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="pt-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/blog')}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to blog
              </Button>
              {currentBlog.featured_image && (
                <div className="aspect-video mb-6 overflow-hidden rounded-lg">
                  <img
                    src={currentBlog.featured_image}
                    alt={currentBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="secondary">
                    {currentBlog.category}
                  </Badge>
                  {currentBlog.publish_date && (
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(new Date(currentBlog.publish_date), 'MMMM dd, yyyy')}
                    </div>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {currentBlog.title}
                </h1>
                {currentBlog.excerpt && (
                  <p className="text-xl text-muted-foreground mb-4">{currentBlog.excerpt}</p>
                )}
                {currentBlog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {currentBlog.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none text-foreground">
                  <ReactMarkdown>{currentBlog.content}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Latest insights, tips, and news about ERP systems and business optimization
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedCategory === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('')}
              >
                All Categories
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <Badge variant="secondary">{blog.category}</Badge>
                    {blog.publish_date && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(blog.publish_date), 'MMM dd, yyyy')}</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl leading-tight">
                    <Link 
                      to={`/blog/${blog.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {blog.title}
                    </Link>
                  </CardTitle>
                  {blog.excerpt && (
                    <CardDescription className="text-muted-foreground">
                      {blog.excerpt}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No blog posts found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
