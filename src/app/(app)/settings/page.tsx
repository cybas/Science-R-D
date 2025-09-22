import { SettingsClient } from '@/components/settings/settings-client';

export default function SettingsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return <SettingsClient searchParams={searchParams} />;
}
