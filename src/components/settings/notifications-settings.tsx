'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export function NotificationsSettings() {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Configure how you receive digests and alerts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Digests & Alerts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label>Email digest</Label>
              <Select defaultValue="weekly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Select defaultValue="09:00">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">at 09:00 local</SelectItem>
                  <SelectItem value="17:00">at 17:00 local</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => toast({ title: 'Test email sent!' })}
          >
            Send Test Email
          </Button>
        </div>
        <div className="space-y-2">
            <h4 className="font-medium">In-app alerts</h4>
            <div className="space-y-2 p-3 border rounded-lg">
                <div className="flex items-center justify-between"><Label>New Matches</Label><Switch defaultChecked/></div>
                <div className="flex items-center justify-between"><Label>Crawl Failures</Label><Switch defaultChecked/></div>
                <div className="flex items-center justify-between"><Label>Memory Mentions</Label><Switch defaultChecked/></div>
            </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold">Webhook</h3>
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL (optional)</Label>
            <Input id="webhook-url" placeholder="https://hooks.example/ester-rd" defaultValue="https://hooks.example/ester-rd" />
          </div>
          <Button
            variant="outline"
            onClick={() => toast({ title: 'Test webhook sent!' })}
          >
            Send Test Payload
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
