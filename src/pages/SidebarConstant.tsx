// src/constants/sidebarItems.ts
import type { NavItem } from '@/types/sidebarTypes';
import { Home, User, Settings, LogOut } from 'lucide-react'; // ÛŒØ§ Ù‡Ø± Ø¢ÛŒÚ©ÙˆÙ†ÛŒ Ú©Ù‡ Ø§Ø³ØªÙØ§Ø¯Ù‡ Ù…ÛŒâ€ŒÚ©Ù†ÛŒØ¯
import { useNavigate } from 'react-router-dom'; // âš ï¸ ÙÙ‚Ø· Ø¯Ø§Ø®Ù„ Ú©Ø§Ù…Ù¾ÙˆÙ†Ù†Øª Ù…ÛŒâ€ŒØ´ÙˆØ¯ Ø§Ø³ØªÙØ§Ø¯Ù‡ Ú©Ø±Ø¯

// â— ØªÙˆØ¬Ù‡: onClick Ù†Ù…ÛŒâ€ŒØªÙˆØ§Ù†Ø¯ Ù…Ø³ØªÙ‚ÛŒÙ…Ø§Ù‹ Ø¯Ø± Ø§ÛŒÙ†Ø¬Ø§ Ø¨Ø§ useNavigate Ø¨Ø§Ø´Ø¯ (Ú†ÙˆÙ† ØºÛŒØ± Ø§Ø² Ú©Ø§Ù…Ù¾ÙˆÙ†Ù†Øª Ø§Ø³Øª)
// Ù¾Ø³ onClick Ø±Ø§ Ø¨Ø¹Ø¯Ø§Ù‹ Ø¯Ø± Ú©Ø§Ù…Ù¾ÙˆÙ†Ù†Øª Sidebar Ø³Øª Ú©Ù†ÛŒØ¯ â€” ÛŒØ§ ÙÙ‚Ø· path Ø°Ø®ÛŒØ±Ù‡ Ú©Ù†ÛŒØ¯

export const DASHBOARD_SIDEBAR_ITEMS: Omit<NavItem, 'onClick'>[] = [
  { id: 'home', label: 'Ø®Ø§Ù†Ù‡', icon: <Home size={24} />, path: '/dash' },
  { id: 'profile', label: 'Ù¾Ø±ÙˆÙØ§ÛŒÙ„', icon: <User size={24} />, path: '/dash/profile' },
  { id: 'settings', label: 'ØªÙ†Ø¸ÛŒÙ…Ø§Øª', icon: <Settings size={24} />, path: '/dash/settings' },
  { id: 'logout', label: 'Ø®Ø±ÙˆØ¬', icon: <LogOut size={24} />, path: '/logout' }, // Ù…Ø«Ù„Ø§Ù‹
];

export const USER_DASHBOARD_SIDEBAR_ITEMS = DASHBOARD_SIDEBAR_ITEMS;
export const BRAND_DASHBOARD_SIDEBAR_ITEMS = DASHBOARD_SIDEBAR_ITEMS;

