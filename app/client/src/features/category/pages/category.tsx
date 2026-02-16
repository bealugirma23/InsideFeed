import { ArticleCard } from "@/components/ArticleCard"
import { GET_CATEGORIES } from "@/graphql/categories"
import { GET_ARTICLES_BY_CATEGORY } from "@/graphql/articles"
import { graphqlRequest } from "@/lib/graphql-client"
import { useQuery } from "@tanstack/react-query"
import { Article } from "@/types" // Assuming type exists here, if not will fix
import { Skeleton } from "@/components/ui/skeleton"

interface CategoryScreenProps {
  category?: string
}

interface Category {
    id: string
    name: string
    slug: string
}

export const CategoryScreen = ({ category }: CategoryScreenProps) => {
  // 1. Fetch Categories to find the ID for the slug
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => graphqlRequest<{ categories: Category[] }>(GET_CATEGORIES),
  })

  console.log(categoriesData)
  const cat = category == "tech" ? "Technology" : category
  const currentCategory = categoriesData?.categories.find(c => c.slug === cat)
  const categoryId = currentCategory?.id

  // 2. Fetch Articles for the category ID
  const { data: articlesData, isLoading: isLoadingArticles } = useQuery({
    queryKey: ['articles', categoryId],
    queryFn: () => graphqlRequest<{ articles: any[] }>(GET_ARTICLES_BY_CATEGORY, { categoryId }),
    enabled: !!categoryId,
  })

  const isLoading = isLoadingCategories || (!!categoryId && isLoadingArticles)

  if (isLoading) {
    return (
        <div className="p-8 container mx-auto">
            <div className="h-10 w-48 bg-muted animate-pulse rounded mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                     <div key={i} className="space-y-4">
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                     </div>
                ))}
            </div>
        </div>
    )
  }

  if (!currentCategory) {
     return (
        <div className="p-8 container mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground">The category "{cat}" does not exist.</p>
        </div>
     )
  }

  const articles = articlesData?.articles.map((article: any) => ({
    id: article.id,
    title: article.title,
    excerpt: article.summary,
    image: article.imageUrl,
    category: article.category?.name || "Uncategorized", // Flatten for ArticleCard if it expects string
    author: article.author,
    publishedAt: article.publishedAt,
    source: "InsideFeed", // Default source
    timeAgo: new Date(article.publishedAt).toLocaleDateString(), // Simple formatting
    views: article.view,
    isBreaking: article.isBreaking,
  })) || []

  return (
    <div className="p-8 container mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight mb-2">
            {currentCategory.name}
        </h1>
        <p className="text-lg text-muted-foreground">
            Latest news and top stories from {currentCategory.name}
        </p>
      </div>
      
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: any) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/30 rounded-xl">
            <p className="text-xl font-medium text-muted-foreground">No articles found in this category yet.</p>
        </div>
      )}
    </div>
  )
}
