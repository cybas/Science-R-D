import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList
} from "recharts"

const chartData = [
  { keyword: 'PET', value: 19 },
  { keyword: 'Polyester', value: 12 },
  { keyword: 'Nanocomposites', value: 9 },
  { keyword: 'Bio-derived', value: 8 },
  { keyword: 'Depolymerization', value: 7 },
]

const chartConfig = {
  value: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
}

export function TopKeywordsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Keywords (7d)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer>
            <BarChart layout="vertical" data={chartData} margin={{ left: 10 }}>
              <XAxis type="number" hide />
              <YAxis
                dataKey="keyword"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={120}
              />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              <Bar dataKey="value" fill="var(--color-value)" radius={4}>
                 <LabelList dataKey="value" position="right" offset={8} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
