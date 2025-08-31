import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { TrendingUp, Target, Award, DollarSign, PieChart, Users } from "lucide-react"

export default function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground text-balance">Welcome to Budget Monitor</h1>
          <p className="text-muted-foreground text-pretty">
            Track your expenses, monitor your budget, and earn rewards with blockchain technology.
          </p>
        </div>

        {/* Wallet Connection Section */}
        <ConnectWalletButton />

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold">$1,234.56</p>
                </div>
                <DollarSign className="h-8 w-8 text-chart-1" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Budget Used</p>
                  <p className="text-2xl font-bold">67%</p>
                </div>
                <PieChart className="h-8 w-8 text-chart-2" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Badges Earned</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Award className="h-8 w-8 text-chart-4" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Leaderboard Rank</p>
                  <p className="text-2xl font-bold">#23</p>
                </div>
                <Users className="h-8 w-8 text-chart-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-10 h-10 bg-chart-1/10 rounded-lg flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-chart-1" />
              </div>
              <CardTitle className="text-lg">Expense Tracking</CardTitle>
              <CardDescription>Monitor your daily expenses with detailed categorization and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Add expenses quickly, categorize them automatically, and get real-time insights into your spending
                patterns.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-10 h-10 bg-chart-3/10 rounded-lg flex items-center justify-center mb-2">
                <Target className="h-5 w-5 text-chart-3" />
              </div>
              <CardTitle className="text-lg">Budget Goals</CardTitle>
              <CardDescription>Set and achieve your financial goals with visual progress tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create custom budget goals, track your progress with interactive charts, and stay motivated with
                achievements.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-10 h-10 bg-chart-4/10 rounded-lg flex items-center justify-center mb-2">
                <Award className="h-5 w-5 text-chart-4" />
              </div>
              <CardTitle className="text-lg">Earn Rewards</CardTitle>
              <CardDescription>Get NFT badges and climb leaderboards for achieving your budget goals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Unlock exclusive NFT badges, compete with friends, and earn rewards for maintaining healthy spending
                habits.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started Section */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Follow these simple steps to begin your budget monitoring journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Connect Your Wallet</h4>
                  <p className="text-sm text-muted-foreground">
                    Link your Web3 wallet to enable blockchain features and secure data storage
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Add Your First Expense</h4>
                  <p className="text-sm text-muted-foreground">
                    Start tracking by adding your daily expenses with categories and amounts
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Set Budget Goals</h4>
                  <p className="text-sm text-muted-foreground">
                    Define your spending limits, savings targets, and watch your progress grow
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
