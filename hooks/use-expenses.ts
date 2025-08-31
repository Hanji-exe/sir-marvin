"use client"

import { useState } from "react"
import type { Expense } from "@/types/expense"

// Mock initial expenses data
const INITIAL_EXPENSES: Expense[] = [
  {
    id: "1",
    amount: 45.5,
    category: "food",
    description: "Lunch at Italian restaurant",
    date: "2024-01-15",
    type: "expense",
  },
  {
    id: "2",
    amount: 12.99,
    category: "transport",
    description: "Uber ride to office",
    date: "2024-01-15",
    type: "expense",
  },
  {
    id: "3",
    amount: 89.99,
    category: "shopping",
    description: "New running shoes",
    date: "2024-01-14",
    type: "expense",
  },
  {
    id: "4",
    amount: 2500.0,
    category: "other",
    description: "Monthly salary",
    date: "2024-01-01",
    type: "income",
  },
  {
    id: "5",
    amount: 25.0,
    category: "entertainment",
    description: "Movie tickets",
    date: "2024-01-13",
    type: "expense",
  },
]

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES)

  // Add new expense
  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(), // Simple ID generation for demo
    }
    setExpenses((prev) => [newExpense, ...prev])
  }

  // Update existing expense
  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses((prev) => prev.map((expense) => (expense.id === id ? { ...expense, ...updates } : expense)))
  }

  // Delete expense
  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  // Get expenses by type
  const getExpensesByType = (type: "expense" | "income") => {
    return expenses.filter((expense) => expense.type === type)
  }

  // Get total amount by type
  const getTotalByType = (type: "expense" | "income") => {
    return expenses.filter((expense) => expense.type === type).reduce((total, expense) => total + expense.amount, 0)
  }

  // Get expenses by category
  const getExpensesByCategory = () => {
    const categoryTotals: Record<string, number> = {}
    expenses
      .filter((expense) => expense.type === "expense")
      .forEach((expense) => {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount
      })
    return categoryTotals
  }

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpensesByType,
    getTotalByType,
    getExpensesByCategory,
  }
}
