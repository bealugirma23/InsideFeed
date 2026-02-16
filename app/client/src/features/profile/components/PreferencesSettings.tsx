import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"
import { graphqlRequest } from "@/lib/graphql-client"
import { GET_CATEGORIES } from "@/graphql/categories"
import { CREATE_USER_INTERESTS, DELETE_USER_INTERESTS, GET_USER_INTERESTS } from "@/graphql/userInterests"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

interface Category {
  id: string
  name: string
  slug: string
}

interface UserInterest {
  category: {
    id: string
    name: string
  }
}

export function PreferencesSettings() {
  const { data: session } = authClient.useSession()
  const queryClient = useQueryClient()
  const userId = session?.user?.id

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => graphqlRequest<{ categories: Category[] }>(GET_CATEGORIES),
  })

  const { data: userInterestsData, isLoading: isLoadingInterests } = useQuery({
    queryKey: ['userInterests', userId],
    queryFn: () => graphqlRequest<{ user_interests: UserInterest[] }>(GET_USER_INTERESTS, { userId }),
    enabled: !!userId,
  })

  // Local state for optimistic UI updates before saving? 
  // actually simpler to just have a save button for bulk updates as requested in plan.
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [hasChanges, setHasChanges] = useState(false)

  // Initialize selectedIds when data is loaded
  useEffect(() => {
    if (userInterestsData?.user_interests) {
      const ids = new Set(userInterestsData.user_interests.map(ui => ui.category.id))
      setSelectedIds(ids)
      setHasChanges(false) // Reset changes tracking on load
    }
  }, [userInterestsData])

  const { mutate: updateInterests, isPending: isSaving } = useMutation({
    mutationFn: async () => {
        if (!userId) return

        const initialIds = new Set(userInterestsData?.user_interests.map(ui => ui.category.id) || [])
        const currentIds = selectedIds

        const toAdd = [...currentIds].filter(id => !initialIds.has(id))
        const toRemove = [...initialIds].filter(id => !currentIds.has(id))

        const promises = []
        
        if (toAdd.length > 0) {
            const objects = toAdd.map(categoryId => ({ userId, categoryId }))
            promises.push(graphqlRequest(CREATE_USER_INTERESTS, { objects }))
        }

        if (toRemove.length > 0) {
            promises.push(graphqlRequest(DELETE_USER_INTERESTS, { userId, categoryIds: toRemove }))
        }

        await Promise.all(promises)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userInterests', userId] })
        setHasChanges(false)
        toast({
            title: "Preferences saved",
            description: "Your interests have been updated."
        })
    },
    onError: (error: any) => {
        toast({
            title: "Error saving preferences",
            description: error.message || "Something went wrong.",
            variant: "destructive"
        })
    }
  })

  const toggleInterest = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) {
        next.delete(id)
    } else {
        next.add(id)
    }
    setSelectedIds(next)
    setHasChanges(true)
  }

  if (isLoadingCategories || isLoadingInterests) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Interests</CardTitle>
                <CardDescription>Loading...</CardDescription>
            </CardHeader>
        </Card>
    )
  }

  const categories = categoriesData?.categories || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interests</CardTitle>
        <CardDescription>
          Select topics you want to see in your feed.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
            {categories.map(category => {
                const isSelected = selectedIds.has(category.id)
                return (
                    <Badge
                        key={category.id}
                        variant={isSelected ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-2 text-sm transition-all hover:opacity-80 ${!isSelected ? 'hover:border-primary hover:text-primary' : ''}`}
                        onClick={() => toggleInterest(category.id)}
                    >
                        {category.name}
                        {isSelected && <span className="ml-2">✓</span>}
                    </Badge>
                )
            })}
        </div>
        
        <div className="flex justify-end gap-2">
            <Button 
                variant="outline" 
                onClick={() => {
                   // Reset to server state
                   if (userInterestsData?.user_interests) {
                     setSelectedIds(new Set(userInterestsData.user_interests.map(ui => ui.category.id)))
                     setHasChanges(false)
                   }
                }}
                disabled={!hasChanges || isSaving}
            >
                Reset
            </Button>
            <Button onClick={() => updateInterests()} disabled={!hasChanges || isSaving}>
                {isSaving ? "Saving..." : "Save Preferences"}
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}
