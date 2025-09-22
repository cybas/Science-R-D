import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function MainFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-96 items-center justify-center rounded-md border-2 border-dashed">
          <p className="text-muted-foreground">Main feed content will be displayed here.</p>
        </div>
      </CardContent>
    </Card>
  )
}
