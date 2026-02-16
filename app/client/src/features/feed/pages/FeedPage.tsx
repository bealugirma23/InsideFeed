import { StoryCircle } from "@/components/StoryCircle";
import { ArticleCard } from "@/components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { graphqlRequest } from "@/lib/graphql-client";
import { GET_ARTICLES } from "@/graphql/articles";
import { GET_USER_INTERESTS } from "@/graphql/userInterests";
import { authClient } from "@/lib/auth-client";
import { Article } from "types";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function FeedPage() {
  const { t } = useTranslation();
  const session = authClient.useSession();
  const userId = session.data?.user?.id;

  // 1. Fetch User Interests
  const { data: interestsData, isLoading: isLoadingInterests } = useQuery({
    queryKey: ['user-interests', userId],
    queryFn: () => graphqlRequest<{ user_interests: any[] }>(GET_USER_INTERESTS, { userId }),
    enabled: !!userId,
  });

  const categoryIds = (interestsData?.user_interests || []).map(ui => ui.category.id);

  // 2. Fetch Articles based on Category IDs
  const { data: articlesData, isLoading: isLoadingArticles, error } = useQuery({
    queryKey: ['articles', categoryIds],
    queryFn: () => graphqlRequest<{ articles: any[] }>(GET_ARTICLES, { categoryIds }),
    enabled: categoryIds.length > 0,
  });

  const isLoading = isLoadingInterests || (userId && categoryIds.length > 0 && isLoadingArticles);

  const articles: Article[] = (articlesData?.articles || []).map(a => ({
    id: a.id,
    title: a.title,
    excerpt: a.summary,
    category: a.category?.name || 'General',
    image: a.imageUrl,
    source: a.source || 'News',
    timeAgo: a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : 'Just now',
    publishedDate: a.publishedAt || new Date().toISOString(),
  }));

  const handleDiscoverMore = () => {
    // Implement pagination if needed, for now just a placeholder
    console.log("Load more clicked");
  };

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">{t("feed.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
       <div className="py-20 text-center text-red-500 font-medium">
         Error loading feed: {error.message}
       </div>
    );
  }

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
        <p className="text-gray-600 mb-6">{t("feed.discoverContent")}</p>
        
        {articles.length === 0 && !isLoading && (
          <div className="bg-slate-50 rounded-2xl p-12 text-center border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-medium mb-4">No articles found matching your interests.</p>
            <button className="text-primary font-bold hover:underline">Select more interests</button>
          </div>
        )}
      </section>

      {/* Latest Stories Feed */}
      {articles.length > 0 && (
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-lg font-bold">{t("feed.latestStories")}</h3>
          <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {articles.map((article, idx) => (
              <div key={article.id + idx} className="break-inside-avoid mb-4">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Loading Spinner / More Action */}
      <div className="py-12 flex flex-col items-center justify-center gap-4">
        <button
          onClick={handleDiscoverMore}
          className="px-6 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          {t("feed.loadMore")}
        </button>
      </div>
    </>
  );
}
