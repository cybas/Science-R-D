'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Building } from 'lucide-react';

const integrations = [
    { name: 'Slack/Webhook', connected: true, description: 'Receive alerts in your Slack channels.' },
    { name: 'Email SMTP', connected: false, description: 'Send digests from your own email server.' },
    { name: 'SSO (SAML/OIDC)', connected: false, enterprise: true, description: 'Enable single sign-on for your organization.' },
];

export function IntegrationsSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>
          Connect Ester R&D to other services.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map(int => (
            <Card key={int.name}>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                        {int.name}
                        {int.connected ? 
                            <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1"/>Connected</Badge> : 
                            <Badge variant="outline"><XCircle className="h-3 w-3 mr-1"/>Not Connected</Badge>}
                    </CardTitle>
                    <CardDescription>{int.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-end">
                    {int.enterprise ? (
                        <Button variant="secondary" disabled><Building className="h-4 w-4 mr-2"/>Enterprise</Button>
                    ) : (
                        <Button variant="outline">{int.connected ? 'Configure' : 'Connect'}</Button>
                    )}
                </CardContent>
            </Card>
        ))}
      </CardContent>
    </Card>
  );
}
