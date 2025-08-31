"use client"

import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BadgeDisplay } from "@/components/badge-display"
import { Progress } from "@/components/ui/progress"
import { useWallet } from "@/components/connect-wallet-button"
import { MOCK_BADGES } from "@/types/rewards"
import { Calendar, Trophy, TrendingUp, Settings, Wallet, Edit } from "lucide-react"

export default function ProfilePage() {
  const { isConnected, address, balance } = useWallet()
  const unlockedBadges = MOCK_BADGES.filter((badge) => badge.unlockedAt)

  // Mock user profile data
  const userProfile = {
    username: "BudgetTracker",
    email: "user@example.com",
    joinedDate: "2024-01-01",
    totalExpenses: 1234.56,
    totalIncome: 2500.0,
    savingsRate: 50.6,
    currentStreak: 12,
    longestStreak: 18,
    totalTransactions: 45,
    favoriteCategory: "Food & Dining",
  }

  const achievements = [
    { name: "Budget Master", description: "Stayed within budget for 30 days", progress: 23, max: 30 },
    { name: "Category Explorer", description: "Used all expense categories", progress: 6, max: 8 },
    { name: "Early Bird", description: "Added expenses before 9 AM", progress: 5, max: 5, completed: true },
  ]

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and view your financial journey.</p>
        </div>

        {/* Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src="/user-profile-illustration.png" alt="Profile" />
                <AvatarFallback className="text-2xl">{userProfile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle>{userProfile.username}</CardTitle>
              <CardDescription>{userProfile.email}</CardDescription>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(userProfile.joinedDate).toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full bg-transparent">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                      <p className="text-2xl font-bold">${userProfile.totalExpenses.toFixed(2)}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Savings Rate</p>
                      <p className="text-2xl font-bold">{userProfile.savingsRate}%</p>
                    </div>
                    <Trophy className="h-8 w-8 text-chart-3" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                      <p className="text-2xl font-bold">{userProfile.currentStreak} days</p>
                    </div>
                    <div className="text-2xl">🔥</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                      <p className="text-2xl font-bold">{userProfile.totalTransactions}</p>
                    </div>
                    <div className="text-2xl">📊</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Wallet Connection Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Wallet Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isConnected ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                        Connected
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Address:</span>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Balance:</span>
                      <span className="text-sm font-mono">{balance} ETH</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-3">No wallet connected</p>
                    <Button size="sm">Connect Wallet</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Badges ({unlockedBadges.length})</CardTitle>
            <CardDescription>Your latest achievements and unlocked rewards</CardDescription>
          </CardHeader>
          <CardContent>
            {unlockedBadges.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {unlockedBadges.slice(0, 6).map((badge) => (
                  <BadgeDisplay key={badge.id} badge={badge} size="sm" showProgress={false} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No badges earned yet. Start tracking expenses!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievement Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Achievement Progress</CardTitle>
            <CardDescription>Track your progress towards unlocking new badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.completed ? (
                      <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                        Completed
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {achievement.progress}/{achievement.max}
                      </span>
                    )}
                  </div>
                  <Progress value={(achievement.progress / achievement.max) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
            <CardDescription>Your financial tracking habits and patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-medium">Most Active Day</h4>
                <p className="text-sm text-muted-foreground">Monday</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🍽️</div>
                <h4 className="font-medium">Top Category</h4>
                <p className="text-sm text-muted-foreground">{userProfile.favoriteCategory}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⏰</div>
                <h4 className="font-medium">Avg. Entry Time</h4>
                <p className="text-sm text-muted-foreground">2:30 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
