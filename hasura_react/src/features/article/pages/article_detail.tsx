import { ArticleBody } from "../components/ArticleBody"
import { ArticleHeader } from "../components/ArticleHeader"
import { ArticleSidebar } from "../components/ArticleSidebar"
import { RelatedSidebar } from "../components/RelatedSideBar"

export const ArticleDetail = (props: {}) => {
  return (
       <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_300px] gap-12">
          {/* Social Actions Sidebar */}
          <ArticleSidebar />

          {/* Article Main Content */}
          <div className="max-w-3xl mx-auto w-full">
            <ArticleHeader article={MOCK_ARTICLE} />
            
            <figure className="my-10 -mx-4 sm:mx-0">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                <img 
                  src={MOCK_ARTICLE.heroImage} 
                  alt={MOCK_ARTICLE.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center text-sm text-slate-500 italic px-4">
                {MOCK_ARTICLE.heroCaption}
              </figcaption>
            </figure>

            <ArticleBody article={MOCK_ARTICLE} />
          </div>

          {/* Related Sidebar */}
          <RelatedSidebar related={MOCK_RELATED} />
        </div>
  )
}
