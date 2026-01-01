import type { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

// Map API status strings (English or Persian) to badge variants
export const getOrderStatusVariant = (
  status: string
): VariantProps<typeof badgeVariants>["variant"] => {
  const normalized = status?.trim().toLowerCase();

  if (!normalized) return "secondary";
  if (normalized.includes("???") || normalized.includes("cancel")) return "destructive";
  if (normalized.includes("?????") || normalized.includes("deliver")) return "default";
  if (
    normalized.includes("?? ??? ??????") ||
    normalized.includes("?? ??? ?????") ||
    normalized.includes("processing") ||
    normalized.includes("ship") ||
    normalized.includes("?????") ||
    normalized.includes("??????")
  ) {
    return "secondary";
  }
  return "secondary";
};
