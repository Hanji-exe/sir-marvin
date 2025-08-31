"use client"

import * as React from "react"
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Bar,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts"
import { cn } from "@/lib/utils"

type ChartConfig = Record<
  string,
  {
    label?: string
    icon?: React.ComponentType
  }
>

const ChartContext = React.createContext<{ config: ChartConfig }>({ config: {} })

export function Chart({
  data,
  config,
  children,
}: {
  data: any[]
  config: ChartConfig
  children: React.ReactNode
}) {
  return (
    <ChartContext.Provider value={{ config }}>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>{children}</ComposedChart>
      </ResponsiveContainer>
    </ChartContext.Provider>
  )
}

export function useChart() {
  return React.useContext(ChartContext)
}

// -------------------------
// ✅ Custom Tooltip Content
// -------------------------
type TooltipItem = {
  name: string
  value: number | string
  color?: string
}

type CustomChartTooltipProps = {
  active?: boolean
  className?: string
  indicator?: "line" | "dot" | "dashed"
  hideLabel?: boolean
  hideIndicator?: boolean
  title?: React.ReactNode
  items?: TooltipItem[]
}

export function ChartTooltipContent({
  active,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  title,
  items = [],
}: CustomChartTooltipProps) {
  const { config } = useChart()

  if (!active || items.length === 0) {
    return null
  }

  const nestLabel = items.length === 1 && indicator !== "dot"

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel && !hideLabel && title && (
        <div className="font-medium">{title}</div>
      )}

      <div className="grid gap-1.5">
        {items.map((item, index) => {
          const itemConfig = config[item.name]
          const indicatorColor = item.color ?? "hsl(var(--foreground))"

          return (
            <div
              key={index}
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              )}
            >
              {!hideIndicator && (
                <div
                  className={cn(
                    "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                    {
                      "h-2.5 w-2.5": indicator === "dot",
                      "w-1": indicator === "line",
                      "w-0 border-[1.5px] border-dashed bg-transparent":
                        indicator === "dashed",
                      "my-0.5": nestLabel && indicator === "dashed",
                    }
                  )}
                  style={{
                    "--color-bg": indicatorColor,
                    "--color-border": indicatorColor,
                  } as React.CSSProperties}
                />
              )}

              <div
                className={cn(
                  "flex flex-1 justify-between leading-none",
                  nestLabel ? "items-end" : "items-center"
                )}
              >
                <div className="grid gap-1.5">
                  {nestLabel && !hideLabel && title && (
                    <div className="font-medium">{title}</div>
                  )}
                  <span className="text-muted-foreground">
                    {itemConfig?.label ?? item.name}
                  </span>
                </div>
                <span className="text-foreground font-mono font-medium tabular-nums">
                  {typeof item.value === "number"
                    ? item.value.toLocaleString()
                    : item.value}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// -------------------------
// ✅ Custom Legend Content
// -------------------------
type LegendItem = {
  name: string
  color?: string
  value?: string
}

export function ChartLegendContent({
  items = [],
  className,
}: {
  items?: LegendItem[]
  className?: string
}) {
  const { config } = useChart()

  if (items.length === 0) return null

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {items.map((item, index) => {
        const itemConfig = config[item.name]
        return (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs">
              {itemConfig?.label ?? item.value ?? item.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// -------------------------
// ✅ Example Usage
// -------------------------
export function ExampleChart() {
  const data = [
    { month: "Jan", sales: 400, profit: 200 },
    { month: "Feb", sales: 300, profit: 150 },
    { month: "Mar", sales: 600, profit: 250 },
  ]

  const config: ChartConfig = {
    sales: { label: "Sales" },
    profit: { label: "Profit" },
  }

  return (
    <Chart data={data} config={config}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Bar dataKey="sales" fill="#0ea5e9" />
      <Line type="monotone" dataKey="profit" stroke="#22c55e" />

      <RechartsTooltip
        content={({ active }) => (
          <ChartTooltipContent
            active={active}
            title="Monthly Performance"
            items={data.map((d) => ({
              name: "sales",
              value: d.sales,
              color: "#0ea5e9",
            }))}
          />
        )}
      />

      <RechartsLegend
        content={() => (
          <ChartLegendContent
            items={[
              { name: "sales", color: "#0ea5e9" },
              { name: "profit", color: "#22c55e" },
            ]}
          />
        )}
      />
    </Chart>
  )
}
