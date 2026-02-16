import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Camera } from "lucide-react"

interface AvatarUploadProps {
  currentAvatarUrl?: string | null
  userName?: string
  onUpload: (file: File) => void
}

export function AvatarUpload({ currentAvatarUrl, userName, onUpload }: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl || null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      onUpload(file)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <Avatar className="h-24 w-24">
          <AvatarImage src={previewUrl || ""} alt={userName || "User avatar"} />
          <AvatarFallback className="text-lg">
            {userName?.slice(0, 2).toUpperCase() || "CN"}
          </AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-none">
            <Camera className="text-white h-6 w-6" />
        </div>
        <Label 
            htmlFor="avatar-upload" 
            className="absolute inset-0 cursor-pointer rounded-full"
            aria-label="Change avatar"
        />
        <Input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Click to upload new photo</p>
      </div>
    </div>
  )
}
