import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { cn } from '@/lib/utils';

// Data for Sales Forecast Chart
const salesForecastData = [
  { name: 'Forecast', Goal: 37000, 'Pending Forecast': 12000, Revenue: 18000 },
];

// Data for Deal Type Chart
const dealTypeData = [
  { subject: '2016', Pending: 85, Loss: 40, Won: 60, fullMark: 100 },
  { subject: '2017', Pending: 70, Loss: 55, Won: 75, fullMark: 100 },
  { subject: '2018', Pending: 60, Loss: 70, Won: 50, fullMark: 100 },
  { subject: '2019', Pending: 90, Loss: 30, Won: 80, fullMark: 100 },
  { subject: '2020', Pending: 75, Loss: 45, Won: 65, fullMark: 100 },
  { subject: '2021', Pending: 80, Loss: 25, Won: 95, fullMark: 100 },
];

interface SalesChartsProps {
  className?: string;
}

const SalesCharts: React.FC<SalesChartsProps> = ({ className }) => {
  const [salesForecastSort, setSalesForecastSort] = React.useState<string>('nov_2021');
  const [dealTypeSort, setDealTypeSort] = React.useState<string>('monthly');

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      {/* Sales Forecast Chart Card */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Sales Forecast</CardTitle>
          <Select value={salesForecastSort} onValueChange={setSalesForecastSort}>
            <SelectTrigger className="w-[180px] text-xs h-8">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nov_2021">SORT BY: Nov 2021</SelectItem>
              <SelectItem value="oct_2021">SORT BY: Oct 2021</SelectItem>
              <SelectItem value="last_quarter">SORT BY: Last Quarter</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesForecastData} margin={{ top: 5, right: 0, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
              <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs" label={{ value: 'Total Forecasted Value', position: 'insideBottom', dy:15, className: 'text-xs fill-muted-foreground' }}/>
              <YAxis unit="k" tickFormatter={(value) => `${value / 1000}`} tickLine={false} axisLine={false} className="text-xs"/>
              <Tooltip 
                cursor={{fill: 'hsl(var(--muted))'}}
                contentStyle={{backgroundColor: 'hsl(var(--background))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))'}}
                labelStyle={{color: 'hsl(var(--foreground))'}}
              />
              <Legend verticalAlign="bottom" height={36} iconType="square" wrapperStyle={{fontSize: "12px"}}/>
              <Bar dataKey="Goal" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30}/>
              <Bar dataKey="Pending Forecast" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} barSize={30}/>
              <Bar dataKey="Revenue" fill="#F7B84B" radius={[4, 4, 0, 0]} barSize={30}/>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Deal Type Chart Card */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Deal Type</CardTitle>
          <Select value={dealTypeSort} onValueChange={setDealTypeSort}>
            <SelectTrigger className="w-[180px] text-xs h-8">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">SORT BY: Monthly</SelectItem>
              <SelectItem value="quarterly">SORT BY: Quarterly</SelectItem>
              <SelectItem value="yearly">SORT BY: Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dealTypeData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" className="text-xs" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tickCount={5} className="text-xs"/>
              <Tooltip 
                contentStyle={{backgroundColor: 'hsl(var(--background))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))'}}
                labelStyle={{color: 'hsl(var(--foreground))'}}
              />
              <Legend verticalAlign="bottom" height={36} iconType="square" wrapperStyle={{fontSize: "12px"}}/>
              <Radar name="Pending" dataKey="Pending" stroke="#F7B84B" fill="#F7B84B" fillOpacity={0.6} />
              <Radar name="Loss" dataKey="Loss" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.6} />
              <Radar name="Won" dataKey="Won" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesCharts;
