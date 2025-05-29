import React from 'react';

// Assuming AdminLayout will be created at this path and will provide the main page structure
// including Sidebar, Header, and a main content area that applies the grid according to Layout Requirements.
import AdminLayout from '../components/layout/AdminLayout'; 

// Import dashboard organism components. Paths are relative to src/pages/
import StatsCards from '../components/Dashboard/StatsCards';
import SalesCharts from '../components/Dashboard/SalesCharts';
import BalanceOverview from '../components/Dashboard/BalanceOverview';
import DataTable from '../components/Dashboard/DataTable';
import TaskList from '../components/Dashboard/TaskList';

// Interface for breadcrumb items, assuming AdminLayout accepts this prop structure.
interface BreadcrumbItem {
  label: string;
  href?: string;
}

const CrmDashboardPage: React.FC = () => {
  // Data for breadcrumbs, to be passed to AdminLayout.
  // AdminLayout or a component within it (e.g., HeaderBar) would render these.
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Dashboards', href: '/dashboards' }, // Example href, adjust if needed based on routing
    { label: 'CRM' },
  ];

  // The page title, to be passed to AdminLayout.
  const pageTitle = 'CRM';

  return (
    // AdminLayout is expected to handle:
    // 1. Rendering SidebarNav and HeaderBar.
    // 2. Managing sidebar collapse state and passing it to SidebarNav and HeaderBar.
    // 3. Providing a main content area wrapper (e.g., <main>) with appropriate padding (p-6) and top margin (mt-16 for fixed header).
    // 4. Inside this main content area, rendering its {children} within a container that has the specified grid layout:
    //    "grid gap-6 grid-cols-2 lg:grid-cols-4 auto-rows-auto" (from Layout Requirements: mainContent.container).
    <AdminLayout pageTitle={pageTitle} breadcrumbs={breadcrumbs}>
      {/* The following components are direct children of the grid defined in AdminLayout's main content area. */}
      {/* Their classNames here specify how they span across that parent grid. */}

      {/* StatsCards: Spans full width (2/2 cols on medium breakpoint, 4/4 cols on large breakpoint). */}
      <StatsCards className="col-span-2 lg:col-span-4" />
      
      {/* SalesCharts: Spans full width. Internally, it has its own 2-column layout for charts. */}
      <SalesCharts className="col-span-2 lg:col-span-4" />
      
      {/* BalanceOverview: Spans full width. */}
      <BalanceOverview className="col-span-2 lg:col-span-4" />
      
      {/* DataTable: Spans full width on medium screens (2/2). Spans 3/4 width on large screens (3/4). */}
      <DataTable className="col-span-2 lg:col-span-3" />
      
      {/* TaskList: Spans full width on medium screens (2/2, typically on a new row). Spans 1/4 width on large screens (1/4). */}
      <TaskList className="col-span-2 lg:col-span-1" />
    </AdminLayout>
  );
};

export default CrmDashboardPage;
