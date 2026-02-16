import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export function AccountSettings() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
             navigate({ to: "/" }) // Redirect to home or login
          }
        }
      })
    } catch (error) {
       toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive"
       })
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account access and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Sign Out</h3>
            <p className="text-sm text-muted-foreground mb-2">
                Sign out of your account on this device.
            </p>
             <Button variant="outline" className="w-fit" onClick={handleSignOut} disabled={isLoading}>
                {isLoading ? "Signing out..." : "Sign Out"}
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}
