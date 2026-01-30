import { CategoryScreen } from '@/features/category/pages';
import { createFileRoute } from '@tanstack/react-router';


export const Route = createFileRoute('/_base/category')({
  component: CategoryScreen,
});

