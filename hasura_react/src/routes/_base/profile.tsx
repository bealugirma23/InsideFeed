import { ProfilePage } from '@/features/profile/pages/profilePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_base/profile')({
  component: ProfilePage,
});


