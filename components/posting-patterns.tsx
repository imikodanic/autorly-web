"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, TrendingUp } from "lucide-react"

export function PostingPatterns() {
  const bestTimes = [
    { day: "Monday", time: "9:00 AM", engagement: "High" },
    { day: "Tuesday", time: "2:00 PM", engagement: "Medium" },
    { day: "Wednesday", time: "11:00 AM", engagement: "High" },
    { day: "Thursday", time: "3:00 PM", engagement: "High" },
    { day: "Friday", time: "10:00 AM", engagement: "Medium" },
  ]

  const frequency = {
    current: "3-4 posts/week",
    recommended: "4-5 posts/week",
    optimal: "Tuesday, Wednesday, Thursday",
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Optimal Posting Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bestTimes.map((time, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{time.day}</div>
                    <div className="text-sm text-muted-foreground">{time.time}</div>
                  </div>
                </div>
                <Badge
                  variant={time.engagement === "High" ? "default" : "secondary"}
                  className={time.engagement === "High" ? "bg-green-600" : ""}
                >
                  {time.engagement}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Posting Frequency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{frequency.current}</div>
              <div className="text-sm text-muted-foreground">Current</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{frequency.recommended}</div>
              <div className="text-sm text-green-600">Recommended</div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Best Days to Post</h4>
            <p className="text-sm text-blue-700">{frequency.optimal}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
