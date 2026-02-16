import { ArticleBody } from "../components/ArticleBody"
import { ArticleHeader } from "../components/ArticleHeader"
import { ArticleSidebar } from "../components/ArticleSidebar"
import { RelatedSidebar } from "../components/RelatedSideBar"
import { MOCK_RELATED } from "../constants"
import { useQuery } from "@tanstack/react-query"
import { graphqlRequest } from "@/lib/graphql-client"
import { GET_ARTICLE_BY_ID } from "@/graphql/articles"
import { useParams } from "@tanstack/react-router"
import { Article } from "types"

export const ArticleDetail = () => {
  const { articleId } = useParams({ from: '/_base/article/$articleId' });

  const { data: articleData, isLoading, error } = useQuery({
    queryKey: ['article', articleId],
    queryFn: () => graphqlRequest<{ articles_by_pk: any }>(GET_ARTICLE_BY_ID, { id: articleId }),
  });

  const article = articleData?.articles_by_pk;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="py-20 text-center text-red-500 font-medium">
        {error ? `Error: ${error.message}` : "Article not found"}
      </div>
    );
  }

  // Map to the format expected by sub-components
  const formattedArticle: Article = {
    id: article.id,
    title: article.title,
    excerpt: article.summary,
    category: article.category?.name || 'General',
    heroImage: article.imageUrl,
    image: article.imageUrl,
    heroCaption: article.title,
    source: article.source || 'News',
    timeAgo: new Date(article.publishedAt).toLocaleDateString(),
    publishedDate: article.publishedAt,
    content: [{ type: 'paragraph', text: article.content || article.summary }]
  };

  return (
       <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_300px] gap-12">
          {/* Social Actions Sidebar */}
          <ArticleSidebar />

          {/* Article Main Content */}
          <div className="max-w-3xl mx-auto w-full">
            <ArticleHeader article={formattedArticle} />
            
            <figure className="my-10 -mx-4 sm:mx-0">
              {/* <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                <img 
                  src={formattedArticle.heroImage} 
                  alt={formattedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div> */}
              <figcaption className="mt-4 text-center text-sm text-slate-500 italic px-4">
                {formattedArticle.heroCaption}
              </figcaption>
            </figure>

            <ArticleBody article={formattedArticle} />
          </div>

          {/* Related Sidebar */}
          <RelatedSidebar related={MOCK_RELATED} />
        </div>
  )
}
