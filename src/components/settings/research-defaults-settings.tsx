'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';

export function ResearchDefaultsSettings() {
  const router = useRouter();

  return (
    <Card className="rounded-xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Research Defaults</CardTitle>
        <CardDescription>
          Default keywords, tags, and taxonomy used across Dashboard, Molecules, Polymers, Papers, and Patents.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-5">
        <div className="space-y-2">
          <Label>Selected Keywords</Label>
          <div className="p-2 border rounded-md min-h-24">
            <div className="flex flex-wrap gap-1">
              {[
                'PET', 'PETG', 'PEF', 'PEN', 'BOPET', 'polyester', 'polycondensation', 'RAFT', 'ATRP', 'ROP', 'copolymer', 'comonomer',
                'terephthalic acid', 'ethylene glycol', 'FDCA', 'NDA', 'isosorbide', 'antimony trioxide', 'titanium butoxide',
                'nanoclay', 'barrier', 'OTR', 'WVTR', 'glycolysis', 'depolymerization', 'BHET', 'recycling', 'catalyst'
              ].map((kw) => (
                <Badge key={kw} variant="secondary">{kw}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Synonyms & Canonical Tags</Label>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword/Acronym</TableHead>
                <TableHead>Canonical Tag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>BHET</TableCell>
                <TableCell>bis(2-hydroxyethyl) terephthalate</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>glycolysis of PET</TableCell>
                <TableCell>PET depolymerization</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sb2O3</TableCell>
                <TableCell>antimony trioxide</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ti(OBu)4</TableCell>
                <TableCell>titanium(IV) butoxide</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="space-y-2">
          <Label>Stopwords</Label>
          <div className="p-2 border rounded-md">
            <div className="flex flex-wrap gap-1">
              {['job', 'career', 'login', 'subscribe', 'cookie'].map((sw) => (
                <Badge key={sw} variant="outline">{sw}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Default Access Rules</Label>
          <div className="p-2 border rounded-md text-sm">
            Mark <Badge variant="secondary" className="mx-1">*.sciencedirect.com</Badge> and <Badge variant="secondary" className="mx-1">*.springer.com</Badge> as <Badge variant="outline">Paywalled</Badge>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Company Domains</Label>
          <div className="p-2 border rounded-md">
            <div className="flex flex-wrap gap-1">
              {['esterindustries.com', 'esterindustries.com/news'].map((d) => (
                <Badge key={d} variant="secondary">{d}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Default time window for Updates</Label>
          <Input readOnly defaultValue="Last 7 days" />
        </div>
      </CardContent>
      <CardFooter className="gap-2 p-5 border-t border-slate-200">
        <Button>Save Defaults</Button>
        <Button
          variant="secondary"
          onClick={() => router.push('/dashboard?keywords=PET,BOPET,barrier')}
        >
          Apply Now to Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
}
