import { FeedPage } from '@/features/feed/pages/FeedPage';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/_base/')({
  component: FeedPage,
});


