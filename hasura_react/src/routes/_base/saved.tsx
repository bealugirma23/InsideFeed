import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_base/saved')({
  component: SavedPage,
});

function SavedPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Saved Articles</h1>
      {/* TODO: Implement saved articles page */}
    </div>
  );
}
