import { useCallback, useEffect, useState } from "react";
import { SearchHeader } from "../components/SearchHeader"
import { NewsArticle, SearchFilters } from "types";
import { SearchFilter } from "@tanstack/react-router";
import { ResultCard } from "../components/ResultCard";
import { FilterSidebar } from "../components/FilterSidebar";

export const SearchPage = (props: {}) => {
  const [query, setQuery] = useState('Artificial Intelligence in Medicine');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    dateRange: 'Anytime',
    sources: ['Tech Journal', 'Global News'],
    sortBy: 'Relevance'
  });

  const performSearch = useCallback(async (searchQuery: string) => {
    setIsLoading(true);
    // const results = await searchNews(searchQuery);
    // setArticles(results);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    performSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="min-h-screen bg-[#f6f7f8]">

      <main className="max-w-7xl mx-auto px-4 py-8">
        <SearchHeader
          query={query}
          setQuery={setQuery}
          onSearch={performSearch}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar filters={filters} setFilters={setFilters} />

          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">
                {isLoading ? 'Searching...' : `Results for "${query}"`}
              </h2>
              <span className="text-sm text-slate-500">
                {isLoading ? '--' : `${articles.length * 124} results found`}
              </span>
            </div>

            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 flex gap-6 animate-pulse">
                    <div className="w-48 h-32 bg-slate-100 rounded-lg"></div>
                    <div className="flex-1 space-y-4">
                      <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                      <div className="h-6 bg-slate-100 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-100 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {articles.map(article => (
                  <ResultCard key={article.id} article={article} />
                ))}

                <div className="flex justify-center pt-8 pb-12">
                  <button className="px-8 py-3 bg-white border border-slate-200 rounded-lg font-semibold hover:border-primary hover:text-primary hover:shadow-lg transition-all flex items-center gap-2 group">
                    Load More Results
                    <span className="material-icons text-lg group-hover:translate-y-0.5 transition-transform">expand_more</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 flex justify-around items-center z-50">
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-icons">home</span>
          <span className="text-[10px]">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-icons">search</span>
          <span className="text-[10px]">Search</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-icons">bookmarks</span>
          <span className="text-[10px]">Saved</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-icons">person</span>
          <span className="text-[10px]">Profile</span>
        </button>
      </div>
    </div>)
}
