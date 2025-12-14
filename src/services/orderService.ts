import { getData } from "@/services/services";
import type { OrderHistoryData } from "@/types/orderTypes";

/** دریافت تاریخچه سفارشات */
export const getOrderHistory = (): Promise<OrderHistoryData> => {
  // ⚠️ مسیر موقت — بعداً جایگزین شود
  return getData({ endPoint: "/api/user/orders" }) as Promise<OrderHistoryData>;
};
