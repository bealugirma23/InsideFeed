import { ArticleDetail } from '@/features/article/pages/article_detail';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_base/article/$articleId')({
  component: ArticleDetail,
});


