import { AccountSettings } from "../components/AccountSettings"
import { PreferencesSettings } from "../components/PreferencesSettings"
import { AvatarUpload } from "../components/AvatarUpload"
import { ProfileForm } from "../components/ProfileForm"
import { authClient } from "@/lib/auth-client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export function ProfilePage() {
  const { data: session } = authClient.useSession()
  
  const handleAvatarUpload = async (file: File) => {
    // Placeholder for actual upload logic
    // In a real app, you'd upload 'file' to a storage bucket (AWS S3, etc.)
    // and get a URL back, then update the user profile with that URL.
    toast({
        title: "Image selected",
        description: "Image upload functionality requires a storage backend. Logic is in place.",
    })
    
    // Example of how usage would look:
    // const imageUrl = await uploadService.upload(file)
    // await authClient.user.update({ image: imageUrl })
  }

  if (!session) {
    return (
        <div className="container mx-auto py-8">
            <div className="h-48 w-full bg-muted animate-pulse rounded-lg" />
        </div>
    )
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
            <div className="flex flex-col items-center gap-6 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                <AvatarUpload 
                    currentAvatarUrl={session.user.image}
                    userName={session.user.name}
                    onUpload={handleAvatarUpload}
                />
                <div className="text-center">
                    <p className="font-medium">{session.user.name}</p>
                    <p className="text-sm text-muted-foreground break-all">{session.user.email}</p>
                </div>
            </div>
            
             <div className="mt-6 hidden lg:block">
                 {/* Navigation sidebar could go here if using routing for settings tab, 
                     but we'll use Tabs component for simplicity */}
             </div>
        </aside>

        <div className="flex-1 lg:max-w-2xl">
            <Tabs defaultValue="details" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="details">Profile Details</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-6">
                    <ProfileForm user={session.user} />
                </TabsContent>
                <TabsContent value="preferences" className="space-y-6">
                    <PreferencesSettings />
                </TabsContent>
                <TabsContent value="account" className="space-y-6">
                    <AccountSettings />
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  )
}
