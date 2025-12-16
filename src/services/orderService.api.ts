import { getData } from "@/services/services";
import type { OrderHistoryData, OrderDetailsType, Order, OrderItem } from "@/types/orderTypes";

/**
 * GET /orders-consumer
 * Header: Authorization: Bearer <token>
 */
const END_POINT = "/orders-consumer";

const mapToOrderHistory = (order: any): Order => ({
  id: order?.id ?? order?.id ?? "",
  date: order?.orderDate ?? "",
  amount: order?.totalprice !== undefined ? String(order.totalprice) : "",
  status: order?.status ?? order?.orderStatus ?? "processing",
  items:
    typeof order?.items === "number"
      ? order.items
      : Array.isArray(order?.items)
      ? order.items.length
      : Number(order?.items?.length ?? 0),
  // statusColor: "bg-blue-500",
});

const mapItems = (items: any): OrderItem[] => {
  // Accept array, { items: [] }, object with keyed items (details), or single object; ignore numeric counts
  let arr: any[] = [];

  if (Array.isArray(items)) {
    arr = items;
  } else if (items && typeof items === "object") {
    if (Array.isArray(items.items)) {
      arr = items.items;
    } else {
      const values = Object.values(items);
      const hasObjectValues = values.some((v) => v && typeof v === "object");
      arr = hasObjectValues ? values : [items];
    }
  }

  return arr.map((item: any) => ({
    id: item?.id ?? item?.productId ?? "",
    name: item?.name ?? "",
    image: item?.image ?? "",
    size: item?.size ?? "",
    color: item?.color ?? "",
    cost: item?.cost !== undefined ? String(item.cost) : "",
    count: item?.count !== undefined ? Number(item.count) : 0,
  }));
};

export const getOrderHistory = async (): Promise<OrderHistoryData> => {
  // normalize to expected shape even if API returns a flat list
  const response = (await getData({
    endPoint: END_POINT,
  })) as any;

  if (Array.isArray(response)) {
    return {
      current: response.map(mapToOrderHistory),
      past: [],
      cancelled: [],
    };
  }

  return {
    current: Array.isArray(response?.current)
      ? response.current.map(mapToOrderHistory)
      : [],
    past: Array.isArray(response?.past) ? response.past.map(mapToOrderHistory) : [],
    cancelled: Array.isArray(response?.cancelled)
      ? response.cancelled.map(mapToOrderHistory)
      : [],
  };
};

/**
 * GET /orders-consumer/:orderId
 */
export const getOrderDetails = (
  orderId: string
): Promise<OrderDetailsType> => {
  return getData({
    endPoint: `${END_POINT}/${orderId}`,
  }).then((order: any) => {
    const normalizedOrder = Array.isArray(order) ? order[0] : order;
    const candidateItems =
      normalizedOrder?.details ??
      normalizedOrder?.orderDetails ??
      normalizedOrder?.items;

    return {
      orderId: normalizedOrder?.orderID ?? normalizedOrder?.id ?? "",
      orderDate: normalizedOrder?.orderDate ?? "",
      totalPrice:
        normalizedOrder?.totalprice !== undefined
          ? String(normalizedOrder.totalprice)
          : "",
      items: mapItems(candidateItems),
    };
  }) as Promise<OrderDetailsType>;
};
