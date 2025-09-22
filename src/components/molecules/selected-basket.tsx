'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import type { Chemical } from '@/lib/data';

type SelectedBasketProps = {
  basket: Chemical[];
  onRemove: (item: Chemical) => void;
  isDrawer?: boolean;
};

function BasketContent({ basket, onRemove }: SelectedBasketProps) {
  return (
    <>
      {basket.length > 0 ? (
        <>
          <ScrollArea className={ onRemove.toString().includes('isDrawer') ? "h-64" : "h-96"}>
            <div className="space-y-2 pr-4">
              {basket.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between text-sm p-2 rounded-md bg-muted/50"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.title.split('—')[0].trim()}</p>
                    <p className="text-xs text-muted-foreground">{item.role || 'Chemical'}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 flex-shrink-0"
                    aria-label="Remove from basket"
                    onClick={() => onRemove(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Button asChild className="w-full mt-4">
            <Link href="/polymers?design=1">Design Polymer</Link>
          </Button>
        </>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-10">
          Chemicals added to the basket will appear here.
        </p>
      )}
    </>
  );
}

export function SelectedBasket(props: SelectedBasketProps) {
  if (props.isDrawer) {
    if (props.basket.length === 0) return null;
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="fixed bottom-4 right-4 rounded-full h-12 shadow-lg lg:hidden">
                    Basket <Badge className="ml-2">{props.basket.length}</Badge>
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-lg">
                <SheetHeader>
                    <SheetTitle>Basket</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <BasketContent {...props} />
                </div>
            </SheetContent>
        </Sheet>
    );
  }

  return (
    <Card className="sticky top-32">
      <CardHeader>
        <CardTitle>Basket</CardTitle>
      </CardHeader>
      <CardContent>
        <BasketContent {...props} />
      </CardContent>
    </Card>
  );
}
