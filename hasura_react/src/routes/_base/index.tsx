import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_base/')({
  component: FeedPage,
});

function FeedPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Feed</h1>
      {/* TODO: Implement feed/home page */}
    </div>
  );
}
