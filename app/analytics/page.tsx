"use client"

import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SpendingHeatmap } from "@/components/spending-heatmap"
import { ExpenseCharts } from "@/components/expense-charts"
import { useExpenses } from "@/hooks/use-expenses"
import { TrendingUp, TrendingDown, Target, Calendar, DollarSign, PieChart } from "lucide-react"

export default function AnalyticsPage() {
  const { expenses, getTotalByType, getExpensesByCategory } = useExpenses()

  const totalExpenses = getTotalByType("expense")
  const totalIncome = getTotalByType("income")
  const netBalance = totalIncome - totalExpenses
  const categoryBreakdown = getExpensesByCategory()

  // Calculate some analytics
  const avgDailySpending = totalExpenses / 30 // Assuming 30 days
  const budgetGoal = 2000 // Mock budget goal
  const budgetUsed = (totalExpenses / budgetGoal) * 100
  const topCategory = Object.entries(categoryBreakdown).sort(([, a], [, b]) => b - a)[0]

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Visualize your spending patterns, track budget goals, and gain insights into your financial habits.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Budget Used</p>
                  <p className="text-2xl font-bold">{budgetUsed.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">
                    ${totalExpenses.toFixed(2)} of ${budgetGoal}
                  </p>
                </div>
                <Target className={`h-8 w-8 ${budgetUsed > 80 ? "text-destructive" : "text-chart-3"}`} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Daily Spending</p>
                  <p className="text-2xl font-bold">${avgDailySpending.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </div>
                <Calendar className="h-8 w-8 text-chart-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Net Balance</p>
                  <p className={`text-2xl font-bold ${netBalance >= 0 ? "text-chart-3" : "text-destructive"}`}>
                    {netBalance >= 0 ? "+" : ""}${netBalance.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">Income - Expenses</p>
                </div>
                {netBalance >= 0 ? (
                  <TrendingUp className="h-8 w-8 text-chart-3" />
                ) : (
                  <TrendingDown className="h-8 w-8 text-destructive" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Top Category</p>
                  <p className="text-2xl font-bold">${topCategory?.[1]?.toFixed(2) || "0.00"}</p>
                  <p className="text-xs text-muted-foreground capitalize">{topCategory?.[0] || "None"}</p>
                </div>
                <PieChart className="h-8 w-8 text-chart-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spending Heatmap */}
        <SpendingHeatmap />

        {/* Charts Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Spending Analysis</h2>
            <p className="text-muted-foreground">Detailed breakdown of your expenses and trends</p>
          </div>
          <ExpenseCharts expenses={expenses} />
        </div>

        {/* Insights Section */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Insights</CardTitle>
            <CardDescription>AI-powered insights based on your spending patterns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-chart-3/10 rounded-lg border border-chart-3/20">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-chart-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-chart-3">Great Progress!</h4>
                    <p className="text-sm text-muted-foreground">
                      You&apos;re {budgetUsed < 80 ? "staying within" : "close to"} your budget goal.
                      {budgetUsed < 80 ? " Keep up the good work!" : " Consider reducing discretionary spending."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-chart-1/10 rounded-lg border border-chart-1/20">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-chart-1 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-chart-1">Spending Pattern</h4>
                    <p className="text-sm text-muted-foreground">
                      Your highest spending category is {topCategory?.[0] || "unknown"}. Consider setting specific
                      limits for this category.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
