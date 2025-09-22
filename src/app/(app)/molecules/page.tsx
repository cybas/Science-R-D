import { MoleculesClient } from '@/components/molecules/molecules-client';
import { DATA } from '@/lib/data';

export default function MoleculesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const molecules = DATA.filter((item) => item.type === 'chemical');
  return <MoleculesClient molecules={molecules as any[]} searchParams={searchParams} />;
}
