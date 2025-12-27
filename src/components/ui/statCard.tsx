import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card } from "../ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  iconColor = "#4DA6FF",
}: StatCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between flex-row-reverse">
        <div className="flex-1 text-right">
          <p className="text-muted-foreground mb-2" style={{ fontSize: "14px" }}>
            {title}
          </p>
          <h3 style={{ fontSize: "28px", fontWeight: 700 }}>{value}</h3>
          {trend && (
            <div
              className={`mt-2 inline-flex items-center gap-1 ${trend.isPositive ? "text-green-600" : "text-red-600"}`}
              style={{ fontSize: "12px", fontWeight: 500 }}
            >
              {trend.isPositive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
      </div>
    </Card>
  );
}
