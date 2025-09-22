import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Workbench() {
  return (
    <Tabs defaultValue="workbench">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="workbench">Workbench</TabsTrigger>
        <TabsTrigger value="memory">Memory</TabsTrigger>
      </TabsList>
      <TabsContent value="workbench">
        <Card>
          <CardHeader>
            <CardTitle>Workbench</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-96 items-center justify-center rounded-md border-2 border-dashed">
              <p className="text-muted-foreground">Workbench items will appear here.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="memory">
        <Card>
          <CardHeader>
            <CardTitle>Memory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-96 items-center justify-center rounded-md border-2 border-dashed">
              <p className="text-muted-foreground">Saved items will appear here.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
