import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

import { SearchPage } from "@/features/search/pages/SearchPage"

const searchSchema = z.object({
  q: z.string().optional(),
})

export const Route = createFileRoute("/_base/search")({
  validateSearch: (search) => searchSchema.parse(search),
  component: SearchRouteComponent,
})

function SearchRouteComponent() {
  const { q } = Route.useSearch()
  return <SearchPage initialQuery={q} />
}
