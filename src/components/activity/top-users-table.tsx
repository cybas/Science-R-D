import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const userData = [
  { user: 'Jai', saved: 18, askAi: 22, comparisons: 4, hypotheses: 2 },
  { user: 'A. Rao', saved: 12, askAi: 16, comparisons: 3, hypotheses: 2 },
  { user: 'P. Mehta', saved: 8, askAi: 9, comparisons: 2, hypotheses: 1 },
];

export function TopUsersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Saved</TableHead>
              <TableHead>Ask-AI</TableHead>
              <TableHead>Comps</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{user.user}</TableCell>
                <TableCell>{user.saved}</TableCell>
                <TableCell>{user.askAi}</TableCell>
                <TableCell>{user.comparisons}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
