
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

interface SearchResult {
  id: string;
  title: string;
  type: 'doc' | 'faq' | 'blog';
  url: string;
  excerpt?: string;
}

export const SearchCommand = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const { data: searchResults = [] } = useQuery({
    queryKey: ['search-content'],
    queryFn: async (): Promise<SearchResult[]> => {
      const [docs, faqs, blogs] = await Promise.all([
        apiClient.get('/docs/').catch(() => []),
        apiClient.get('/faqs/').catch(() => []),
        apiClient.get('/blogs/').catch(() => []),
      ]);

      const results: SearchResult[] = [];

      docs?.forEach((doc: { id: string; title: string; slug: string; content: string; published: boolean }) => {
        if (doc.published) {
          results.push({
            id: doc.id,
            title: doc.title,
            type: 'doc',
            url: `/docs/${doc.slug}`,
            excerpt: doc.content?.substring(0, 100) + '...',
          });
        }
      });

      faqs?.forEach((faq: { id: string; question: string; answer: string; published: boolean }) => {
        if (faq.published) {
          results.push({
            id: faq.id,
            title: faq.question,
            type: 'faq',
            url: `/faq#${faq.id}`,
            excerpt: faq.answer?.substring(0, 100) + '...',
          });
        }
      });

      blogs?.forEach((blog: { id: string; title: string; slug: string; excerpt: string; published: boolean }) => {
        if (blog.published) {
          results.push({
            id: blog.id,
            title: blog.title,
            type: 'blog',
            url: `/blog/${blog.slug}`,
            excerpt: blog.excerpt || '',
          });
        }
      });

      return results;
    },
  });

  const handleSelect = (url: string) => {
    setOpen(false);
    window.location.href = url;
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Search className="h-4 w-4" />
        Search...
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search ..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Documentation">
            {searchResults
              .filter(result => result.type === 'doc')
              .map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={() => handleSelect(result.url)}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{result.title}</span>
                    {result.excerpt && (
                      <span className="text-sm text-gray-500">{result.excerpt}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="FAQs">
            {searchResults
              .filter(result => result.type === 'faq')
              .map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={() => handleSelect(result.url)}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{result.title}</span>
                    {result.excerpt && (
                      <span className="text-sm text-gray-500">{result.excerpt}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Blog Posts">
            {searchResults
              .filter(result => result.type === 'blog')
              .map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={() => handleSelect(result.url)}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{result.title}</span>
                    {result.excerpt && (
                      <span className="text-sm text-gray-500">{result.excerpt}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
