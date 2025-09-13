"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Video, Calendar, Eye, Download, Share2 } from "lucide-react"

// Mock gallery data
const photos = [
  {
    id: "1",
    title: "Classical Dance Performance",
    category: "Arts",
    event: "Classical Dance Competition",
    date: "March 20, 2024",
    photographer: "Ahmed Photography",
    views: 245,
    url: "/classical-dance-performance-on-stage.jpg",
  },
  {
    id: "2",
    title: "Football Championship Action",
    category: "Sports",
    event: "Football Tournament",
    date: "March 25, 2024",
    photographer: "Sports Media Team",
    views: 189,
    url: "/football-match-action-shot.jpg",
  },
  {
    id: "3",
    title: "Debate Competition Intensity",
    category: "Arts",
    event: "Debate Competition",
    date: "March 22, 2024",
    photographer: "Event Documentation",
    views: 156,
    url: "/students-debating-in-formal-setting.jpg",
  },
  {
    id: "4",
    title: "Basketball Tournament Highlights",
    category: "Sports",
    event: "Basketball Tournament",
    date: "March 28, 2024",
    photographer: "Sports Photography",
    views: 203,
    url: "/basketball-game-action-indoor-court.jpg",
  },
  {
    id: "5",
    title: "Poetry Recitation Moment",
    category: "Arts",
    event: "Poetry Recitation",
    date: "March 18, 2024",
    photographer: "Cultural Events Team",
    views: 134,
    url: "/student-reciting-poetry-on-stage.jpg",
  },
  {
    id: "6",
    title: "Team Celebration Victory",
    category: "Sports",
    event: "Cricket Championship",
    date: "March 30, 2024",
    photographer: "Victory Moments",
    views: 278,
    url: "/cricket-team-celebrating-victory.jpg",
  },
]

const videos = [
  {
    id: "1",
    title: "Fest Opening Ceremony Highlights",
    category: "General",
    duration: "5:32",
    date: "March 15, 2024",
    views: 1250,
    thumbnail: "/college-fest-opening-ceremony.jpg",
  },
  {
    id: "2",
    title: "Football Final Match Recap",
    category: "Sports",
    duration: "8:45",
    date: "March 25, 2024",
    views: 892,
    thumbnail: "/football-match-highlights-video.jpg",
  },
  {
    id: "3",
    title: "Classical Dance Performances",
    category: "Arts",
    duration: "12:18",
    date: "March 20, 2024",
    views: 567,
    thumbnail: "/classical-dance-performance-video.jpg",
  },
  {
    id: "4",
    title: "Team Interviews & Behind Scenes",
    category: "General",
    duration: "6:22",
    date: "March 23, 2024",
    views: 445,
    thumbnail: "/student-interviews-behind-scenes.jpg",
  },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Fest Gallery</h1>
          <p className="text-xl text-muted-foreground mb-6 text-pretty">
            Relive the memorable moments from our Arts & Sports Fest through photos and videos
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Camera className="h-4 w-4 mr-2" />
              {photos.length} Photos
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Video className="h-4 w-4 mr-2" />
              {videos.length} Videos
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Eye className="h-4 w-4 mr-2" />
              {photos.reduce((sum, photo) => sum + photo.views, 0) +
                videos.reduce((sum, video) => sum + video.views, 0)}{" "}
              Total Views
            </Badge>
          </div>
        </div>

        {/* Gallery Tabs */}
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={photo.url || "/placeholder.svg"} alt={photo.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge variant={photo.category === "Arts" ? "secondary" : "default"}>{photo.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 text-balance">{photo.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{photo.event}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {photo.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {photo.views} views
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Photo by {photo.photographer}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Button size="lg" className="rounded-full w-16 h-16">
                        <Video className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={
                          video.category === "Arts" ? "secondary" : video.category === "Sports" ? "default" : "outline"
                        }
                      >
                        {video.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="outline" className="bg-black/50 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 text-balance">{video.title}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {video.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {video.views} views
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Video className="h-3 w-3 mr-1" />
                        Watch Now
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="highlights" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Fest 2024 Highlights Reel</h3>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Video className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Official Highlights Video</p>
                      <p className="text-sm text-muted-foreground">Coming Soon</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-pretty">
                    A comprehensive highlights reel featuring the best moments from all events, team celebrations, and
                    memorable performances from the Arts & Sports Fest 2024.
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Most Viewed Photo</h4>
                    <img
                      src={photos.reduce((prev, current) => (prev.views > current.views ? prev : current)).url}
                      alt="Most viewed"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      {photos.reduce((prev, current) => (prev.views > current.views ? prev : current)).title}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Most Watched Video</h4>
                    <img
                      src={videos.reduce((prev, current) => (prev.views > current.views ? prev : current)).thumbnail}
                      alt="Most watched"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      {videos.reduce((prev, current) => (prev.views > current.views ? prev : current)).title}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
