import { SavedPage } from '@/features/saved/pages/savedPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_base/saved')({
  component: SavedPage,
});


