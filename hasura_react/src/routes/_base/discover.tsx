import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_base/discover')({
  component: DiscoverPage,
});

function DiscoverPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Discover</h1>
      {/* TODO: Implement discover/search page */}
    </div>
  );
}
