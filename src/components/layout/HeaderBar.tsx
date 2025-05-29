import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu as MenuIcon,
  Search,
  Bell,
  User as UserIcon,
  Settings,
  LogOut,
  ChevronDown,
  LayoutGrid, // For Apps/Grid icon
  Maximize,   // For Fullscreen
} from 'lucide-react';

interface HeaderBarProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  className?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  isSidebarCollapsed,
  onToggleSidebar,
  className,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const dynamicLeftPadding = isSidebarCollapsed ? 'pl-[5rem]' : 'pl-[16rem]'; // Assuming collapsed sidebar is w-20 (5rem)

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-card border-b flex items-center justify-between px-6 z-30',
        'transition-all duration-300 ease-in-out',
        dynamicLeftPadding, // This class will manage the left position based on sidebar state
        className
      )}
      style={{ left: isSidebarCollapsed ? '80px' : '256px' }} // Or use Tailwind classes if parent grid handles width
    >
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-4 lg:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 h-9 w-64 bg-background focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Optional Icons based on image - uncomment if needed and ensure lucide-react has them
        <Button variant="ghost" size="icon">
          <LayoutGrid className="h-5 w-5 text-muted-foreground" /> 
        </Button>
        <Button variant="ghost" size="icon">
          <Maximize className="h-5 w-5 text-muted-foreground" />
        </Button>
        */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start p-2">
                <p className="font-medium text-sm">Your order is placed</p>
                <p className="text-xs text-muted-foreground">Dummy item shipped.</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start p-2">
                <p className="font-medium text-sm">Server overloaded</p>
                <p className="text-xs text-muted-foreground">Your server needs more resources.</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              <Link to="#" className="text-sm text-primary hover:underline">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="Anna Adame" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                 <span className="text-sm font-medium">Anna Adame</span>
                 <span className="text-xs text-muted-foreground">Founder</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="#" className="flex items-center">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="#" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="#" className="flex items-center text-destructive hover:!text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default HeaderBar;
