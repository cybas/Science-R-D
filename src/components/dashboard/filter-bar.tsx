import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function FilterBar() {
  return (
    <div className="sticky top-16 z-30 -mx-4 -mt-4 border-b bg-background/80 p-4 backdrop-blur-sm md:-mx-6 md:px-6">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-4">
          <Select defaultValue="7d">
            <SelectTrigger className="w-auto min-w-[150px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-auto min-w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="chemicals">Chemicals</SelectItem>
              <SelectItem value="polymers">Polymers</SelectItem>
              <SelectItem value="papers">Papers</SelectItem>
              <SelectItem value="patents">Patents</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-auto min-w-[150px]">
              <SelectValue placeholder="All Domains" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              <SelectItem value="scifinder">SciFinder</SelectItem>
              <SelectItem value="google_patents">Google Patents</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="w-full md:hidden">
          <div className="flex space-x-2 pb-2.5">
            <Badge>PET</Badge>
            <Badge>Polyester</Badge>
            <Badge>Nanocomposites</Badge>
            <Badge>PLA</Badge>
            <Badge>Adhesion</Badge>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        
        <div className="hidden md:flex md:items-center md:gap-2">
            <Badge>PET</Badge>
            <Badge>Polyester</Badge>
            <Badge>Nanocomposites</Badge>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="font-bold">Relevance</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">Newest</Button>
        </div>
      </div>
    </div>
  )
}
