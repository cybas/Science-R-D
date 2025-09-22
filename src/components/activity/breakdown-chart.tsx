import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts"

const chartData = [
  { name: 'Molecules', value: 18, color: "hsl(var(--chart-1))" },
  { name: 'Polymers', value: 10, color: "hsl(var(--chart-2))" },
  { name: 'Papers', value: 9, color: "hsl(var(--chart-3))" },
  { name: 'Patents', value: 5, color: "hsl(var(--chart-4))" },
  { name: 'Hypotheses', value: 6, color: "hsl(var(--chart-5))" },
]

const chartConfig = {
    molecules: { label: "Molecules", color: "hsl(var(--chart-1))" },
    polymers: { label: "Polymers", color: "hsl(var(--chart-2))" },
    papers: { label: "Papers", color: "hsl(var(--chart-3))" },
    patents: { label: "Patents", color: "hsl(var(--chart-4))" },
    hypotheses: { label: "Hypotheses", color: "hsl(var(--chart-5))" },
}

export function BreakdownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Breakdown by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer>
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
