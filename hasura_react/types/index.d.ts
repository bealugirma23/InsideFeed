
export type Category = 'Technology' | 'Finance' | 'Health' | 'Sustainability' | 'Politics' | 'Science' | 'Editorial Pick' | 'Sponsored';



export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  thumbnail?: string;
  category: 'Research' | 'Analysis' | 'Breaking' | 'Trending' | 'Opinion';
  timestamp: string;
  author: {
    name: string;
    avatar: string;
  };
  readTime: string;
  isSaved?: boolean;
}

export type DateRange = 'Anytime' | 'Past 24 hours' | 'Past week' | 'Past month';

export interface SearchFilters {
  dateRange: DateRange;
  sources: string[];
  sortBy: 'Relevance' | 'Newest First' | 'Oldest First' | 'Most Read';
}

export interface Author {
  name: string;
  avatar: string;
  role?: string;
}

// export interface Article {
//   id: string;
//   category: string;
//   title: string;
//   author: Author;
//   publishedDate: string;
//   readTime: string;
//   heroImage: string;
//   heroCaption: string;
//   content: ArticleSection[];
//   tags: string[];
// }

export interface ArticleSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'blockquote' | 'cta';
  text: string;
}

export interface RelatedNews {
  id: string;
  title: string;
  image: string;
  readTime: string;
  category: string;
}
export interface Article {
  id: string;
  category: Category;
  title: string;
  excerpt: string;
  source: string;
  timeAgo: string;
  readTime?: string;
  heroImage?: string;
  heroCaption?: string;
  image?: string;
  author?: Author;
  likes?: string;
  shares?: string;
  tags?: string[];
  content?: ArticleSection[];
  isOpinion?: boolean;
  isSponsored?: boolean;
  publishedDate: string;

}

export interface Story {
  id: string;
  name: string;
  image: string;
  active: boolean;
}

export interface TrendingTopic {
  tag: string;
  count: string;
}
