'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Trash2, Wand2 } from 'lucide-react';
import type { Chemical } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type DesignAssistantProps = {
  basket: Chemical[];
  onRemoveFromBasket: (item: Chemical) => void;
  onSaveHypothesis: (hypothesis: any) => void;
};

const processSuggestions = ['Step-growth', 'ROP', 'ATRP', 'RAFT'];

export function DesignAssistant({ basket, onRemoveFromBasket, onSaveHypothesis }: DesignAssistantProps) {
  const { toast } = useToast();
  
  const handleSave = () => {
    const hypothesis = {
        id: `hypothesis-${Date.now()}`,
        name: 'Hypothetical Polymer 1',
        type: 'polymer',
        tags: ['Hypothesis'],
        summary: `Designed from ${basket.map(c => c.title.split('—')[0].trim()).join(', ')}`
    };
    onSaveHypothesis(hypothesis);
    toast({ title: 'Hypothesis Saved', description: 'The new polymer candidate has been saved to your Memory.' });
  }

  return (
    <div className="sticky top-32">
      <Card>
        <CardHeader>
          <CardTitle>Design Assistant</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Inputs (from Basket)</h3>
            {basket.length > 0 ? (
              <ScrollArea className="h-32">
                <div className="space-y-2">
                  {basket.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/50">
                      <div>
                        <p>{item.title.split('—')[0].trim()}</p>
                        <p className="text-xs text-muted-foreground">{item.role}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        aria-label="Remove from basket"
                        onClick={() => onRemoveFromBasket(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <p className="text-sm text-center text-muted-foreground py-4">Add monomers and other reagents to your basket to start designing.</p>
            )}
          </div>

          {basket.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Process Suggestion</h3>
                <div className="flex flex-wrap gap-2">
                  {processSuggestions.map((filter) => (
                    <Badge key={filter} variant="secondary" className="cursor-pointer">
                      {filter}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">Target Properties</h3>
                <div className="space-y-2">
                  <label className="text-xs">Tg: -50 to 300 °C</label>
                  <Slider defaultValue={[80, 150]} min={-50} max={300} step={10} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs">Modulus: 0.1 to 20 GPa</label>
                  <Slider defaultValue={[2.5, 5]} min={0.1} max={20} step={0.1} />
                </div>
              </div>
            </>
          )}
        </CardContent>
        {basket.length > 0 && (
            <CardFooter className="flex-col items-stretch gap-4">
                <Button><Wand2 className="mr-2"/> Generate Candidates</Button>
                 <Separator />
                 <div className="space-y-2">
                    <h3 className="font-semibold text-sm">Proposed Candidate</h3>
                    <Card className="bg-muted/50 p-3">
                        <p className="font-semibold text-sm">PET-co-Isosorbide</p>
                        <p className="text-xs text-muted-foreground">Random copolymer via step-growth. Predicted Tg: 95°C.</p>
                        <div className="mt-2 flex justify-end gap-2">
                           <Button variant="secondary" size="sm" onClick={handleSave}>Save Hypothesis</Button>
                           <Button variant="primary" size="sm">Ask AI</Button>
                        </div>
                      </Card>
                 </div>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
