import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"

const activityData = [
  { time: '10:04', user: 'Jai', action: 'saved molecule', target: 'Isosorbide', result: 'OK' },
  { time: '09:57', user: 'system', action: 'crawl', target: 'OpenAlex', result: 'OK' },
  { time: '09:45', user: 'A. Rao', action: 'added to basket', target: 'Ethylene Glycol', result: 'OK' },
  { time: '09:31', user: 'Jai', action: 'ran comparison', target: 'PET vs PEF', result: 'OK' },
  { time: '09:22', user: 'P. Mehta', action: 'asked AI', target: 'Nanoclay-modified BOPET...', result: 'OK' },
  { time: '09:15', user: 'Jai', action: 'created hypothesis', target: 'Hypothetical Polymer 1', result: 'OK' },
];

export function RecentActivityTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityData.map((activity, index) => (
              <TableRow key={index}>
                <TableCell>{activity.time}</TableCell>
                <TableCell>{activity.user}</TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell className="truncate max-w-xs">{activity.target}</TableCell>
                <TableCell>{activity.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="link">View full log</Button>
      </CardFooter>
    </Card>
  )
}
