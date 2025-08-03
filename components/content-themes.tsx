"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Lightbulb, Users, Briefcase } from "lucide-react"

export function ContentThemes() {
  const themes = [
    {
      name: "Industry Insights",
      icon: TrendingUp,
      posts: 24,
      engagement: 85,
      color: "bg-blue-100 text-blue-800",
      description: "Share trends and analysis about your industry",
    },
    {
      name: "Professional Tips",
      icon: Lightbulb,
      posts: 18,
      engagement: 92,
      color: "bg-yellow-100 text-yellow-800",
      description: "Actionable advice and best practices",
    },
    {
      name: "Team & Leadership",
      icon: Users,
      posts: 12,
      engagement: 78,
      color: "bg-green-100 text-green-800",
      description: "Leadership insights and team management",
    },
    {
      name: "Career Growth",
      icon: Briefcase,
      posts: 15,
      engagement: 88,
      color: "bg-purple-100 text-purple-800",
      description: "Career development and professional growth",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Themes Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {themes.map((theme, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${theme.color}`}>
                  <theme.icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">{theme.name}</h4>
                  <p className="text-xs text-muted-foreground">{theme.description}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary">{theme.posts} posts</Badge>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Engagement Rate</span>
                <span className="font-medium">{theme.engagement}%</span>
              </div>
              <Progress value={theme.engagement} className="h-2" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
