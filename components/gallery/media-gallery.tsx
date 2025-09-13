"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Play, Download, Heart, Share2 } from "lucide-react"
import Image from "next/image"

interface MediaItem {
  id: string
  type: "image" | "video"
  title: string
  category: "Arts" | "Sports" | "Events"
  url: string
  thumbnail?: string
  uploadedBy: string
  uploadedAt: string
  likes: number
  description?: string
}

const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    type: "image",
    title: "Classical Dance Performance",
    category: "Arts",
    url: "/classical-dance-performance-on-stage.jpg",
    uploadedBy: "Admin",
    uploadedAt: "2024-01-15",
    likes: 24,
    description: "Beautiful classical dance performance during the Arts Fest",
  },
  {
    id: "2",
    type: "image",
    title: "Football Championship Match",
    category: "Sports",
    url: "/football-match-action-shot.jpg",
    uploadedBy: "Sports Team",
    uploadedAt: "2024-01-14",
    likes: 18,
    description: "Intense moment from the football championship final",
  },
  {
    id: "3",
    type: "video",
    title: "Opening Ceremony Highlights",
    category: "Events",
    url: "/opening-ceremony-video.mp4",
    thumbnail: "/opening-ceremony-stage.jpg",
    uploadedBy: "Media Team",
    uploadedAt: "2024-01-13",
    likes: 45,
    description: "Complete highlights from the grand opening ceremony",
  },
]

interface MediaGalleryProps {
  isAdmin?: boolean
  onUpload?: (file: File, category: string, title: string) => void
}

export function MediaGallery({ isAdmin = false, onUpload }: MediaGalleryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())

  const filteredItems = mockMediaItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesType = selectedType === "all" || item.type === selectedType

    return matchesSearch && matchesCategory && matchesType
  })

  const toggleLike = (itemId: string) => {
    const newLikedItems = new Set(likedItems)
    if (newLikedItems.has(itemId)) {
      newLikedItems.delete(itemId)
    } else {
      newLikedItems.add(itemId)
    }
    setLikedItems(newLikedItems)
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Events">Events</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-video">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer relative group">
                    {item.type === "image" ? (
                      <Image src={item.url || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    ) : (
                      <div className="relative">
                        <Image
                          src={item.thumbnail || "/placeholder.svg?height=200&width=300&query=video thumbnail"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                          <Play className="h-12 w-12 text-white" />
                        </div>
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      {item.category}
                    </Badge>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  {item.type === "image" ? (
                    <Image
                      src={item.url || "/placeholder.svg"}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  ) : (
                    <video controls className="w-full">
                      <source src={item.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </DialogContent>
              </Dialog>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              {item.description && <p className="text-sm text-muted-foreground mb-3">{item.description}</p>}
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <span>By {item.uploadedBy}</span>
                <span>{item.uploadedAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleLike(item.id)}
                    className={likedItems.has(item.id) ? "text-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 ${likedItems.has(item.id) ? "fill-current" : ""}`} />
                    <span className="ml-1">{item.likes + (likedItems.has(item.id) ? 1 : 0)}</span>
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No media items found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
