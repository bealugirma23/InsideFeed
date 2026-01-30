import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_base/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Profile Management</h1>
      {/* TODO: Implement profile management page */}
    </div>
  );
}
