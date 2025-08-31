"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, TrendingDown } from "lucide-react"

// Mock data for spending heatmap - represents daily spending vs budget goals
const generateHeatmapData = () => {
  const data: Array<{
    date: string;
    spending: number;
    budgetGoal: number;
    status: "under" | "goal" | "over";
    dayOfWeek: number;
  }> = []
  const today = new Date()
  const startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1) // Last 3 months

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    // Mock spending data - higher spending on weekends, random variation
    const baseSpending = isWeekend ? 80 : 45
    const variation = Math.random() * 40 - 20
    const spending = Math.max(0, baseSpending + variation)

    // Daily budget goal
    const budgetGoal = 60

    // Determine status based on spending vs goal
    let status: "under" | "goal" | "over"
    if (spending <= budgetGoal * 0.8) status = "under"
    else if (spending <= budgetGoal) status = "goal"
    else status = "over"

    data.push({
      date: new Date(d).toISOString().split("T")[0],
      spending: Math.round(spending),
      budgetGoal,
      status,
      dayOfWeek: d.getDay(),
    })
  }

  return data
}

export function SpendingHeatmap() {
  const heatmapData = generateHeatmapData()

  // Group data by weeks for display
  type HeatmapDay = {
    date: string;
    spending: number;
    budgetGoal: number;
    status: "under" | "goal" | "over";
    dayOfWeek: number;
  };
  
  const weeks: HeatmapDay[][] = []
  let currentWeek: HeatmapDay[] = []

  heatmapData.forEach((day, index) => {
    currentWeek.push(day)

    if (day.dayOfWeek === 6 || index === heatmapData.length - 1) {
      // Saturday or last day
      weeks.push([...currentWeek])
      currentWeek = []
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "under":
        return "bg-chart-3/30 border-chart-3/50" // Light green
      case "goal":
        return "bg-chart-3 border-chart-3" // Green
      case "over":
        return "bg-destructive border-destructive" // Red
      default:
        return "bg-muted border-border"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "under":
        return "Under budget"
      case "goal":
        return "On target"
      case "over":
        return "Over budget"
      default:
        return "No data"
    }
  }

  // Calculate summary stats
  const totalDays = heatmapData.length
  const onTargetDays = heatmapData.filter((d) => d.status === "goal" || d.status === "under").length
  const overBudgetDays = heatmapData.filter((d) => d.status === "over").length
  const successRate = Math.round((onTargetDays / totalDays) * 100)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Spending Heatmap
            </CardTitle>
            <CardDescription>Daily spending vs budget goals over the last 3 months</CardDescription>
          </div>
          <Badge variant={successRate >= 70 ? "secondary" : "destructive"}>{successRate}% Success Rate</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Heatmap Grid */}
        <div className="space-y-2">
          {/* Day labels */}
          <div className="grid grid-cols-8 gap-1 text-xs text-muted-foreground mb-2">
            <div></div> {/* Empty cell for week start */}
            <div className="text-center">Sun</div>
            <div className="text-center">Mon</div>
            <div className="text-center">Tue</div>
            <div className="text-center">Wed</div>
            <div className="text-center">Thu</div>
            <div className="text-center">Fri</div>
            <div className="text-center">Sat</div>
          </div>

          {/* Heatmap rows */}
          <div className="space-y-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-8 gap-1">
                {/* Week label */}
                <div className="text-xs text-muted-foreground flex items-center">W{weekIndex + 1}</div>

                {/* Fill empty cells at start of week */}
                {week[0] &&
                  Array.from({ length: week[0].dayOfWeek }, (_, i) => (
                    <div key={`empty-${i}`} className="w-4 h-4"></div>
                  ))}

                {/* Day cells */}
                {week.map((day) => (
                  <div
                    key={day.date}
                    className={`w-4 h-4 rounded-sm border cursor-pointer transition-all hover:scale-110 ${getStatusColor(day.status)}`}
                    title={`${day.date}: $${day.spending} (${getStatusText(day.status)})`}
                  />
                ))}

                {/* Fill empty cells at end of week */}
                {week[week.length - 1] &&
                  Array.from({ length: 6 - week[week.length - 1].dayOfWeek }, (_, i) => (
                    <div key={`empty-end-${i}`} className="w-4 h-4"></div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-chart-3/30 border border-chart-3/50"></div>
              <span>Under budget</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-chart-3 border border-chart-3"></div>
              <span>On target</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-destructive border border-destructive"></div>
              <span>Over budget</span>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-chart-3" />
            <div>
              <p className="text-sm font-medium">{onTargetDays} days on track</p>
              <p className="text-xs text-muted-foreground">Out of {totalDays} days</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-destructive" />
            <div>
              <p className="text-sm font-medium">{overBudgetDays} days over budget</p>
              <p className="text-xs text-muted-foreground">Need improvement</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
