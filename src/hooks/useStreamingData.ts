
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

interface StreamingDataOptions<T> extends Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  streamingDelay?: number;
  enableStreaming?: boolean;
}

export const useStreamingData = <T>({
  queryKey,
  queryFn,
  streamingDelay = 100,
  enableStreaming = true,
  ...options
}: StreamingDataOptions<T>) => {
  const [streamingData, setStreamingData] = useState<T | undefined>();
  const [isStreaming, setIsStreaming] = useState(false);

  const query = useQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    ...options,
  });

  useEffect(() => {
    if (query.data && enableStreaming && !streamingData) {
      setIsStreaming(true);
      
      // Simulate streaming by revealing data progressively
      const timer = setTimeout(() => {
        setStreamingData(query.data);
        setIsStreaming(false);
      }, streamingDelay);

      return () => clearTimeout(timer);
    } else if (query.data && !enableStreaming) {
      setStreamingData(query.data);
    }
  }, [query.data, enableStreaming, streamingDelay, streamingData]);

  return {
    ...query,
    data: streamingData,
    isLoading: query.isLoading || isStreaming,
    isStreaming,
  };
};
