import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Calendar, MapPin } from "lucide-react"

interface Result {
  id: string
  programmeName: string
  programmeId: string
  category: string
  type: "arts" | "sports"
  date: string
  venue: string
  positions: {
    first: { participant: string; team: string; points: number }
    second: { participant: string; team: string; points: number }
    third: { participant: string; team: string; points: number }
  }
  publishedAt: string
}

interface ResultCardProps {
  result: Result
  showActions?: boolean
}

export function ResultCard({ result, showActions = false }: ResultCardProps) {
  const getPositionIcon = (position: "first" | "second" | "third") => {
    switch (position) {
      case "first":
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case "second":
        return <Medal className="h-5 w-5 text-gray-400" />
      case "third":
        return <Award className="h-5 w-5 text-amber-600" />
    }
  }

  const getPositionColor = (position: "first" | "second" | "third") => {
    switch (position) {
      case "first":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      case "second":
        return "bg-gray-50 border-gray-200 text-gray-800"
      case "third":
        return "bg-amber-50 border-amber-200 text-amber-800"
    }
  }

  const getTeamColor = (team: string) => {
    switch (team.toLowerCase()) {
      case "fulful":
        return "bg-blue-100 text-blue-800"
      case "kafur":
        return "bg-green-100 text-green-800"
      case "zanjabeel":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {result.programmeName}
              <Badge variant="outline" className={result.type === "arts" ? "text-purple-600" : "text-blue-600"}>
                {result.type === "arts" ? "Arts" : "Sports"}
              </Badge>
            </CardTitle>
            <CardDescription className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {result.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {result.venue}
              </span>
            </CardDescription>
          </div>
          <Badge variant="secondary">{result.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Results */}
        <div className="space-y-3">
          {Object.entries(result.positions).map(([position, data]) => (
            <div
              key={position}
              className={`flex items-center justify-between p-3 rounded-lg border ${getPositionColor(position as "first" | "second" | "third")}`}
            >
              <div className="flex items-center gap-3">
                {getPositionIcon(position as "first" | "second" | "third")}
                <div>
                  <p className="font-medium">{data.participant}</p>
                  <Badge variant="outline" className={`text-xs ${getTeamColor(data.team)}`}>
                    {data.team.charAt(0).toUpperCase() + data.team.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{data.points} pts</p>
                <p className="text-xs capitalize">{position} Place</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground pt-2 border-t">
          Published on {new Date(result.publishedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  )
}
