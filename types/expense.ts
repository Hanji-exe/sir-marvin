// Types for expense tracking system
export interface Expense {
  id: string
  amount: number
  category: string
  description: string
  date: string
  type: "expense" | "income"
}

export interface ExpenseCategory {
  id: string
  name: string
  icon: string
  color: string
}

// Predefined expense categories
export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { id: "food", name: "Food & Dining", icon: "🍽️", color: "bg-chart-1" },
  { id: "transport", name: "Transportation", icon: "🚗", color: "bg-chart-2" },
  { id: "shopping", name: "Shopping", icon: "🛍️", color: "bg-chart-3" },
  { id: "entertainment", name: "Entertainment", icon: "🎬", color: "bg-chart-4" },
  { id: "health", name: "Health & Fitness", icon: "🏥", color: "bg-chart-5" },
  { id: "utilities", name: "Bills & Utilities", icon: "⚡", color: "bg-destructive" },
  { id: "education", name: "Education", icon: "📚", color: "bg-secondary" },
  { id: "other", name: "Other", icon: "📦", color: "bg-muted" },
]
