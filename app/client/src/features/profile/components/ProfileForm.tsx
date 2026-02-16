import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { User } from "better-auth"

interface ProfileFormProps {
  user: {
    id: string
    name: string
    email: string
    image?: string | null
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [name, setName] = useState(user.name)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
        await authClient.updateUser({
            name,
        //   image: undefined, // Handle image separately or here if needed
        })
        toast({
            title: "Profile updated",
            description: "Your profile has been updated successfully.",
        })
    } catch (error: any) {
        toast({
            title: "Error",
            description: error.message || "Failed to update profile",
            variant: "destructive",
        })
    } finally {
        setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>
          Update your personal information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={user.email}
              disabled
              className="bg-muted"
            />
            <p className="text-[0.8rem] text-muted-foreground">
              Email cannot be changed directly.
            </p>
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setName(user.name)} disabled={loading}>
                Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
