import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function WelcomeCard() {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-col items-start gap-4 p-5 md:flex-row md:items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">Welcome, Jai Singhania.</h2>
          <p className="text-muted-foreground">
            Explore monomers, polymer classes, papers & patents for next-gen materials.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/settings?tab=research-defaults#research-defaults">
              <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Manage Keywords</Badge>
            </Link>
            <Badge variant="secondary" className="cursor-pointer hover:bg-muted">High Tg</Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-muted">BOPET ecosystem</Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-muted">Bio-derived monomers</Badge>
          </div>
        </div>
        <Button variant="link" asChild>
          <Link href="#">Customize dashboard</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
