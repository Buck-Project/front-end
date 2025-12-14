"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Clock, CheckCircle, XCircle, Eye } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

import { translateNumber } from "@/utils/translateNumber";
import type { OrderHistoryData, OrderDetailsType } from "@/types/orderTypes";

// 🔵 NEW — گرفتن جزئیات سفارش از سرویس Mock یا API
import { getOrderDetails } from "@/services/brandService.mock.ts";

// 🔵 NEW — مدال
import { OrderDetailsModal } from "@/components/OrderHistory/OrderDetailsModal";

// 🔵 NEW — اسپینر هنگام لود جزئیات
import { Spinner } from "@/components/ui/Spinner";

// 🔵 NEW — تابع نگاشت وضعیت به رنگ Badge
import { getOrderStatusVariant } from "@/components/ui/getOrderStatusVariant";

export function OrderHistory({ data }: { data: OrderHistoryData }) {
  const [activeTab, setActiveTab] = useState<string>("current");

  const [selectedOrder, setSelectedOrder] = useState<OrderDetailsType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

  const userData = {
    fullName: "علی رضایی",
    profileUrl: "/images/sample-user.jpg",
  };

  const openOrderModal = async (order: any) => {
    try {
      setIsModalOpen(true);
      setSelectedOrder(null);
      setLoadingDetails(true);

      const details = await getOrderDetails(order.id);

      setSelectedOrder(details);
    } catch (err) {
      console.error("Error loading order details:", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const renderOrderTable = (orders: OrderHistoryData["current"]) => (
    <Card className="overflow-hidden rounded-[5px]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right vazir font-medium text-foreground py-3 px-4 whitespace-nowrap">جزئیات</TableHead>
              <TableHead className="text-right vazir font-medium text-foreground py-3 px-4 whitespace-nowrap">وضعیت</TableHead>
              <TableHead className="text-right vazir font-medium text-foreground py-3 px-4 whitespace-nowrap">مبلغ</TableHead>
              <TableHead className="text-right vazir font-medium text-foreground py-3 px-4 whitespace-nowrap">تعداد اقلام</TableHead>
              <TableHead className="text-right vazir text-muted-foreground text-sm py-3 px-4 whitespace-nowrap">تاریخ</TableHead>
              <TableHead className="text-right vazir font-medium text-foreground py-3 px-4 whitespace-nowrap">شماره سفارش</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="vazir hover:bg-muted/30">

                <TableCell className="text-right py-3 px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="vazir"
                    onClick={() => openOrderModal(order)}
                  >
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TableCell>

                <TableCell className="text-right py-3 px-4">
                  {/* 🔹 اینجا تغییر دادیم: رنگ Badge بر اساس وضعیت */}
                  <Badge
                    className="text-white border-0 vazir"
                    variant={getOrderStatusVariant(order.status)}
                  >
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right font-bold py-3 px-4">
                  {translateNumber(order.amount)} تومان
                </TableCell>

                <TableCell className="text-right py-3 px-4">
                  {translateNumber(order.items)}
                </TableCell>

                <TableCell className="text-right text-muted-foreground text-sm py-3 px-4">
                  {translateNumber(order.date)}
                </TableCell>

                <TableCell className="text-right font-bold py-3 px-4 whitespace-nowrap">
                  {order.id}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );

  return (
    <>
      <div className="container mx-auto px-4 py-6 space-y-8 rtl vazir">

        {/* هدر */}
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-start items-center sm:items-start gap-4 mb-6 rtl">
          <div className="w-12 h-12 rounded-full border border-border overflow-hidden flex-shrink-0">
            {userData?.profileUrl ? (
              <img
                src={userData.profileUrl}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                USER
              </div>
            )}
          </div>

          <div className="flex flex-col items-start flex-1 min-w-0">
            <h3 className="font-extrabold text-foreground text-xl truncate">
              {userData?.fullName || "نام کاربر"}
            </h3>
            <p className="text-muted-foreground text-sm truncate mt-0.5">
              تاریخچه سفارشات و پیگیری
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/60 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs md:text-sm">سفارشات فعال</p>
                <p className="text-2xl font-bold">{translateNumber(data.current.length)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/60 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs md:text-sm">تکمیل شده</p>
                <p className="text-2xl font-bold">{translateNumber(data.past.length)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-500/60 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs md:text-sm">لغو شده</p>
                <p className="text-2xl font-bold">{translateNumber(data.cancelled.length)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mx-auto w-full max-w-md flex justify-center rounded-xl-50 bg-muted p-1 vazir">
              <TabsTrigger value="current" className="flex-1 px-3 py-2 text-sm font-medium">
                در حال پردازش
              </TabsTrigger>
              <TabsTrigger value="past" className="flex-1 px-3 py-2 text-sm font-medium">
                تحویل شده
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="flex-1 px-3 py-2 text-sm font-medium">
                لغو شده
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-6">
              {data.current.length > 0 ? (
                renderOrderTable(data.current)
              ) : (
                <Card className="py-12 text-center text-muted-foreground vazir">
                  سفارشی در حال پردازش وجود ندارد.
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              {data.past.length > 0 ? (
                renderOrderTable(data.past)
              ) : (
                <Card className="py-12 text-center text-muted-foreground vazir">
                  هیچ سفارش تحویل‌شده‌ای وجود ندارد.
                </Card>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="mt-6">
              {data.cancelled.length > 0 ? (
                renderOrderTable(data.cancelled)
              ) : (
                <Card className="py-12 text-center text-muted-foreground vazir">
                  سفارش لغو‌شده‌ای وجود ندارد.
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* مدال */}
      {isModalOpen && (
        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={
            loadingDetails
              ? { orderId: "", orderDate: "", totalPrice: "", items: [] }
              : (selectedOrder as OrderDetailsType)
          }
        />
      )}

      {/* اسپینر هنگام لود */}
      {isModalOpen && loadingDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-[60]">
          <Spinner />
        </div>
      )}
    </>
  );
}
