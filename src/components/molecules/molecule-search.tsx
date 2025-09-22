'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

type MoleculeSearchProps = {
  query: string;
  setQuery: (query: string) => void;
  mode: string;
  setMode: (mode: string) => void;
};

export function MoleculeSearch({ query, setQuery, mode, setMode }: MoleculeSearchProps) {
  const [isDrawModalOpen, setDrawModalOpen] = useState(false);
  const [smiles, setSmiles] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The parent component handles the actual filtering via useEffect on query/mode
  };
  
  const handleDrawSubmit = () => {
    setQuery(smiles);
    setMode('exact');
    setDrawModalOpen(false);
  }

  return (
    <>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Name / CAS / SMILES"
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={mode === 'similarity' ? 'default' : 'secondary'}
            onClick={() => setMode('similarity')}
          >
            Similarity
          </Button>
          <Button
            type="button"
            variant={mode === 'substructure' ? 'default' : 'secondary'}
            onClick={() => setMode('substructure')}
          >
            Substructure
          </Button>
          <Button
            type="button"
            variant={mode === 'exact' ? 'default' : 'secondary'}
            onClick={() => setMode('exact')}
          >
            Exact
          </Button>
          <Button type="button" variant="outline" onClick={() => setDrawModalOpen(true)}>
            Draw
          </Button>
        </div>
      </form>
      <Dialog open={isDrawModalOpen} onOpenChange={setDrawModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Draw Structure</DialogTitle>
            <DialogDescription>
              This is a placeholder for a chemical sketcher. For now, you can paste a SMILES string below.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted aspect-video rounded-md flex items-center justify-center">
            <p className="text-sm text-muted-foreground">[Dummy Sketcher Area]</p>
          </div>
          <Textarea 
            placeholder="Paste SMILES here..." 
            value={smiles}
            onChange={(e) => setSmiles(e.target.value)}
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDrawModalOpen(false)}>Cancel</Button>
            <Button onClick={handleDrawSubmit}>Search</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
