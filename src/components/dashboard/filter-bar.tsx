'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type FilterBarProps = {
  resultCount: number;
  keywordFilters: string[];
  onKeywordFilterToggle: (keyword: string) => void;
};

const keywordOptions = ['PET', 'Polyester', 'Nanocomposites', 'Polycarbonate'];

export function FilterBar({ resultCount, keywordFilters, onKeywordFilterToggle }: FilterBarProps) {
  return (
    <div className="sticky top-16 z-30 -mx-4 border-b bg-background/80 p-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
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
          <Select defaultValue="all">
            <SelectTrigger className="w-auto min-w-[150px]">
              <SelectValue placeholder="All Domains" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              <SelectItem value="pubchem">PubChem</SelectItem>
              <SelectItem value="polyinfo">PoLyInfo</SelectItem>
              <SelectItem value="openalex">OpenAlex</SelectItem>
              <SelectItem value="lens">Lens</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="hidden items-center gap-2 md:flex">
            {keywordOptions.map((keyword) => (
              <Badge
                key={keyword}
                variant={keywordFilters.includes(keyword) ? 'default' : 'secondary'}
                onClick={() => onKeywordFilterToggle(keyword)}
                className="cursor-pointer"
              >
                {keyword}
              </Badge>
            ))}
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="font-bold">
              Relevance
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Newest
            </Button>
            <div className="ml-4 text-sm text-muted-foreground">{resultCount} Results</div>
          </div>
        </div>
        <ScrollArea className="w-full md:hidden">
          <div className="flex space-x-2 pb-2.5">
            {keywordOptions.map((keyword) => (
                <Badge
                  key={keyword}
                  variant={keywordFilters.includes(keyword) ? 'default' : 'secondary'}
                  onClick={() => onKeywordFilterToggle(keyword)}
                  className="cursor-pointer"
                >
                  {keyword}
                </Badge>
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
