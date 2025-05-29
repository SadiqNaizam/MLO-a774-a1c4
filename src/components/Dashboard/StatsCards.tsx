import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Send, DollarSign, TrendingUp, Users, Heart, ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardData {
  id: string;
  title: string;
  value: string;
  icon: React.ElementType;
  trendIcon: React.ElementType;
  trendDirection: 'up' | 'down';
  trendColor: string;
  iconBgColor: string;
}

const statsData: StatCardData[] = [
  {
    id: 'campaignSent',
    title: 'CAMPAIGN SENT',
    value: '197',
    icon: Send,
    trendIcon: ArrowUp,
    trendDirection: 'up' as const,
    trendColor: 'text-green-500',
    iconBgColor: 'bg-sky-100 dark:bg-sky-500/20',
  },
  {
    id: 'annualProfit',
    title: 'ANNUAL PROFIT',
    value: '$489.4k',
    icon: DollarSign,
    trendIcon: ArrowUp,
    trendDirection: 'up' as const,
    trendColor: 'text-green-500',
    iconBgColor: 'bg-yellow-100 dark:bg-yellow-500/20',
  },
  {
    id: 'leadConversation',
    title: 'LEAD CONVERSATION',
    value: '32.89%',
    icon: TrendingUp, // Main icon depicts a chart line
    trendIcon: ArrowDown, // Small indicator icon as per image
    trendDirection: 'down' as const,
    trendColor: 'text-red-500',
    iconBgColor: 'bg-red-100 dark:bg-red-500/20',
  },
  {
    id: 'dailyAverageIncome',
    title: 'DAILY AVERAGE INCOME',
    value: '$1,596.5',
    icon: Users, // Changed from image's 'ID card' like icon for wider use
    trendIcon: ArrowUp,
    trendDirection: 'up' as const,
    trendColor: 'text-green-500',
    iconBgColor: 'bg-green-100 dark:bg-green-500/20',
  },
  {
    id: 'annualDeals',
    title: 'ANNUAL DEALS',
    value: '2,659',
    icon: Heart,
    trendIcon: ArrowUp,
    trendDirection: 'up' as const,
    trendColor: 'text-green-500',
    iconBgColor: 'bg-purple-100 dark:bg-purple-500/20',
  },
];

interface StatsCardsProps {
  className?: string;
}

const StatsCards: React.FC<StatsCardsProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6', className)}>
      {statsData.map((stat) => (
        <Card key={stat.id} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium uppercase text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.trendIcon className={cn('h-4 w-4', stat.trendColor)} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className={cn('p-3 rounded-full', stat.iconBgColor)}>
                <stat.icon className={cn('h-6 w-6', stat.icon === DollarSign ? 'text-yellow-500' : stat.icon === Send ? 'text-sky-500' : stat.icon === TrendingUp ? 'text-red-500' : stat.icon === Users ? 'text-green-500' : 'text-purple-500')} />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
