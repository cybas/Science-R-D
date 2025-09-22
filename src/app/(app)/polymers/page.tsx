import { PolymersClient } from '@/components/polymers/polymers-client';
import { DATA } from '@/lib/data';
import type { Polymer, Chemical } from '@/lib/data';

export const dynamic = "force-dynamic";

export default function PolymersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const polymers = DATA.filter((item) => item.type === 'polymer') as Polymer[];
  const allChemicals = DATA.filter(item => item.type === 'chemical') as Chemical[];
  return <PolymersClient polymers={polymers} allChemicals={allChemicals} searchParams={searchParams} />;
}
