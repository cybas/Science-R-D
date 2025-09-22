'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BrainCircuit, Star, Plus, GitCompare, Lock, ExternalLink } from 'lucide-react';
import { ChemicalStructureIcon } from '../icons/chemical-structure-icon';
import type { FeedItem, Chemical, Polymer, Paper, Patent } from '@/lib/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ActivityCardProps = {
  item: FeedItem;
  onAskAi: (item: FeedItem) => void;
  onSaveToMemory: (item: FeedItem) => void;
  onAddToBasket: (item: Chemical) => void;
  onCompare: (item: Polymer) => void;
  isComparing: boolean;
};

export function ActivityCard({ item, onAskAi, onSaveToMemory, onAddToBasket, onCompare, isComparing }: ActivityCardProps) {

  const renderCardContent = () => {
    switch (item.type) {
      case 'chemical':
        return <ChemicalCardContent item={item} />;
      case 'polymer':
        return <PolymerCardContent item={item} />;
      case 'paper':
        return <PaperCardContent item={item} />;
      case 'patent':
        return <PatentCardContent item={item} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    if (item.type === 'polymer') return item.name;
    return item.title;
  }
  
  const handleCompareClick = () => {
    if (item.type === 'polymer') {
      onCompare(item);
    }
  }

  return (
    <Card className={cn("overflow-hidden", isComparing && item.type !== 'polymer' && 'opacity-50', isComparing && item.type === 'polymer' && 'cursor-pointer hover:border-primary')}>
      <CardHeader className="flex-row items-start justify-between gap-4 p-4 md:p-5">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold leading-tight md:text-lg">
            {getTitle()}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Source: {item.source} · {item.date}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {item.type === 'chemical' && (
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Add to Basket" onClick={() => onAddToBasket(item)}>
              <Plus className="h-4 w-4" />
            </Button>
          )}
          {item.type === 'polymer' && (
            <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Compare" onClick={handleCompareClick}>
              <GitCompare className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Save to Memory" onClick={() => onSaveToMemory(item)}>
            <Star className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Ask AI" onClick={() => onAskAi(item)}>
            <BrainCircuit className="h-4 w-4" />
          </Button>
          <Button asChild variant="ghost" size="icon" className="h-8 w-8" aria-label="Open">
            <Link href={item.href} target="_blank">
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 md:p-5 md:pt-0">
        {renderCardContent()}
      </CardContent>
    </Card>
  );
}

function ChemicalCardContent({ item }: { item: Chemical }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="flex items-center justify-center rounded-md bg-muted p-4 md:col-span-1">
        <ChemicalStructureIcon smiles={item.smiles} className="h-24 w-auto" />
      </div>
      <div className="md:col-span-2">
        <p className="text-sm font-mono">{item.formula} · MW {item.mw}</p>
        <p className="text-sm">Hazard: <span className="font-mono">{item.hazard}</span></p>
        <p className="text-sm font-mono break-all">SMILES: {item.smiles}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
      </div>
    </div>
  );
}

function PolymerCardContent({ item }: { item: Polymer }) {
  return (
    <div>
      <div className="space-y-1 text-sm">
        <p><span className="font-semibold">Monomers:</span> {item.monomers.join(', ')}</p>
        <p><span className="font-semibold">Process:</span> {item.process}</p>
        <p><span className="font-semibold">Forms:</span> {item.forms.join(', ')}</p>
      </div>
      <Separator className="my-3" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
        <div><span className="font-semibold">Tg:</span> {item.props.tg}</div>
        <div><span className="font-semibold">Tm:</span> {item.props.tm}</div>
        <div><span className="font-semibold">Modulus:</span> {item.props.modulus}</div>
        {item.props.tensile && <div><span className="font-semibold">Tensile:</span> {item.props.tensile}</div>}
      </div>
       {item.notes && <p className="mt-2 text-sm text-accent-foreground/80 bg-accent/20 p-2 rounded-md">{item.notes}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
      </div>
    </div>
  );
}

function PaperCardContent({ item }: { item: Paper }) {
  return (
    <div>
      <p className="mb-2 text-sm text-muted-foreground">{item.summary}</p>
      <div className="flex flex-wrap items-center gap-2">
        {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        {item.status === 'Paywalled' && (
          <Badge variant="outline" className="flex items-center gap-1.5">
            <Lock className="h-3 w-3" />
            Paywalled
          </Badge>
        )}
      </div>
    </div>
  );
}

function PatentCardContent({ item }: { item: Patent }) {
  return (
    <div>
      <p className="text-sm font-semibold">{item.assignee} · {item.number}</p>
      <p className="my-2 text-sm text-muted-foreground">{item.summary}</p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
      </div>
    </div>
  );
}
