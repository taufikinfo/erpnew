import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, ArrowLeft, ChevronDown, ChevronRight, Clock, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/landing/Navigation';
import ReactMarkdown from 'react-markdown';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Doc {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

const extractTableOfContents = (content: string): TableOfContentsItem[] => {
  const headings: TableOfContentsItem[] = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      headings.push({ id, text, level });
    }
  });
  
  return headings;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Docs = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>('');

  const { data: docs = [], isLoading } = useQuery({
    queryKey: ['public-docs'],
    queryFn: async () => {
      try {
        const data = await apiClient.getDocs(true);
        return data;
      } catch (error) {
        console.error('Error fetching docs:', error);
        return [];
      }
    },
  });

  const { data: currentDoc } = useQuery({
    queryKey: ['doc', slug],
    queryFn: async () => {
      if (!slug) return null;
      try {
        return await apiClient.getDocBySlug(slug);
      } catch (error) {
        console.error('Error fetching doc:', error);
        return null;
      }
    },
    enabled: !!slug,
  });

  const categories = [...new Set(docs.map(doc => doc.category))];
  
  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedDocs = filteredDocs.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, Doc[]>);

  const activeSlug = slug;
  const tableOfContents = currentDoc ? extractTableOfContents(currentDoc.content) : [];

  useEffect(() => {
    const updateActiveHeading = () => {
      if (!tableOfContents.length) return;

      const headingElements = tableOfContents.map(heading => 
        document.getElementById(heading.id)
      ).filter(Boolean);

      const headerOffsets = headingElements.map(el => ({
        id: el!.id,
        offset: Math.abs(el!.getBoundingClientRect().top)
      }));

      const closest = headerOffsets.reduce((prev, curr) => 
        curr.offset < prev.offset ? curr : prev
      );

      setActiveHeading(closest.id);
    };

    window.addEventListener('scroll', updateActiveHeading);
    return () => window.removeEventListener('scroll', updateActiveHeading);
  }, [tableOfContents]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navigation />
        <div className="pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">Loading documentation...</div>
          </div>
        </div>
      </div>
    );
  }

  if (currentDoc) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navigation />
        <div className="pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 mb-4 text-sm">
              <Link to="/docs" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Documentation
              </Link>
              <span className="text-gray-400">/</span>
              <Link 
                to={`/docs?category=${currentDoc.category}`}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {currentDoc.category}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {currentDoc.title}
              </span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar */}
              <aside className="lg:col-span-3 sticky top-24 h-fit">
                <Card className="bg-white/90 dark:bg-gray-900/80 border-0 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Documentation
                    </CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search documentation..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[calc(100vh-300px)]">
                      <nav className="space-y-2">
                        {Object.keys(groupedDocs).map(category => (
                          <Collapsible
                            key={category}
                            open={expandedCategories.includes(category)}
                            onOpenChange={() => toggleCategory(category)}
                          >
                            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                              {category}
                              {expandedCategories.includes(category) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <ul className="space-y-1 ml-4 mt-1">
                                {groupedDocs[category].map(doc => (
                                  <li key={doc.id}>
                                    <Link
                                      to={`/docs/${doc.slug}`}
                                      className={`text-sm px-2 py-1 rounded transition-colors block ${
                                        doc.slug === activeSlug
                                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold'
                                          : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                      }`}
                                    >
                                      {doc.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </nav>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </aside>

              {/* Main Content */}
              <main className="lg:col-span-6">
                <Card className="bg-white/90 dark:bg-gray-900/80 border-0 shadow-md">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Badge variant="secondary" className="mb-2">
                        {currentDoc.category}
                      </Badge>
                      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {currentDoc.title}
                      </h1>
                      {currentDoc.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {currentDoc.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        Last updated: {formatDate(currentDoc.updated_at)}
                      </div>
                    </div>
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                      <ReactMarkdown>{currentDoc.content}</ReactMarkdown>
                    </div>
                  </CardContent>
                </Card>
              </main>

              {/* Table of Contents */}
              <aside className="lg:col-span-3 sticky top-24 h-fit">
                <Card className="bg-white/90 dark:bg-gray-900/80 border-0 shadow-none">
                  <CardHeader>
                    <CardTitle className="text-lg">On this page</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-1">
                      {tableOfContents.map((heading) => (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          className={`
                            block text-sm py-1 pl-${(heading.level - 1) * 4}
                            ${activeHeading === heading.id
                              ? 'text-blue-600 dark:text-blue-400 font-medium'
                              : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}
                          `}
                        >
                          {heading.text}
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navigation />
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Documentation
            </h1>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          {/* Documentation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedDocs).map(([category, docs]) => (
              <Card key={category} className="bg-white/90 dark:bg-gray-900/80 border-0 shadow-md">
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                  <CardDescription>
                    {docs.length} {docs.length === 1 ? 'article' : 'articles'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {docs.map(doc => (
                      <li key={doc.id}>
                        <Link
                          to={`/docs/${doc.slug}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {doc.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
