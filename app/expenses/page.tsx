"use client"

import { MainLayout } from "@/components/main-layout"
import { ExpenseForm } from "@/components/expense-form"
import { ExpenseList } from "@/components/expense-list"
import { Card, CardContent } from "@/components/ui/card"
import { useExpenses } from "@/hooks/use-expenses"
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react"

export default function ExpensesPage() {
  const { expenses, addExpense, deleteExpense, getTotalByType } = useExpenses()

  const totalExpenses = getTotalByType("expense")
  const totalIncome = getTotalByType("income")
  const netBalance = totalIncome - totalExpenses

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Expense Tracking</h1>
          <p className="text-muted-foreground">
            Add and manage your expenses and income to monitor your budget effectively.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold text-chart-3">+${totalIncome.toFixed(2)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-chart-3" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-destructive">-${totalExpenses.toFixed(2)}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-destructive" />
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
                </div>
                <DollarSign className="h-8 w-8 text-chart-1" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                  <p className="text-2xl font-bold">{expenses.length}</p>
                </div>
                <Target className="h-8 w-8 text-chart-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expense Form */}
          <ExpenseForm onAddExpense={addExpense} />

          {/* Expense List */}
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
        </div>
      </div>
    </MainLayout>
  )
}
