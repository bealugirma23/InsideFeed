

import { Article, Story, TrendingTopic, Bookmark, SidebarItem } from '../types';


export const COLLECTIONS: SidebarItem[] = [
  { id: 'all', label: 'All Bookmarks', icon: 'archive', count: 124, type: 'collection' },
  { id: 'toread', label: 'To Read', icon: 'schedule', count: 12, type: 'collection' },
  { id: 'research', label: 'Research', icon: 'menu_book', type: 'collection' },
  { id: 'tech', label: 'Tech News', icon: 'memory', type: 'collection' },
  { id: 'market', label: 'Market Trends', icon: 'show_chart', type: 'collection' },
  { id: 'climate', label: 'Climate Change', icon: 'eco', type: 'collection' },
];

export const QUICK_FILTERS: SidebarItem[] = [
  { id: 'favorites', label: 'Favorites', icon: 'star', type: 'filter' },
  { id: 'tags', label: 'Tags', icon: 'sell', type: 'filter' },
];

export const MOCK_BOOKMARKS: Bookmark[] = [
  {
    id: '1',
    title: 'The Future of Decentralized Identity and Privacy in 2024',
    category: 'Tech News',
    readTime: '8 min read',
    source: 'Wired',
    savedDate: '2 days ago',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUAlO1cUDd9Y9ZQktPu16_0jGKIICDyTV81F44TAE4UZnIEwgaHRAtd1e3wkhHdXgOuEbM8S9YbeTuEIy0Wn9LLEn4fxEMlOdBcJPBxY7DuVfq9o-nBhv-zOnjrxGfmdKcH5U7AaSLTLXXNOyfg-eClTm33LeYGYtPscPxBEzllRxRSLmrS1AaX9vk_PEvF_ZdPkeSWFHPAsopyBs10AqG0YGAj9f1lrC32_6qg5uyVcxATV3mrGPpyUOPemZXY4MhWLBgz1PBduii',
    isRead: false,
    isArchived: false,
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Why the Global Supply Chain is Stabilizing Faster Than Predicted',
    category: 'Market Trends',
    readTime: '12 min read',
    source: 'The Economist',
    savedDate: '5 days ago',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0mgDuDkyTNljKNvz8nngkO-dNgv4EpGTWcD9Si8QnjXH9huk-l-ousz2iBlrYJB69xaCip_C7lGSFQjP8HJiQbwvC5l4rnt_y-nDl697Nrn1Gh4W7FCfkMIl5jmI4PfR4zz3Yajg-nig-RKDZ3_54ESQm-nWvKMlEscwFtntqujyHtObcKKNALrkh-hXrWCfGSpfjUkphyhkNgUKXsZ1VcmNtpGZQ_924EH7_bsbwdqnRnkZZg3z9W8o1MhX8qOpqBUX58GM40edJ',
    isRead: true,
    isArchived: false,
    isFavorite: false,
  },
  {
    id: '3',
    title: 'New Solar Breakthrough Could Triple Efficiency of Household Panels',
    category: 'Climate Change',
    readTime: '5 min read',
    source: 'National Geographic',
    savedDate: '1 week ago',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5ZcD39nfhZagWuL-UECugdMEu7XYrS2C6gNRR-JIIEpBOLzayyxJp06_PMqUAVlbrOP9oaU_-9m-ISKAwdVIsaziIWQ4FEFr9kaEh4vSrGTcsp9VdevsFCs3yv02kXsWEFRzVudR9XfCuaAWFXH-3zEoJ0hH_-ezpfYDP4i-Pzir66f_qc1PSyM3z8rLvT238iFwWE4nnxLAR_ag4OCpoc10IGX-jcjxRmPbzt24oDzb70eSZhOClVsAnScyQegf_tA99tmVIoq3W',
    isRead: false,
    isArchived: false,
    isFavorite: false,
  },
  {
    id: '4',
    title: 'CRISPR 2.0: The Next Generation of Gene Editing is Here',
    category: 'Research',
    readTime: '15 min read',
    source: 'Nature Journal',
    savedDate: '2 weeks ago',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjihE4WCo5_KVAyp6yPhc3VPLS9edc-8P6zfEvE02JTAob2Tx2EP4OvHMUOyUfW6eq15c-kiukAUceX0-d2stsVC5OPeV9Zddaj7A-Yw-MkxYgOGAy33-0jSXRoVF3Jg-uHPZyO3eIQ7g0o0DGKZLAhSgmA6XlaTS7Os9IJQ_d3VTeqI0Z1wpSMUpcEaGGzX0Uzcw3Zuj55BlBowNgLq2_G4kyYXmICmgBF--YQBHOGWH2h1iPasJ0E4eGp3FffM4mTaSvCirwKgbT',
    isRead: false,
    isArchived: true,
    isFavorite: true,
  },
];

export const INITIAL_STORIES: Story[] = [
  { id: '1', name: 'AI Future', active: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuEDOV2IymVNzmFlnzTx_-_joLHk0fmWtjy6rSUzEkNe7w3vblWJYQlcL9K7A2ewmAa4JeCDJYd1FG6pcX2PRUnhFNXnDHgxv0unYG6lI7BNP2bybK73zmIEhe1X6mYuMv8z4cwG9m5sxqfDq2FBXpQbfeB11W_QzHyYMERHKjGbf-1lE6oW8RFk0L1ykh7ZPGAfAIDFFQmT11KWB3rpPpyHE42ghm8-e9oJm_C0YL6REQvfKFJZTkGDtwHxFxPFlPw_1qNqo9cnb0' },
  { id: '2', name: 'Markets', active: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY2F6Im1vjiS1UH5WL_88fyA0gDxAgxsy7sZnSE51OBvHFSdD1s51ZsDlS8suyLKuroS_9PHpJflXZvZngAudKGUAoAwBPqRD3C0gzxSARSTvT_KlnrxQkotMNHdzC7Wy1FtG8nCiVIKLtvwh3Tdu4w5OwIerf62MIYKPcuGe0v-lbEkBaL2z77BmCBYtILAn4hWE4cYblR6mu4DfExaK-jNwQCLkmGcUsB9qFrTsydXhqhdbpUiKgZFM_pR7GwxaFF5Lv0Kvm5i-2' },
  { id: '3', name: 'Space', active: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADTyt-gAtNgaWntbtfcgnKuXnoZuqqU7hyAJZi_J6vKC2w2oufOxGPlPz4gsg1-oLd3GWk8RFQ1Z5q-Tl6CB-kX8gmzFjcO-jLswJxq325Ct58-q9ep90khkZsz0rYK4lJOwVmWYe7k_6CbzfRu8sPgDFda7c-x1QDN8qd1_5g4cDO1q0rYGyopMlcUuxPfWX73Z1JrkiDxzrgeGsI_7-SZw-gE_O_7XcrzBTm9IDMv_Eb-W70equ1hjEQ3_89st7KmXO46Ni8l83J' },
  { id: '4', name: 'Nature', active: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH0u14rU1TgpRVUpOlepo2ymFJkf6_nmIZs1XSQ1Cr9HSLiek0mOBhdOVSVzqd8Gg5rpCSQLHa_sC4VuOCZtdPSev9_ghPPIimdn89oJJTRI2LPrq3Q2JBFE8Wr6yMlzXdYSzb-3BZaRQMh4JRBHnsYbUyyjb31AXKtpszGx7wXTzhiimQ6NGRkpTPdmbtUe3mJJKaL9xK3aKkic9ARCWoM8XfCM1mSVG4Av8DH5b8PRmvafeQUXTn-d8F7XFIH3fSDNw9D57pI_pt' },
  { id: '5', name: 'Hardware', active: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXz8Qk6kbFPCVItIvl11mvABctiresTRM7snIPSpu1GtgmhEf4BaAUrrrR5ydxea1KRYldheGyQOw-dQTYBpi52F7b_yOqVjlQ3nJT-0nYUBGkuI-PuSZfpH-1m4PcIE5ho3tA-p4IJv-1jeYaFE-knZ4jCs99ZEffN4n0Kfn7ipzQJ56ZxBf93XNjsQ5aM9d9u-ACxjMMb2WGS4dElARZm6f-x49RzwNgrUDB9AUW23KFVVvDcsJLHt4q2cKYh75tgldRMJzIH0WG' },
  { id: '6', name: 'Health', active: false, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0yVJk2-h_TVIYBLCsgjAZbxpA6Mkui4A4frGvjJmiA3XiuAYklPZCpGTNBj5V5vxOleDZq8WBhYvXuQejoyaqiU_FllUzbTGldW0E65ZELMFHyS-bNEgkT6rZS5hhbtRYqqxvcMkqXt0VoTlzkFpyy5-CFvMYb3ACIe-_uxMj5-n_8duMowNwxqSdWbwn7omaE4o3SQDnnVdnPxn8X_B_JqFj2GvNOgCrpKx04OdSLAx5SMHCHQH5qKvDXAtuG7RhDa-ZONtgWEhk' },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'a1',
    category: 'Technology',
    title: 'The Silent Rise of Quantum Computing in Enterprise Software',
    excerpt: 'How businesses are quietly preparing for a paradigm shift in data processing and cryptography over the next decade.',
    source: 'TechDaily',
    timeAgo: '2h ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgPYSGGPGjR9odqbq89THNgwfjZ34S88V-2r8kZ4ywTH2egI7kY9wZy1ROb1EDIAw5sPiWUkrFoDFEsOn3Zgz8aJmKvowjX-AWc_fbbpNuG4__0QKcYQFn3Dxsqr9Zl_7HltMwi_F-cBiMlStrGmzFltbwyp2-we7JU0KuKwzJDLB2f4WJ_kdQ1ntOKLrYI3nJJNMVmGGBXDV4ycUKk5wBfpJp3u70Sdu8ftuyMr9ddFB6Lanu8pF_hYmBQdsHk7dqGxWJZx1j4W_d',
    likes: '1.2k',
    shares: '234',
    publishedDate: '2024-05-15T10:00:00Z',
  },
  {
    id: 'a2',
    category: 'Sustainability',
    title: 'Why Urban Gardening is More Than Just a Trend: A Deep Dive into Food Security',
    excerpt: 'Metropolises are turning concrete into crops as supply chains face increasing volatility from global climate shifts.',
    source: 'EcoMonitor',
    timeAgo: '4h ago',
    readTime: '6 min read',
    likes: '856',
    publishedDate: '2024-05-15T08:00:00Z',
  },
  {
    id: 'a3',
    category: 'Finance',
    title: 'Fed Signals Potential Rate Adjustments for Q3',
    excerpt: 'Investors remain cautious as the latest minutes suggest a slower approach to inflation management than previously expected.',
    source: 'Finance Insider',
    timeAgo: '1h ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBOhovtPCswSKWCKHqDDNkhMt9l3RACWc5PJzPp31-c8Zq-EfX9FHKka_nNP_Wdg2A67tB9zjcJ7Lc1Kf6F5QpmBY19BuogB2bJH2I4o8Scb_MBEpGxDPKkHSAR1vluYKIiXn2a8Bo0-Bg8avpt-KXd8uexKpmAnoyK9ywT1kfVx6NXYL2nq76swC-TfHD4mmHNynD6AuHN4iZbykub3SjzELKn4O_sjdxvUjsPCK2Ajr6gt0-Mzro6vdq0URnrRceY5bneBRvPJ4R',
    likes: '432',
    publishedDate: '2024-05-15T11:30:00Z',
  },
  {
    id: 'a4',
    category: 'Editorial Pick',
    title: '"Privacy is not a feature, it\'s a fundamental requirement for the modern web."',
    excerpt: '',
    source: 'Opinion',
    author: { name: 'Sarah Jenkins', avatar: '' },
    timeAgo: '',
    isOpinion: true,
    publishedDate: '2024-05-14T09:00:00Z',
  },
  {
    id: 'a5',
    category: 'Health',
    title: 'AI-Designed Molecules Show Promise in Rare Disease Research',
    excerpt: 'The speed of drug discovery is being doubled by machine learning algorithms that predict chemical interactions.',
    source: 'SciencePulse',
    timeAgo: '5h ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhQ8uwX9Tgx-5TbQITckA6R11uTXbaTYks9Gn56NT5nFN9k_Ui59Q-Xf2RQOK7JdlDyZAEuQrU4ZPlnZZ-QT5vPXP-1R6d1Qw5F6pXKqbhsyI_2UtFrWFd2MnzGfe0iX9mUehdfA6fUOTjy0HL1f7--2P8LN-MlCL_Snh34lFTfJwjWBifNS6oI0lht-j3d-2BUOMcFUOBcytnNJiVEVNXwP1WRI_NL9F1FgKXrcslK0DobiedHZq4TSCKXHf5OXp2PYMTHCswd1Pa',
    likes: '3.4k',
    publishedDate: '2024-05-15T07:15:00Z',
  },
  {
    id: 'a6',
    category: 'Sponsored',
    title: 'Cloud Computing for Scale: Free Guide for Startups',
    excerpt: 'Maximize your infrastructure efficiency with these 10 core principles used by Fortune 500 companies.',
    source: 'Sponsored',
    timeAgo: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP1h0pVlwGjRldjifZ0Io1PHIh0FVb2FN-xYiFafngPLRTT8GZu4P-MmoU_92MsuflpcVqzt3GFq7g-VnaXl1ek0fko5fsfIELUFX7ygBOT9tN3YNG2m3LQgHcMfh8d3agd2N0_FazKaK4vjAy2wIuiD0HVqHeoikN_oKVQ4ADFz1xDv_-OGre_uMuPDKKDBnVZmj-yhSUGJvUuVPyjkMvyDyCIGS-xnzUDd74YaWIUKtBlB2Mo7ePg1PP6Dlnj8xxqKWWKdJxaqQU',
    isSponsored: true,
    publishedDate: '2024-05-10T12:00:00Z',
  }
];

export const TRENDING_TOPICS: TrendingTopic[] = [
  { tag: '#AIRevolution', count: '12.4k articles today' },
  { tag: '#GlobalMarkets', count: '8.1k articles today' },
  { tag: '#SpaceXLaunch', count: '5.2k articles today' },
  { tag: '#ClimateAction', count: '3.9k articles today' },
];
