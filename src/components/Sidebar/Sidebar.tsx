// src/components/Sidebar/Sidebar.tsx
import { DASHBOARD_SIDEBAR_ITEMS } from '@/pages/SidebarConstant';
import type { NavItem, SidebarProps } from '@/types/sidebarTypes';
import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// تابع کمکی برای اضافه کردن onClick
const mapItemsWithNavigation = (navigate: (path: string) => void): NavItem[] => {
  return DASHBOARD_SIDEBAR_ITEMS.map(item => ({
    ...item,
    onClick: () => {
      if (item.id === 'logout') {
        // مثلاً logout logic
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        navigate(item.path);
      }
    },
  }));
};

export default function Sidebar() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0 });
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // آیتم‌ها را با onClick پر می‌کنیم
  const items: NavItem[] = mapItemsWithNavigation(navigate);

  const topItems = items.slice(0, -1);
  const bottomItem = items[items.length - 1];
  const activeKey = activeId ?? items[0]?.id ?? "";

  useEffect(() => {
    if (!activeId && items.length > 0) {
      setActiveId(items[0].id);
    }
  }, [activeId, items]);

  useEffect(() => {
    const updatePosition = () => {
      const itemElement = itemRefs.current[activeKey];
      const navElement = navRef.current;

      if (itemElement && navElement) {
        const navRect = navElement.getBoundingClientRect();
        const itemRect = itemElement.getBoundingClientRect();
        // Calculate center relative to the nav container
        const left = itemRect.left - navRect.left + itemRect.width / 2;
        setIndicatorStyle({ left });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [activeKey, items.length]);

  const handleClick = (item: NavItem) => {
    setActiveId(item.id);
    item.onClick?.();
  };

  const activeItem = items.find((item) => item.id === activeKey);

  // Generate the SVG path for the "dip"
  // The curve moves based on indicatorStyle.left
  const curvePath = useMemo(() => {
    const width = 2000; // Arbitrary large width to cover screen
    const height = 80; // height of the navbar
    const x = indicatorStyle.left;
    const curveWidth = 118; // The total width of the curve opening
    const curveDepth = 36; // How deep the dip goes

    // Fallback to a rectangle until we have a measured position to avoid invalid SVG path
    if (x <= 0) return `M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`;

    return `
      M 0 0
      L ${x - curveWidth / 2} 0
      C ${x - curveWidth / 4} 0 ${x - curveWidth / 4} ${curveDepth} ${x} ${curveDepth}
      C ${x + curveWidth / 4} ${curveDepth} ${x + curveWidth / 4} 0 ${x + curveWidth / 2} 0
      L ${width} 0
      L ${width} ${height}
      L 0 ${height}
      Z
    `;
  }, [indicatorStyle.left]);

  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-sidebar shadow-lg transition-all duration-300 ease-in-out z-50 ${
        isHovered ? 'w-72' : 'w-20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: 'vazirmatn, sans-serif' }}
    >
      <nav className="flex flex-col h-full py-4 justify-between">
        <div>
          {topItems.map(item => {
            const isActive = item.id === activeId;
            return (
              <div
                key={item.id}
                onClick={() => handleClick(item)}
                className={`relative flex items-center justify-end px-9 py-6 cursor-pointer transition-colors duration-200
                  ${isActive ? 'bg-muted border-r-4 border-primary' : 'hover:bg-muted-foreground'}
                `}
              >
                <span
                  className={`text-foreground text-2xl mr-14 whitespace-nowrap transition-all duration-300
                    ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
                    ${isActive ? 'font-bold' : ''}
                  `}
                >
                  {item.label}
                </span>
                <div className="flex-shrink-0 text-foreground [&>svg]:w-8 [&>svg]:h-8">
                  {item.icon}
                </div>
              </div>
            );
          })}
        </div>

        {bottomItem && (
          <div>
            {(() => {
              const isActive = bottomItem.id === activeId;
              return (
                <div
                  key={bottomItem.id}
                  onClick={() => handleClick(bottomItem)}
                  className={`relative flex items-center justify-end px-9 py-4 cursor-pointer transition-colors duration-200
                    ${isActive ? 'bg-muted border-r-4 border-primary' : 'hover:bg-muted-foreground'}
                  `}
                >
                  <span
                    className={`text-foreground text-2xl mr-14 whitespace-nowrap transition-all duration-300
                      ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
                      ${isActive ? 'font-bold' : ''}
                    `}
                  >
                    {bottomItem.label}
                  </span>
                  <div className="flex-shrink-0 text-foreground [&>svg]:w-8 [&>svg]:h-8">
                    {bottomItem.icon}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </nav>
    </div>
  );
}
