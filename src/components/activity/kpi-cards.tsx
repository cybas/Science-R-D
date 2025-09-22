import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts"

const kpiData = [
  { name: "Items Saved", value: 42, change: 18, changeType: "increase", data: [{ value: 10 }, { value: 20 }, { value: 15 }, { value: 30 }, { value: 25 }, { value: 42 }] },
  { name: "Ask-AI Sessions", value: 61, change: 12, changeType: "increase", data: [{ value: 20 }, { value: 22 }, { value: 35 }, { value: 40 }, { value: 55 }, { value: 61 }] },
  { name: "Basket Adds", value: 25, change: 9, changeType: "increase", data: [{ value: 5 }, { value: 10 }, { value: 8 }, { value: 15 }, { value: 20 }, { value: 25 }] },
  { name: "Hypotheses Created", value: 6, change: 50, changeType: "increase", data: [{ value: 1 }, { value: 2 }, { value: 1 }, { value: 3 }, { value: 4 }, { value: 6 }] },
  { name: "Comparisons Run", value: 11, change: 8, changeType: "increase", data: [{ value: 2 }, { value: 4 }, { value: 3 }, { value: 7 }, { value: 9 }, { value: 11 }] },
  { name: "External Reads", value: 73, change: 21, changeType: "increase", data: [{ value: 30 }, { value: 40 }, { value: 35 }, { value: 50 }, { value: 65 }, { value: 73 }] },
]

export function KpiCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpiData.map((kpi) => (
        <Card key={kpi.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                    {kpi.changeType === "increase" ? <ArrowUpRight className="h-4 w-4 text-green-500" /> : <ArrowDownRight className="h-4 w-4 text-red-500" />}
                    {kpi.change}% vs previous
                    </p>
                </div>
                <div className="h-12 w-24">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={kpi.data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                            <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
