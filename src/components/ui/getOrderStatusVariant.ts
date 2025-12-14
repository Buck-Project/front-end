import type { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/components/ui/badge";

export const getOrderStatusVariant = (status: string): VariantProps<typeof badgeVariants>["variant"] => {
  switch (status) {
    case "در حال پردازش":
      return "secondary"; // نارنجی
    case "در حال ارسال":
      return "default"; // آبی
    case "تحویل داده شده":
      return "destructive"; // سبز (می‌تونی تغییر بدی)
    case "لغو شده":
      return "destructive"; // قرمز
    default:
      return "outline"; // خاکستری
  }
};
