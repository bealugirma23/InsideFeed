import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

import { CategoryScreen } from "@/features/category/pages/category"

const searchSchema = z.object({
  type: z.string().optional(),
})

export const Route = createFileRoute("/_base/category")({
  validateSearch: (search) => searchSchema.parse(search),
  component: CategoryRouteComponent,
})

function CategoryRouteComponent() {
  const { type } = Route.useSearch()
  return <CategoryScreen category={type} />
}
