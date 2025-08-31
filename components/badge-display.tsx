"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Badge as BadgeType } from "@/types/rewards"

interface BadgeDisplayProps {
  badge: BadgeType
  size?: "sm" | "md" | "lg"
  showProgress?: boolean
}

export function BadgeDisplay({ badge, size = "md", showProgress = true }: BadgeDisplayProps) {
  const isUnlocked = !!badge.unlockedAt
  const hasProgress = badge.progress !== undefined && badge.maxProgress !== undefined

  const sizeClasses = {
    sm: "w-16 h-16 text-2xl",
    md: "w-20 h-20 text-3xl",
    lg: "w-24 h-24 text-4xl",
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-muted border-muted-foreground"
      case "rare":
        return "bg-chart-2/20 border-chart-2"
      case "epic":
        return "bg-chart-4/20 border-chart-4"
      case "legendary":
        return "bg-chart-5/20 border-chart-5"
      default:
        return "bg-muted border-muted-foreground"
    }
  }

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "secondary"
      case "rare":
        return "default"
      case "epic":
        return "secondary"
      case "legendary":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card className={`relative overflow-hidden ${isUnlocked ? "" : "opacity-60"}`}>
      <CardContent className="p-4 text-center space-y-3">
        {/* Badge Icon */}
        <div
          className={`mx-auto rounded-full border-2 flex items-center justify-center ${sizeClasses[size]} ${getRarityColor(badge.rarity)} ${
            isUnlocked ? "" : "grayscale"
          }`}
        >
          <span className={isUnlocked ? "" : "opacity-50"}>{badge.icon}</span>
        </div>

        {/* Badge Info */}
        <div className="space-y-1">
          <h3 className="font-semibold text-sm">{badge.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{badge.description}</p>
        </div>

        {/* Rarity Badge */}
        <Badge variant={getRarityBadgeColor(badge.rarity)} className="text-xs capitalize">
          {badge.rarity}
        </Badge>

        {/* Progress Bar */}
        {showProgress && hasProgress && !isUnlocked && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>
                {badge.progress}/{badge.maxProgress}
              </span>
            </div>
            <Progress value={(badge.progress! / badge.maxProgress!) * 100} className="h-2" />
          </div>
        )}

        {/* Unlocked Date */}
        {isUnlocked && badge.unlockedAt && (
          <p className="text-xs text-muted-foreground">Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}</p>
        )}

        {/* Locked Overlay */}
        {!isUnlocked && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center">🔒</div>
              <p className="text-xs font-medium">Locked</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
