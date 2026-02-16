import { useCallback, useEffect, useState } from "react"

import { FilterSidebar } from "../components/FilterSidebar"
import { ResultCard } from "../components/ResultCard"
import { SearchHeader } from "../components/SearchHeader"

import type { NewsArticle, SearchFilters } from "types"

interface SearchPageProps {
  initialQuery?: string
}

export const SearchPage = ({ initialQuery }: SearchPageProps) => {
  const [query, setQuery] = useState(
    initialQuery || "Artificial Intelligence in Medicine",
  )
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<SearchFilters>({
    dateRange: "Anytime",
    sources: ["Tech Journal", "Global News"],
    sortBy: "Relevance",
  })

  const performSearch = useCallback(async (searchQuery: string) => {
    setIsLoading(true)
    // const results = await searchNews(searchQuery);
    // setArticles(results);
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      performSearch(initialQuery)
    } else {
      performSearch(query)
    }
  }, [initialQuery, performSearch])

  return (
    <div className="min-h-screen bg-[#f6f7f8]">
      <main className="mx-auto max-w-7xl px-4 py-8">
        <SearchHeader
          query={query}
          setQuery={setQuery}
          onSearch={performSearch}
        />

        <div className="flex flex-col gap-8 lg:flex-row">
          <FilterSidebar filters={filters} setFilters={setFilters} />

          <div className="flex-1 space-y-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {isLoading ? "Searching..." : `Results for "${query}"`}
              </h2>
              <span className="text-sm text-slate-500">
                {isLoading ? "--" : `${articles.length * 124} results found`}
              </span>
            </div>

            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex animate-pulse gap-6 rounded-xl border border-slate-100 bg-white p-5"
                  >
                    <div className="h-32 w-48 rounded-lg bg-slate-100"></div>
                    <div className="flex-1 space-y-4">
                      <div className="h-4 w-1/4 rounded bg-slate-100"></div>
                      <div className="h-6 w-3/4 rounded bg-slate-100"></div>
                      <div className="h-4 w-full rounded bg-slate-100"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {articles.map((article) => (
                  <ResultCard key={article.id} article={article} />
                ))}

                <div className="flex justify-center pb-12 pt-8">
                  <button className="group flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-8 py-3 font-semibold transition-all hover:border-primary hover:text-primary hover:shadow-lg">
                    Load More Results
                    <span className="material-icons text-lg transition-transform group-hover:translate-y-0.5">
                      expand_more
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-200 bg-white p-3 lg:hidden">
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
    </div>
  )
}
