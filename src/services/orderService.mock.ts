// src/services/orderService.mock.ts
// -------------------------------------------
// MOCK Service  ❗ بدون API
// -------------------------------------------

import type { OrderHistoryData, OrderDetailsType } from "@/types/orderTypes";
export const getOrderHistory = async (): Promise<OrderHistoryData> => {
  return {
    current: [
      {
        id: "#ORD-2024-001",
        date: "۱۴۰۳/۰۸/۱۵",
        amount: "۲,۴۵۰,۰۰۰",
        status: "در حال ارسال",
        items: 3,
        statusColor: "bg-blue-500",
      },
      {
        id: "#ORD-2024-002",
        date: "۱۴۰۳/۰۸/۱۰",
        amount: "۱,۲۰۰,۰۰۰",
        status: "در حال پردازش",
        items: 2,
        statusColor: "bg-orange-400",
      },
    ],
    past: [
      {
        id: "#ORD-2024-003",
        date: "۱۴۰۳/۰۸/۰۵",
        amount: "۳,۱۵۰,۰۰۰",
        status: "تحویل داده شده",
        items: 5,
        statusColor: "bg-green-500",
      },
      {
        id: "#ORD-2024-004",
        date: "۱۴۰۳/۰۷/۲۸",
        amount: "۹۸۰,۰۰۰",
        status: "تحویل داده شده",
        items: 1,
        statusColor: "bg-green-500",
      },
    ],
    cancelled: [
      {
        id: "#ORD-2024-006",
        date: "۱۴۰۳/۰۷/۱۵",
        amount: "۱,۵۰۰,۰۰۰",
        status: "لغو شده",
        items: 2,
        statusColor: "bg-red-500",
      },
    ],
  };
};

export const getOrderDetails = async (id: string): Promise<OrderDetailsType> => {
  return {
    id,
    orderDate: "۱۴۰۳/۰۸/۱۰",
    totalPrice: "۱,۲۴۰,۰۰۰",
    items: [
      {
        id: "P-101",
        name: "تیشرت مردانه مشکی",
        image: "/images/sample-product.jpg",
        size: "L",
        color: "مشکی",
        quantity: 1,
        price: "۶۲۰,۰۰۰",
      },
      {
        id: "P-102",
        name: "شلوار کتان طوسی",
        image: "/images/sample-product.jpg",
        size: "M",
        color: "طوسی",
        quantity: 1,
        price: "۶۲۰,۰۰۰",
      },
    ],
  };
};