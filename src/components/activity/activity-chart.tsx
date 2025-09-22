import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"

const chartData = [
  { date: 'Day 1', itemsSaved: 5, askAiSessions: 7 },
  { date: 'Day 2', itemsSaved: 6, askAiSessions: 9 },
  { date: 'Day 3', itemsSaved: 9, askAiSessions: 8 },
  { date: 'Day 4', itemsSaved: 7, askAiSessions: 12 },
  { date: 'Day 5', itemsSaved: 8, askAiSessions: 11 },
  { date: 'Day 6', itemsSaved: 10, askAiSessions: 7 },
  { date: 'Day 7', itemsSaved: 12, askAiSessions: 7 },
]

const chartConfig = {
  itemsSaved: {
    label: "Items Saved",
    color: "hsl(var(--chart-1))",
  },
  askAiSessions: {
    label: "Ask-AI Sessions",
    color: "hsl(var(--chart-2))",
  },
}

export function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Over Time</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line dataKey="itemsSaved" type="monotone" stroke="var(--color-itemsSaved)" strokeWidth={2} dot={false} />
              <Line dataKey="askAiSessions" type="monotone" stroke="var(--color-askAiSessions)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
