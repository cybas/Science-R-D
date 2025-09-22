import { PolymersClient } from '@/components/polymers/polymers-client';
import { DATA } from '@/lib/data';

export default function PolymersPage() {
  const polymers = DATA.filter((item) => item.type === 'polymer');
  return <PolymersClient polymers={polymers as any[]} allChemicals={DATA.filter(item => item.type === 'chemical') as any[]} />;
}
