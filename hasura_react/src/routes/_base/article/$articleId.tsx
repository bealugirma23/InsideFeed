import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_base/article/$articleId')({
  component: ArticleDetailPage,
});

function ArticleDetailPage() {
  const { articleId } = Route.useParams();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Article Detail</h1>
      <p className="text-gray-600">Article ID: {articleId}</p>
      {/* TODO: Implement article detail page */}
    </div>
  );
}
