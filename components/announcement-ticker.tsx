"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Megaphone } from "lucide-react"

const announcements = [
  {
    id: 1,
    title: "Registration Open for Arts Fest",
    content: "Registration for all Arts Fest programmes is now open. Deadline: March 15th",
    type: "info",
    date: "2024-03-01",
  },
  {
    id: 2,
    title: "Sports Fest Schedule Released",
    content: "Complete schedule for Sports Fest has been published. Check the programmes section.",
    type: "update",
    date: "2024-03-02",
  },
  {
    id: 3,
    title: "Venue Change: Drama Competition",
    content: "Drama competition venue changed to Main Auditorium due to technical requirements.",
    type: "important",
    date: "2024-03-03",
  },
]

export function AnnouncementTicker() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Latest Announcements</h3>
      </div>

      <div className="space-y-3">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-balance">{announcement.title}</h4>
                    <Badge
                      variant={announcement.type === "important" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {announcement.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground text-pretty">{announcement.content}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(announcement.date).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
