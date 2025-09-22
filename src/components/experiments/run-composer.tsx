
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { PlusCircle, Trash2, Brain } from 'lucide-react';
import { useState } from 'react';

export function RunComposer() {
    const [inputs, setInputs] = useState([{name: '', role: 'Monomer', amount: ''}]);
    
    const addInput = () => {
        setInputs([...inputs, {name: '', role: 'Monomer', amount: ''}]);
    }
    
    const removeInput = (index: number) => {
        setInputs(inputs.filter((_, i) => i !== index));
    }

  return (
    <Card className="sticky top-32">
      <CardHeader>
        <CardTitle>Run Composer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="font-semibold">Inputs</Label>
          {inputs.map((input, index) => (
             <div key={index} className="flex items-center gap-2">
                <Input placeholder="Molecule name..." className="flex-1" />
                 <Select defaultValue="Monomer">
                    <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Monomer">Monomer</SelectItem>
                        <SelectItem value="Catalyst">Catalyst</SelectItem>
                        <SelectItem value="Initiator">Initiator</SelectItem>
                    </SelectContent>
                </Select>
                <Input placeholder="Amount (g)" className="w-[100px]" />
                <Button variant="ghost" size="icon-sm" onClick={() => removeInput(index)}><Trash2 /></Button>
             </div>
          ))}
          <Button variant="outline" size="sm" onClick={addInput}><PlusCircle className="mr-2 h-4 w-4" /> Add Input</Button>
        </div>
        <div className="space-y-2">
            <Label className="font-semibold">Conditions</Label>
            <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Temp (°C)" />
                <Input placeholder="Time (h)" />
                <Input placeholder="Pressure (bar)" />
                <Input placeholder="Catalyst (%)" />
            </div>
        </div>
        <div className="space-y-2">
          <Label className="font-semibold">Targets</Label>
          <div className="space-y-2">
            <Label className="text-xs">Tg Target (°C)</Label>
            <Slider defaultValue={[90]} max={300} min={-50} step={5} />
          </div>
        </div>
         <div className="space-y-2">
          <Label className="font-semibold">Link to Project</Label>
           <Select>
            <SelectTrigger><SelectValue placeholder="Select project..." /></SelectTrigger>
            <SelectContent>
                <SelectItem value="proj-1">High-Tg PET Copolymer</SelectItem>
                <SelectItem value="proj-2">BOPET Barrier Film</SelectItem>
            </SelectContent>
           </Select>
        </div>
        <div className="space-y-2">
            <Label className="font-semibold">Safety</Label>
            <Textarea placeholder="Auto-populated hazards and manual notes..." className="h-20" />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
        <Button>Create Run</Button>
        <Button variant="secondary"><Brain className="mr-2"/> Suggest Conditions</Button>
      </CardFooter>
    </Card>
  );
}
