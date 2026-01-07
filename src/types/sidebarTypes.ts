import type { ReactNode } from 'react';
export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  path?: string;
}

export interface SidebarProps {
  items?: NavItem[];
  className?: string;
}

export interface SidebarLayoutProps {
  children: ReactNode;
  sidebarItems: NavItem[];
}
