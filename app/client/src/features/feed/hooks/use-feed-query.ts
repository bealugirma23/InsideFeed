import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  source: string;
  category: string;
  readTime: number;
}

interface FeedResponse {
  articles: Article[];
  hasNextPage: boolean;
  nextPage: number | null;
}

// API function for fetching feed
const fetchFeed = async (page: number = 1, limit: number = 10): Promise<FeedResponse> => {
  return apiClient.get(`/feed?page=${page}&limit=${limit}`);
};

// API function for fetching a single article
const fetchArticle = async (id: string): Promise<Article> => {
  return apiClient.get(`/articles/${id}`);
};

// Feature-scoped query hooks
export const useFeedQuery = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['feed', page, limit],
    queryFn: () => fetchFeed(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useArticleQuery = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(id),
    enabled: !!id, // Only run query if ID is provided
  });
};

export const useInfiniteFeedQuery = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['feed-infinite', limit],
    queryFn: ({ pageParam = 1 }) => fetchFeed(pageParam as number, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage && lastPage.nextPage) {
        return lastPage.nextPage;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};