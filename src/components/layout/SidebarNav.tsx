import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom is used for navigation
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  LayoutDashboard,
  BarChart2,
  Users,
  ShoppingCart,
  Bitcoin,
  Briefcase,
  Image as ImageIcon,
  Newspaper,
  AppWindow,
  LayoutGrid,
  ShieldCheck,
  FileText,
  Rocket,
  Component as ComponentIcon, // Renamed to avoid conflict
  Layers,
  Puzzle,
  FileEdit,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Dot,
} from 'lucide-react';

interface NavLinkItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: { text: string; className: string };
  children?: Omit<NavLinkItem, 'children' | 'icon'>[]; // Sub-items don't have their own icons or further children in this design
  exact?: boolean;
}

interface NavSection {
  title?: string;
  items: NavLinkItem[];
}

interface SidebarNavProps {
  isCollapsed: boolean;
  className?: string;
  currentPath: string; // To determine active link, typically from useLocation().pathname
}

const navSections: NavSection[] = [
  {
    title: 'MENU',
    items: [
      {
        label: 'Dashboards',
        href: '/dashboards',
        icon: LayoutDashboard,
        children: [
          { label: 'Analytics', href: '/dashboards/analytics' },
          { label: 'CRM', href: '/dashboards/crm', exact: true }, // Example: Mark CRM as active if currentPath is exactly /dashboards/crm
          { label: 'Ecommerce', href: '/dashboards/ecommerce' },
        ],
      },
      { label: 'Crypto', href: '/crypto', icon: Bitcoin },
      { label: 'Projects', href: '/projects', icon: Briefcase },
      { label: 'NFT', href: '/nft', icon: ImageIcon },
      { label: 'Job', href: '/job', icon: FileEdit }, // Changed from ClipboardList for variety
      { label: 'Blog', href: '/blog', icon: Newspaper, badge: { text: 'New', className: 'bg-accent text-accent-foreground' } },
    ],
  },
  {
    title: 'APPS & PAGES',
    items: [
      { label: 'Apps', href: '/apps', icon: AppWindow, children: [{ label: 'Calendar', href: '/apps/calendar'}, {label: 'Chat', href: '/apps/chat'}] },
      { label: 'Layouts', href: '/layouts', icon: LayoutGrid, badge: { text: 'Hot', className: 'bg-destructive text-destructive-foreground' }, children: [{label: 'Horizontal', href: '/layouts/horizontal'}]},
      { label: 'Authentication', href: '/auth', icon: ShieldCheck, children: [{label: 'Login', href: '/auth/login'}] },
      { label: 'Pages', href: '/pages', icon: FileText, children: [{label: 'Profile', href: '/pages/profile'}] },
      { label: 'Landing', href: '/landing', icon: Rocket },
    ]
  },
  {
    title: 'COMPONENTS',
    items: [
      { label: 'Base UI', href: '/ui/base', icon: ComponentIcon, children: [{label: 'Alerts', href:'/ui/base/alerts'}] },
      { label: 'Advance UI', href: '/ui/advance', icon: Layers, children: [{label: 'Scrollbar', href:'/ui/advance/scrollbar'}] },
      { label: 'Widgets', href: '/ui/widgets', icon: Puzzle },
      { label: 'Forms', href: '/ui/forms', icon: FileEdit, children: [{label: 'Basic Elements', href:'/ui/forms/basic'}] },
    ],
  },
];

const SidebarNav: React.FC<SidebarNavProps> = ({ isCollapsed, className, currentPath }) => {
  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>(() => {
    // Pre-open accordion if a child route is active
    const activeParent = navSections.flatMap(s => s.items).find(item => 
      item.children?.some(child => currentPath === child.href || currentPath.startsWith(child.href + '/'))
    );
    return activeParent ? [activeParent.label] : [];
  });

  const NavItemContent = ({ item, isChild = false }: { item: NavLinkItem | Omit<NavLinkItem, 'children' | 'icon'>, isChild?: boolean}) => {
    const IconComponent = !isChild ? (item as NavLinkItem).icon : Dot; // Use Dot for child items if no icon
    const isActive = item.exact ? currentPath === item.href : currentPath.startsWith(item.href);

    const linkContent = (
      <>
        <IconComponent className={cn('h-5 w-5', isCollapsed && !isChild ? 'mx-auto' : 'mr-3 shrink-0', isChild ? 'h-3 w-3' : '')} />
        {!isCollapsed && <span className={cn('truncate', isChild && 'text-sm')}>{item.label}</span>}
        {!isCollapsed && item.badge && (
          <Badge className={cn('ml-auto text-xs', item.badge.className)}>{item.badge.text}</Badge>
        )}
      </>
    );

    const linkClasses = cn(
      'flex items-center p-2.5 rounded-md text-sm font-medium w-full',
      'transition-colors duration-150 ease-in-out',
      isActive
        ? 'bg-sidebar-foreground/10 text-sidebar-foreground'
        : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-foreground/5',
      isCollapsed ? 'justify-center' : 'justify-start',
      isChild && !isCollapsed && 'pl-10'
    );

    if (isCollapsed && !isChild) {
      return (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to={item.href} className={linkClasses}>
                {linkContent}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5} className="bg-slate-800 text-white border-slate-700">
              {item.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <Link to={item.href} className={linkClasses}>
        {linkContent}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col z-40',
        'transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      <div className={cn('flex items-center justify-center h-16 border-b border-sidebar-foreground/10 shrink-0', isCollapsed ? 'px-2' : 'px-6')}>
        {isCollapsed ? (
          <LayoutDashboard className="h-8 w-8 text-primary" /> // Simple icon for collapsed logo
        ) : (
          <Link to="/" className="text-2xl font-bold text-primary tracking-wider">
            VELZON
          </Link>
        )}
      </div>

      {!isCollapsed && (
        <div className="p-4 border-b border-sidebar-foreground/10 shrink-0">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="Anna Adame" />
              <AvatarFallback className="bg-primary text-primary-foreground">AA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-sidebar-foreground">Anna Adame</p>
              <p className="text-xs text-green-400">Online</p>
            </div>
          </div>
        </div>
      )}

      <ScrollArea className="flex-grow">
        <nav className={cn('py-4 space-y-1', isCollapsed ? 'px-2' : 'px-4')}>
          {navSections.map((section, sectionIndex) => (
            <div key={section.title || `section-${sectionIndex}`}>
              {section.title && (
                <h2 className={cn('px-2.5 py-2 text-xs font-semibold uppercase text-sidebar-foreground/50 tracking-wider', isCollapsed && 'text-center text-[10px]')}>
                  {isCollapsed ? section.title.substring(0,3) : section.title}
                </h2>
              )}
              {section.items.map((item) => 
                item.children && !isCollapsed ? (
                  <Accordion 
                    key={item.label} 
                    type="single" 
                    collapsible 
                    value={openAccordionItems.includes(item.label) ? item.label : undefined}
                    onValueChange={(value) => {
                      if (value) setOpenAccordionItems(prev => [...prev, value]);
                      else setOpenAccordionItems(prev => prev.filter(i => i !== item.label));
                    }}
                  >
                    <AccordionItem value={item.label} className="border-none">
                      <AccordionTrigger 
                        className={cn(
                          'flex items-center p-2.5 rounded-md text-sm font-medium w-full justify-between hover:no-underline',
                          'transition-colors duration-150 ease-in-out',
                          currentPath.startsWith(item.href) 
                            ? 'bg-sidebar-foreground/10 text-sidebar-foreground'
                            : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-foreground/5',
                          '[&[data-state=open]>svg]:rotate-180'
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon className="h-5 w-5 mr-3 shrink-0" />
                          {item.label}
                        </div>
                         {/* Chevron will be supplied by AccordionTrigger by default if not, add manually*/}
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-0 space-y-1">
                        {item.children.map((child) => (
                          <NavItemContent key={child.label} item={child} isChild={true} />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <NavItemContent key={item.label} item={item} />
                )
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {!isCollapsed && (
        <div className="mt-auto p-4 border-t border-sidebar-foreground/10 shrink-0">
          <p className="text-xs text-center text-sidebar-foreground/50">
            &copy; {new Date().getFullYear()} Velzon.
          </p>
        </div>
      )}
    </aside>
  );
};

export default SidebarNav;
