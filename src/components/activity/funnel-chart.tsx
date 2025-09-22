import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import {
  FunnelChart as RechartsFunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const chartData = [
  { name: 'Views', value: 320, fill: "var(--color-views)" },
  { name: 'Save/Add', value: 120, fill: "var(--color-saves)" },
  { name: 'Compare', value: 30, fill: "var(--color-compares)" },
  { name: 'Hypothesis', value: 6, fill: "var(--color-hypotheses)" },
  { name: 'Export', value: 4, fill: "var(--color-exports)" },
]

const chartConfig = {
  views: { label: "Views", color: "hsl(var(--chart-1))" },
  saves: { label: "Saves/Adds", color: "hsl(var(--chart-2))" },
  compares: { label: "Compares", color: "hsl(var(--chart-3))" },
  hypotheses: { label: "Hypotheses", color: "hsl(var(--chart-4))" },
  exports: { label: "Exports", color: "hsl(var(--chart-5))" },
}

export function FunnelChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer>
            <RechartsFunnelChart>
              <Tooltip />
              <Funnel dataKey="value" data={chartData} isAnimationActive>
                <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
              </Funnel>
            </RechartsFunnelChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
