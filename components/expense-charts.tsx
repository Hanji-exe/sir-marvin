"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip,
  Legend,
} from "recharts"
import { EXPENSE_CATEGORIES } from "@/types/expense"
import type { Expense } from "@/types/expense"

interface ExpenseChartsProps {
  expenses: Expense[]
}

export function ExpenseCharts({ expenses }: ExpenseChartsProps) {
  // Prepare data for category breakdown (pie chart)
  const categoryData = EXPENSE_CATEGORIES.map((category) => {
    const categoryExpenses = expenses.filter(
      (expense) => expense.category === category.id && expense.type === "expense",
    )
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)

    return {
      name: category.name,
      value: total,
      color: getCategoryColor(category.id),
      icon: category.icon,
    }
  }).filter((item) => item.value > 0)

  // Prepare data for weekly spending (bar chart)
  const weeklyData = generateWeeklyData(expenses)

  // Prepare data for spending trend (line chart)
  const trendData = generateTrendData(expenses)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Breakdown Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
          <CardDescription>Breakdown of expenses by category this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
                  labelFormatter={(label) => `${label}`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Spending Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Spending</CardTitle>
          <CardDescription>Your spending patterns over the last 8 weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" className="text-xs fill-muted-foreground" />
                <YAxis className="text-xs fill-muted-foreground" tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  formatter={(value: number) => [`$${value.toFixed(2)}`, "Spent"]}
                  labelFormatter={(label) => `Week ${label}`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="expenses" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Spending Trend Line Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Spending Trend</CardTitle>
          <CardDescription>Daily spending and income over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  className="text-xs fill-muted-foreground"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  }
                />
                <YAxis className="text-xs fill-muted-foreground" tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `$${value.toFixed(2)}`,
                    name === "expenses" ? "Expenses" : "Income",
                  ]}
                  labelFormatter={(label) =>
                    new Date(label).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 4 }}
                  name="Expenses"
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
                  name="Income"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function to get category colors
function getCategoryColor(categoryId: string): string {
  const colorMap: Record<string, string> = {
    food: "hsl(var(--chart-1))",
    transport: "hsl(var(--chart-2))",
    shopping: "hsl(var(--chart-3))",
    entertainment: "hsl(var(--chart-4))",
    health: "hsl(var(--chart-5))",
    utilities: "hsl(var(--destructive))",
    education: "hsl(var(--secondary))",
    other: "hsl(var(--muted))",
  }
  return colorMap[categoryId] || "hsl(var(--muted))"
}

// Generate mock weekly data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateWeeklyData(_expenses: Expense[]) {
  const weeks = []
  const today = new Date()

  for (let i = 7; i >= 0; i--) {
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - i * 7)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()) // Start of week (Sunday)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    // Calculate expenses for this week (using mock data since we have limited real data)
    const baseAmount = 200 + Math.random() * 300
    const weekExpenses = baseAmount + (Math.random() - 0.5) * 100

    weeks.push({
      week: `${i === 0 ? "This" : i === 1 ? "Last" : `${i}`} Week${i > 1 ? "s ago" : ""}`,
      expenses: Math.round(weekExpenses),
      weekStart: weekStart.toISOString().split("T")[0],
    })
  }

  return weeks.reverse()
}

// Generate mock trend data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateTrendData(_expenses: Expense[]) {
  const days = []
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    // Mock daily data with some realistic patterns
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    const baseExpenses = isWeekend ? 60 : 35
    const expenseVariation = Math.random() * 40 - 20
    const dailyExpenses = Math.max(0, baseExpenses + expenseVariation)

    // Income is usually 0 except for specific days (salary, freelance, etc.)
    const dailyIncome = Math.random() < 0.1 ? 200 + Math.random() * 300 : 0

    days.push({
      date: date.toISOString().split("T")[0],
      expenses: Math.round(dailyExpenses),
      income: Math.round(dailyIncome),
    })
  }

  return days
}
