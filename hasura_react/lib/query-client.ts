import { QueryClient } from '@tanstack/react-query';

// Create a query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default cache time of 5 minutes
      cacheTime: 5 * 60 * 1000,
      // Refetch data on window focus (with deduplication)
      refetchOnWindowFocus: false,
      // Retry failed requests once
      retry: 1,
      // Stale time of 1 minute (data is considered fresh for 1 min)
      staleTime: 60 * 1000,
    },
  },
});