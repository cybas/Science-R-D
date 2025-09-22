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
} from "recharts"

const chartData = [
  { source: 'PubChem', value: 20 },
  { source: 'PoLyInfo', value: 11 },
  { source: 'OpenAlex', value: 9 },
  { source: 'Lens', value: 7 },
  { source: 'Company RSS', value: 4 },
]

const chartConfig = {
  value: {
    label: "Items",
    color: "hsl(var(--chart-2))",
  },
}

export function TopSourcesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis
                dataKey="source"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
