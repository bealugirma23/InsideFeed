import { Article, RelatedNews } from "types";

export const MOCK_ARTICLE: Article = {
  id: '1',
  category: 'Technology',
  title: 'The Future of Urban Living: How AI is Reshaping Our Cities',
  excerpt: 'How artificial intelligence is transforming modern cities.',
  source: 'FutureCity Media',
  publishedDate: 'Oct 24, 2023',
  timeAgo: '2 hours ago',
  readTime: '8 min read',
  author: {
    name: 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
  },

  heroImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1200&h=675',
  heroCaption: 'Smart infrastructure in Singapore is already reducing traffic congestion by 20%. Photo: FutureCity Media.',
  content: [
    { type: 'paragraph', text: 'Imagine a city that breathes, learns, and anticipates your every move. This is no longer the stuff of science fiction. Across the globe, from the tech hubs of Shenzhen to the revitalized districts of Barcelona, artificial intelligence is quietly moving into the bedrock of our urban environments.' },
    { type: 'heading', text: 'The Neural Network of the Modern Metropolis' },
    { type: 'paragraph', text: "The core of this transformation lies in data—massive amounts of it. Sensors embedded in roads, power grids, and waste bins are funneling real-time information into centralized AI hubs. These systems aren't just monitoring; they are optimizing." },
    { type: 'blockquote', text: '"The goal isn\'t just to build \'smarter\' cities, but to build more \'human\' cities that respond to the needs of their citizens in real-time."' },
    { type: 'paragraph', text: 'Traffic management is perhaps the most visible application. AI algorithms can now predict congestion before it happens, adjusting light timings and routing autonomous public transit to meet demand peaks. In Los Angeles, experimental AI-driven traffic controllers have reduced commute times for trial users by nearly 15 minutes a day.' },
    { type: 'subheading', text: 'Sustainability and Energy' },
    { type: 'paragraph', text: 'Beyond the commute, energy consumption is seeing a revolution. Smart grids powered by machine learning can predict surges in demand and reallocate renewable energy sources from storage batteries, drastically reducing the carbon footprint of high-density living.' },
    { type: 'cta', text: 'Love this deep dive?' },
    { type: 'paragraph', text: "However, the integration of AI isn't without its challenges. Privacy remains a paramount concern. As our cities become increasingly observant, the question of who owns the data—and how it's used—becomes a critical debate for urban planners and ethicists alike." }
  ],
  tags: ['SmartCity', 'AI', 'UrbanPlanning', 'Sustainability']
};

export const MOCK_RELATED: RelatedNews[] = [
  {
    id: '101',
    title: 'Vertical Farming: Feeding the Cities of 2050',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=400&h=250',
    readTime: '5 min read',
    category: 'Sustainability'
  },
  {
    id: '102',
    title: 'The Last Mile: Autonomous Shuttles Take Over',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=400&h=250',
    readTime: '4 min read',
    category: 'Mobility'
  },
  {
    id: '103',
    title: 'Data Privacy in the Age of Ubiquitous Sensing',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=400&h=250',
    readTime: '12 min read',
    category: 'Ethics'
  }
];
