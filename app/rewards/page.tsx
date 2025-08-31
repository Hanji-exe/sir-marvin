"use client"

import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeDisplay } from "@/components/badge-display"
import { Leaderboard } from "@/components/leaderboard"
import { Progress } from "@/components/ui/progress"
import { MOCK_BADGES, MOCK_LEADERBOARD } from "@/types/rewards"
import { Trophy, Target, Flame, Star } from "lucide-react"

export default function RewardsPage() {
  const unlockedBadges = MOCK_BADGES.filter((badge) => badge.unlockedAt)
  const lockedBadges = MOCK_BADGES.filter((badge) => !badge.unlockedAt)
  const totalBadges = MOCK_BADGES.length
  const completionRate = (unlockedBadges.length / totalBadges) * 100

  // Mock user stats
  const userStats = {
    totalPoints: 1890,
    currentStreak: 12,
    longestStreak: 18,
    badgesEarned: unlockedBadges.length,
    rank: 23,
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Rewards & Achievements</h1>
          <p className="text-muted-foreground">
            Earn badges, climb the leaderboard, and unlock rewards for maintaining healthy spending habits.
          </p>
        </div>

        {/* User Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Points</p>
                  <p className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</p>
                </div>
                <Star className="h-8 w-8 text-chart-4" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold">{userStats.currentStreak} days</p>
                </div>
                <Flame className="h-8 w-8 text-chart-5" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Badges Earned</p>
                  <p className="text-2xl font-bold">
                    {userStats.badgesEarned}/{totalBadges}
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-chart-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Leaderboard Rank</p>
                  <p className="text-2xl font-bold">#{userStats.rank}</p>
                </div>
                <Target className="h-8 w-8 text-chart-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Achievement Progress</CardTitle>
            <CardDescription>Your journey towards collecting all badges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-sm text-muted-foreground">{completionRate.toFixed(0)}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {unlockedBadges.length} of {totalBadges} badges unlocked. Keep tracking expenses to earn more!
            </p>
          </CardContent>
        </Card>

        {/* Badges Section */}
        <div className="space-y-6">
          {/* Unlocked Badges */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Badges ({unlockedBadges.length})</h2>
            {unlockedBadges.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {unlockedBadges.map((badge) => (
                  <BadgeDisplay key={badge.id} badge={badge} showProgress={false} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No badges yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Start tracking your expenses to earn your first badge!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Locked Badges */}
          {lockedBadges.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Available Badges ({lockedBadges.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {lockedBadges.map((badge) => (
                  <BadgeDisplay key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Leaderboard */}
        <Leaderboard users={MOCK_LEADERBOARD} currentUserId="4" />

        {/* Rewards Info */}
        <Card>
          <CardHeader>
            <CardTitle>How to Earn Rewards</CardTitle>
            <CardDescription>Tips to maximize your points and unlock more badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Daily Actions</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                    Track expenses daily (+10 points)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                    Stay within budget (+25 points)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                    Add income entries (+5 points)
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Achievements</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
                    Maintain streaks (+50-200 points)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
                    Reach savings goals (+100-500 points)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
                    Complete challenges (+75-300 points)
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
