// src/constants/sidebarItems.ts
import type { NavItem } from "@/types/sidebarTypes";
import { Home, User, Settings, LogOut } from "lucide-react";


export const DASHBOARD_SIDEBAR_ITEMS: Omit<NavItem, "onClick">[] = [
  { id: "home", label: "خانه", icon: <Home size={24} />, path: "/dash" },
  { id: "profile", label: "پروفایل", icon: <User size={24} />, path: "/dash/profile" },
  { id: "settings", label: "تنظیمات", icon: <Settings size={24} />, path: "/dash/settings" },
  { id: "logout", label: "خروج", icon: <LogOut size={24} />, path: "/logout" },
];
