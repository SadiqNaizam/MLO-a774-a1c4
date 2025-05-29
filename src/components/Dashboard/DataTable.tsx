import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Deal {
  id: string;
  name: string;
  lastContacted: string;
  salesRep: {
    name: string;
    avatarUrl?: string;
    initials: string;
  };
  status: 'Deal Won' | 'Intro Call' | 'Stuck';
  dealValue: string;
}

const dealsData: Deal[] = [
  {
    id: '1',
    name: 'Absternet LLC',
    lastContacted: 'Sep 20, 2021',
    salesRep: { name: 'Donald Risher', initials: 'DR' },
    status: 'Deal Won' as const,
    dealValue: '$100.1K',
  },
  {
    id: '2',
    name: 'Raitech Soft',
    lastContacted: 'Sep 23, 2021',
    salesRep: { name: 'Sofia Cunha', initials: 'SC' },
    status: 'Intro Call' as const,
    dealValue: '$150K',
  },
  {
    id: '3',
    name: 'William PVT',
    lastContacted: 'Sep 27, 2021',
    salesRep: { name: 'Luis Rocha', initials: 'LR' },
    status: 'Stuck' as const,
    dealValue: '$78.18K',
  },
  {
    id: '4',
    name: 'Loiusee LLP',
    lastContacted: 'Sep 30, 2021',
    salesRep: { name: 'Vitoria Rodrigues', initials: 'VR' },
    status: 'Deal Won' as const,
    dealValue: '$180K',
  },
  {
    id: '5',
    name: 'Example Corp',
    lastContacted: 'Oct 05, 2021',
    salesRep: { name: 'John Doe', initials: 'JD' },
    status: 'Intro Call' as const,
    dealValue: '$220K',
  },
];

interface DataTableProps {
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({ className }) => {
  const [dateRange, setDateRange] = React.useState<string>('nov_dec_2021');

  const getStatusBadgeClass = (status: Deal['status']) => {
    switch (status) {
      case 'Deal Won':
        return 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-700/30 dark:text-green-400';
      case 'Intro Call':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-700/30 dark:text-blue-400';
      case 'Stuck':
        return 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-700/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700/30 dark:text-gray-400';
    }
  };

  return (
    <Card className={cn('shadow-sm col-span-1 md:col-span-3', className)}> {/* Adjusted to span 3 cols for larger layout assumption */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Deals Status</CardTitle>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[240px] text-xs h-8">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nov_dec_2021">02 Nov 2021 to 31 Dec 2021</SelectItem>
            <SelectItem value="oct_2021">October 2021</SelectItem>
            <SelectItem value="all_time">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Name</TableHead>
                <TableHead>Last Contacted</TableHead>
                <TableHead>Sales Representative</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Deal Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dealsData.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium pl-6">{deal.name}</TableCell>
                  <TableCell className="text-muted-foreground">{deal.lastContacted}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        {deal.salesRep.avatarUrl && <AvatarImage src={deal.salesRep.avatarUrl} alt={deal.salesRep.name} />}
                        <AvatarFallback>{deal.salesRep.initials}</AvatarFallback>
                      </Avatar>
                      <span>{deal.salesRep.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('font-normal', getStatusBadgeClass(deal.status))}>
                      {deal.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6 font-medium">{deal.dealValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable;
