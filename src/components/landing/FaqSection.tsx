
import { apiClient } from '@/lib/api-client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useStreamingData } from '@/hooks/useStreamingData';
import { LoadingSection } from './LoadingSection';

export const FaqSection = () => {
  const { data: faqs = [], isLoading } = useStreamingData({
    queryKey: ['published-faqs'],
    queryFn: async () => {
      try {
        const data = await apiClient.get('/faqs/');
        return data.filter((faq: { published: boolean }) => faq.published).slice(0, 8);
      } catch (error) {
        return [];
      }
    },
    streamingDelay: 150,
  });

  if (isLoading) {
    return <LoadingSection type="faq" />;
  }

  if (!faqs.length) return null;

  return (
    <section id="faq" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our ERP system
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id}
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex flex-col items-start space-y-1">
                  <span className="font-medium">{faq.question}</span>
                  <span className="text-sm text-blue-600">{faq.category}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
