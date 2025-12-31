// src/components/Sidebar/Sidebar.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { NavItem } from "@/types/sidebarTypes";

type SidebarProps = {
  items: NavItem[];
  className?: string;
};

export default function Sidebar({ items, className }: SidebarProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 48 });
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const topItems = items.slice(0, -1);
  const bottomItem = items[items.length - 1];
  const activeKey = activeId ?? items[0]?.id ?? "";

  useEffect(() => {
    if (!activeId && items.length > 0) {
      setActiveId(items[0].id);
    }
  }, [activeId, items]);

  useEffect(() => {
    const itemElement = itemRefs.current[activeKey];
    const navElement = navRef.current;

    if (itemElement && navElement) {
      const navRect = navElement.getBoundingClientRect();
      const itemRect = itemElement.getBoundingClientRect();
      const left = itemRect.left - navRect.left + itemRect.width / 2;

      setIndicatorStyle({
        left,
        width: 48,
      });
    }
  }, [activeKey, items.length]);

  const handleClick = (item: NavItem) => {
    setActiveId(item.id);
    if (item.onClick) {
      item.onClick();
      return;
    }

    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div
      className={`h-16 w-full bg-sidebar shadow-lg transition-all duration-300 ease-in-out md:h-full ${isHovered ? "md:w-72" : "md:w-20"} ${className ?? ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: "vazirmatn, sans-serif" }}
    >
      {/* Mobile bottom bar */}
      <nav className="flex h-full items-center justify-center px-0 md:hidden">
        <div className="relative w-full">
          <div
            ref={navRef}
            className="relative h-16 w-full rounded-2xl bg-gray-200"
            style={{
              WebkitMaskImage: `radial-gradient(circle 32px at ${indicatorStyle.left}px 0px, transparent 32px, black 33px)`,
              maskImage: `radial-gradient(circle 32px at ${indicatorStyle.left}px 0px, transparent 32px, black 33px)`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />
          <motion.div
            className="pointer-events-none absolute top-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-md"
            animate={{ left: indicatorStyle.left }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ zIndex: 10 }}
          />
          <div className="absolute inset-0 flex h-16 items-center justify-around gap-2 px-4">
            {items.map((item) => {
              const isActive = item.id === activeKey;
              return (
                <button
                  key={item.id}
                    ref={(el) => {
                      itemRefs.current[item.id] = el;
                    }}
                    type="button"
                    onClick={() => handleClick(item)}
                  className="relative flex min-w-[54px] flex-1 flex-col items-center gap-1 transition-colors"
                >
                  <div className="relative z-20 flex h-10 w-10 items-center justify-center">
                    <div
                      className={`[&>svg]:h-6 [&>svg]:w-6 ${
                        isActive ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                        {item.icon}
                      </div>
                    </div>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-gray-700"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      </nav>

      {/* Desktop sidebar */}
      <nav className="hidden h-full flex-col justify-between overflow-y-auto py-4 md:flex">
        <div>
          {topItems.map((item) => {
            const isActive = item.id === activeId;
            return (
              <div
                key={item.id}
                onClick={() => handleClick(item)}
                className={`relative flex cursor-pointer items-center justify-end px-9 py-6 transition-colors duration-200
                  ${isActive ? "bg-muted border-r-4 border-primary" : "hover:bg-muted-foreground"}
                `}
              >
                <span
                  className={`mr-14 whitespace-nowrap text-2xl text-foreground transition-all duration-300
                    ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}
                    ${isActive ? "font-bold" : ""}
                  `}
                >
                  {item.label}
                </span>
                <div className="shrink-0 text-foreground [&>svg]:h-8 [&>svg]:w-8">
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
                  className={`relative flex cursor-pointer items-center justify-end px-9 py-4 transition-colors duration-200
                    ${isActive ? "bg-muted border-r-4 border-primary" : "hover:bg-muted-foreground"}
                  `}
                >
                  <span
                    className={`mr-14 whitespace-nowrap text-2xl text-foreground transition-all duration-300
                      ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}
                      ${isActive ? "font-bold" : ""}
                    `}
                  >
                    {bottomItem.label}
                  </span>
                  <div className="shrink-0 text-foreground [&>svg]:h-8 [&>svg]:w-8">
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
