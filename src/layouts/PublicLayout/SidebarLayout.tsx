// src/layouts/PublicLayout/SidebarLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar/Sidebar";
import { DASHBOARD_SIDEBAR_ITEMS } from "@/pages/SidebarConstant";
import type { NavItem } from "@/types/sidebarTypes";
import useAuthStore from "@/store/authStore/authStore";

export default function SidebarLayout() {
  const navigate = useNavigate();
  const clearToken = useAuthStore((state) => state.clearToken);

  const items: NavItem[] = DASHBOARD_SIDEBAR_ITEMS.map((item) => ({
    ...item,
    onClick: () => {
      if (item.id === "logout") {
        clearToken();
        navigate("/login");
        return;
      }

      navigate(item.path);
    },
  }));

  return (
    <div className="bg-background">
      <div className="mx-auto flex min-h-screen max-w-screen-2xl flex-row-reverse gap-4 px-4 pb-8 pt-4">
        <aside className="sticky top-6 h-[calc(100vh-3rem)] self-start">
          <Sidebar items={items} />
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
