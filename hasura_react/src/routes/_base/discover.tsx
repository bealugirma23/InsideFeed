import { DiscoverPage } from '@/features/discover/pages/discover';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_base/discover')({
  component: DiscoverPage,
});


