"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Flame } from "lucide-react"
import type { LeaderboardUser } from "@/types/rewards"

interface LeaderboardProps {
  users: LeaderboardUser[]
  currentUserId?: string
}

export function Leaderboard({ users, currentUserId }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-chart-4" />
      case 2:
        return <Medal className="h-5 w-5 text-muted-foreground" />
      case 3:
        return <Award className="h-5 w-5 text-chart-5" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-chart-4/10 border-chart-4/20"
      case 2:
        return "bg-muted/50 border-muted"
      case 3:
        return "bg-chart-5/10 border-chart-5/20"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-chart-4" />
          Leaderboard
        </CardTitle>
        <CardDescription>Top performers in budget management and savings goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {users.map((user) => {
            const isCurrentUser = user.id === currentUserId
            return (
              <div
                key={user.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  isCurrentUser ? "bg-primary/5 border-primary/20" : getRankColor(user.rank)
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-8">{getRankIcon(user.rank)}</div>

                  {/* User Info */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{user.username}</h4>
                        {isCurrentUser && (
                          <Badge variant="secondary" className="text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          {user.badges} badges
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="h-3 w-3" />
                          {user.streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <p className="text-lg font-bold">{user.score.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Current User Highlight */}
        {currentUserId && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium">Your Current Rank</p>
              <p className="text-2xl font-bold text-primary">#{users.find((u) => u.id === currentUserId)?.rank}</p>
              <p className="text-xs text-muted-foreground">Keep tracking expenses to climb the leaderboard!</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
