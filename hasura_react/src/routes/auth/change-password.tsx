import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/change-password')({
  component: ChangePasswordPage,
});

function ChangePasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Change Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password
          </p>
        </div>
        {/* TODO: Implement change password form */}
      </div>
    </div>
  );
}
