// Types for rewards and gamification system
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  badge: Badge
  completed: boolean
  completedAt?: string
  progress: number
  maxProgress: number
}

export interface LeaderboardUser {
  id: string
  username: string
  avatar: string
  score: number
  rank: number
  badges: number
  streak: number
}

// Mock badges data
export const MOCK_BADGES: Badge[] = [
  {
    id: "first-expense",
    name: "First Steps",
    description: "Added your first expense",
    icon: "🎯",
    rarity: "common",
    unlockedAt: "2024-01-15",
  },
  {
    id: "budget-keeper",
    name: "Budget Keeper",
    description: "Stayed within budget for 7 days",
    icon: "💰",
    rarity: "rare",
    unlockedAt: "2024-01-20",
  },
  {
    id: "savings-master",
    name: "Savings Master",
    description: "Saved $1000 in a month",
    icon: "💎",
    rarity: "epic",
    unlockedAt: "2024-01-25",
  },
  {
    id: "streak-legend",
    name: "Streak Legend",
    description: "30-day expense tracking streak",
    icon: "🔥",
    rarity: "legendary",
    progress: 23,
    maxProgress: 30,
  },
  {
    id: "category-master",
    name: "Category Master",
    description: "Used all expense categories",
    icon: "📊",
    rarity: "rare",
    progress: 6,
    maxProgress: 8,
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Added expenses before 9 AM for 5 days",
    icon: "🌅",
    rarity: "common",
    unlockedAt: "2024-01-18",
  },
]

// Mock leaderboard data
export const MOCK_LEADERBOARD: LeaderboardUser[] = [
  {
    id: "1",
    username: "CryptoSaver",
    avatar: "/crypto-avatar.png",
    score: 2850,
    rank: 1,
    badges: 12,
    streak: 45,
  },
  {
    id: "2",
    username: "BudgetNinja",
    avatar: "/ninja-avatar.png",
    score: 2720,
    rank: 2,
    badges: 10,
    streak: 32,
  },
  {
    id: "3",
    username: "FinanceGuru",
    avatar: "/guru-avatar.png",
    score: 2650,
    rank: 3,
    badges: 11,
    streak: 28,
  },
  {
    id: "4",
    username: "You",
    avatar: "/diverse-user-avatars.png",
    score: 1890,
    rank: 23,
    badges: 6,
    streak: 12,
  },
  {
    id: "5",
    username: "MoneyWise",
    avatar: "/wise-avatar.png",
    score: 1750,
    rank: 28,
    badges: 8,
    streak: 15,
  },
]
