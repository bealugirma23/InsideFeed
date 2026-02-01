import { INITIAL_ARTICLES, INITIAL_STORIES } from "@/constants";
import { StoryCircle } from "@/components/StoryCircle";
import { ArticleCard } from "@/components/ArticleCard";
import { useState } from "react";
import { Article } from "types";
import { ChevronRight } from "lucide-react";



import { useTranslation } from "react-i18next";

export function FeedPage() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

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
    <>
      {/* For You Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold tracking-tight">{t("feed.expandHorizon")}</h2>
          <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
            {t("feed.viewInterests")}
            <ChevronRight size={18} />
          </button>
        </div>
        <p className="text-gray-600">{t("feed.discoverContent")}</p>
        {/* <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar"> */}
        {/*   {INITIAL_STORIES.map(story => ( */}
        {/*     <StoryCircle key={story.id} story={story} /> */}
        {/*   ))} */}
        {/* </div> */}
      </section>

      {/* Latest Stories Feed */}


      <section>
        <div className="flex items-center gap-4 mb-6">
          <h3 className="text-lg font-bold">{t("feed.latestStories")}</h3>
          <div className="h-[1px] flex-1 bg-gray-200"></div>
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {articles.map((article, idx) => (
            <div key={article.id + idx} className="break-inside-avoid mb-4">
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
            <p className="text-sm font-medium text-gray-500">{t("feed.loading")}</p>
          </>
        ) : (
          <button
            onClick={handleDiscoverMore}
            className="px-6 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {t("feed.loadMore")}
          </button>
        )}
      </div>
    </>
  );
}
