import { useState } from "react";
import SettingsTabs from "@/components/BrandDash/Notifications/SettingsTabs";
import ShipmentsSettings from "@/components/BrandDash/Notifications/ShipmentsSettings";
import NotificationsSettings from "@/components/BrandDash/Notifications/NotificationsSettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "shipments" | "notifications"
  >("shipments");

  return (
    <div className="mx-auto max-w-2xl p-6">
        <div className="mb-4 flex items-center gap-3" dir="rtl">
              <img
                src="/avatar.png"
                className="w-10 h-10 rounded-full"
                alt="brand"
              />
              <div className="text-right">
                <div className="font-bold">نام برند</div>
                <div className="text-xs text-muted-foreground">
                  مدیریت تنظیمات برند
                </div>
              </div>
            </div>
      <SettingsTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "shipments" ? (
        <ShipmentsSettings />
      ) : (
        <NotificationsSettings />
      )}
    </div>
  );
}