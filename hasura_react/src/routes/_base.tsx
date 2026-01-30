import { createFileRoute, Link, Outlet } from "@tanstack/react-router"


import { Header } from "@/components/Header"
import { Sidebar } from "@/components/SideBar"
import { INITIAL_ARTICLES, INITIAL_STORIES, TRENDING_TOPICS } from "@/constants"
import { StoryCircle } from "@/components/StoryCircle"
import { ArticleCard } from "@/components/ArticleCard"
import { useState } from "react"
import { Article } from "types"
import { ChevronDown, ChevronRight } from "lucide-react"

export const Route = createFileRoute("/_base")({
  component: BaseLayout,
})

function BaseLayout() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [loading, setLoading] = useState(false);

  const handleDiscoverMore = async () => {
    setLoading(true);
    // const newItems = ['Technology', 'Finance', 'Health'];
    // if (newItems.length > 0) {
    //   setArticles(prev => [...prev, ...newItems]);
    // } else {
    //     // Fallback or message
    //     console.log("No new articles found or API error.");
    // }
    setLoading(false);
  };
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <div className="max-w-[1440px] mx-auto w-full flex gap-8 px-6 py-8 flex-1">
        {/* Sidebar */}
        <Sidebar topics={TRENDING_TOPICS} />

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* For You Section */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold tracking-tight">For You</h2>
              <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                View Interests
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {INITIAL_STORIES.map(story => (
                <StoryCircle key={story.id} story={story} />
              ))}
            </div>
          </section>

          {/* Latest Stories Feed */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-lg font-bold">Latest Stories</h3>
              <div className="h-[1px] flex-1 bg-gray-200"></div>
            </div>

            <div className="masonry-grid">
              {articles.map((article, idx) => (
                <div key={article.id + idx} className="masonry-item">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </section>

          {/* Loading Spinner / More Action */}
          <div className="py-12 flex flex-col items-center justify-center gap-4">
            {loading ? (
              <>
                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-gray-500">Curating more stories for you...</p>
              </>
            ) : (
              <button
                onClick={handleDiscoverMore}
                className="px-6 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Load More Personalized Stories
              </button>
            )}
          </div>
        </main>
      </div>
    </div>)
}
