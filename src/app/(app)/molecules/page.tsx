import { MoleculesClient } from '@/components/molecules/molecules-client';
import { DATA } from '@/lib/data';

export default function MoleculesPage() {
  const molecules = DATA.filter((item) => item.type === 'chemical');
  return <MoleculesClient molecules={molecules as any[]} />;
}
