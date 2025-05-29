import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '@/lib/utils';

const monthlyBalanceData = [
  { name: 'Jan', Revenue: 15, Expenses: 10 },
  { name: 'Feb', Revenue: 20, Expenses: 12 },
  { name: 'Mar', Revenue: 45, Expenses: 30 },
  { name: 'Apr', Revenue: 35, Expenses: 25 },
  { name: 'May', Revenue: 60, Expenses: 40 },
  { name: 'Jun', Revenue: 50, Expenses: 38 },
  { name: 'Jul', Revenue: 80, Expenses: 55 },
  { name: 'Aug', Revenue: 70, Expenses: 60 },
  { name: 'Sep', Revenue: 100, Expenses: 70 },
  { name: 'Oct', Revenue: 120, Expenses: 80 },
  { name: 'Nov', Revenue: 150, Expenses: 95 },
  { name: 'Dec', Revenue: 130, Expenses: 110 },
];

interface BalanceOverviewProps {
  className?: string;
}

const BalanceOverview: React.FC<BalanceOverviewProps> = ({ className }) => {
  const [sortCriteria, setSortCriteria] = React.useState<string>('current_year');

  return (
    <Card className={cn('shadow-sm col-span-1 md:col-span-2', className)}> {/* Adjusted to span 2 cols for larger layout assumption */}
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Balance Overview</CardTitle>
          <div className="flex items-center space-x-4 mt-2 text-sm">
            <p><span className="font-bold text-primary">$584k</span> <span className="text-muted-foreground">Revenue</span></p>
            <p><span className="font-bold text-destructive">$497k</span> <span className="text-muted-foreground">Expenses</span></p>
            <p><span className="font-bold text-accent">3.6%</span> <span className="text-muted-foreground">Profit Ratio</span></p>
          </div>
        </div>
        <Select value={sortCriteria} onValueChange={setSortCriteria}>
          <SelectTrigger className="w-[180px] text-xs h-8">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current_year">SORT BY: Current Year</SelectItem>
            <SelectItem value="last_year">SORT BY: Last Year</SelectItem>
            <SelectItem value="last_6_months">SORT BY: Last 6 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyBalanceData} margin={{ top: 5, right: 20, left: -20, bottom: 20 }}>
            <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
            <XAxis dataKey="name" tickLine={false} axisLine={{stroke: 'hsl(var(--border))'}} className="text-xs"/>
            <YAxis unit="k" tickFormatter={(value) => `${value}k`} tickLine={false} axisLine={false} className="text-xs"/>
            <Tooltip 
              contentStyle={{backgroundColor: 'hsl(var(--background))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))'}}
              labelStyle={{color: 'hsl(var(--foreground))'}}
              formatter={(value: number, name: string) => [`$${value}k`, name]}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: "12px"}}/>
            <Area type="monotone" dataKey="Revenue" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} activeDot={{ r: 6 }} />
            <Area type="monotone" dataKey="Expenses" stroke="hsl(var(--destructive))" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={2} activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BalanceOverview;
