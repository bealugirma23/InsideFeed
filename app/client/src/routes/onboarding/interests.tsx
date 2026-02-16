import { InterestsPage } from '@/features/onboarding/pages/interestsPage';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/onboarding/interests')({
  component: InterestsPage,
});



