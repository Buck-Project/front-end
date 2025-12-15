import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Search, Filter, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: string;
  statusColor: string;
  items: number;
}

export function OrderManagement() {
  const [filterStatus, setFilterStatus] = useState("all");

  const orders: Order[] = [
    {
      id: "#ORD-2024-101",
      customer: "محمد رضایی",
      date: "۱۴۰۳/۰۸/۱۵",
      amount: "۲,۴۵۰,۰۰۰",
      status: "در حال پردازش",
      statusColor: "bg-accent",
      items: 3,
    },
    {
      id: "#ORD-2024-102",
      customer: "زهرا محمدی",
      date: "۱۴۰۳/۰۸/۱۵",
      amount: "۱,۲۰۰,۰۰۰",
      status: "ارسال شده",
      statusColor: "bg-blue-500",
      items: 2,
    },
    {
      id: "#ORD-2024-103",
      customer: "علی احمدی",
      date: "۱۴۰۳/۰۸/۱۴",
      amount: "۳,۱۵۰,۰۰۰",
      status: "تحویل داده شده",
      statusColor: "bg-green-500",
      items: 5,
    },
    {
      id: "#ORD-2024-104",
      customer: "فاطمه حسینی",
      date: "۱۴۰۳/۰۸/۱۴",
      amount: "۹۸۰,۰۰۰",
      status: "در حال پردازش",
      statusColor: "bg-accent",
      items: 1,
    },
    {
      id: "#ORD-2024-105",
      customer: "حسین کریمی",
      date: "۱۴۰۳/۰۸/۱۳",
      amount: "۱,۸۵۰,۰۰۰",
      status: "لغو شده",
      statusColor: "bg-red-500",
      items: 2,
    },
  ];

  const OrderDetailsDialog = ({ order }: { order: Order }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>جزئیات سفارش {order.id}</DialogTitle>
        <DialogDescription>
          اطلاعات کامل سفارش مشتری
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>
              مشتری
            </p>
            <p style={{ fontSize: "14px", fontWeight: 600 }}>{order.customer}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>
              تاریخ
            </p>
            <p style={{ fontSize: "14px", fontWeight: 600 }}>{order.date}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>
              مبلغ کل
            </p>
            <p style={{ fontSize: "14px", fontWeight: 600 }}>{order.amount} تومان</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>
              وضعیت
            </p>
            <Badge className={`${order.statusColor} text-white border-0`}>
              {order.status}
            </Badge>
          </div>
        </div>

        <div>
          <h4 className="mb-3" style={{ fontSize: "14px", fontWeight: 600 }}>
            محصولات سفارش
          </h4>
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-secondary"></div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600 }}>
                      پیراهن مجلسی - سایز L
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                      تعداد: ۱
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: "14px", fontWeight: 600 }}>
                  ۸۵۰,۰۰۰ تومان
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3" style={{ fontSize: "14px", fontWeight: 600 }}>
            تایم‌لاین ارسال
          </h4>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600 }}>سفارش ثبت شد</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                  ۱۴۰۳/۰۸/۱۵ - ۱۰:۳۰
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600 }}>در حال پردازش</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                  ۱۴۰۳/۰۸/۱۵ - ۱۴:۰۰
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
              <div>
                <p className="text-muted-foreground" style={{ fontSize: "14px" }}>
                  آماده ارسال
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Select defaultValue="processing">
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="processing">در حال پردازش</SelectItem>
              <SelectItem value="shipped">ارسال شده</SelectItem>
              <SelectItem value="delivered">تحویل داده شده</SelectItem>
              <SelectItem value="cancelled">لغو شده</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90">
            به‌روزرسانی وضعیت
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="text-right">
        <h1 style={{ fontSize: "28px", fontWeight: 700 }}>
          مدیریت سفارشات
        </h1>
        <p className="text-muted-foreground mt-2" style={{ fontSize: "14px" }}>
          مشاهده و مدیریت سفارشات مشتریان
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>
            کل سفارشات
          </p>
          <p style={{ fontSize: "22px", fontWeight: 700 }}>۱۵۸</p>
        </Card>
        <Card className="p-4">
          <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>
            در حال پردازش
          </p>
          <p style={{ fontSize: "22px", fontWeight: 700 }}>۱۲</p>
        </Card>
        <Card className="p-4">
          <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>
            ارسال شده
          </p>
          <p style={{ fontSize: "22px", fontWeight: 700 }}>۸</p>
        </Card>
        <Card className="p-4">
          <p className="text-muted-foreground mb-1" style={{ fontSize: "12px" }}>
            تحویل داده شده
          </p>
          <p style={{ fontSize: "22px", fontWeight: 700 }}>۱۳۵</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4 flex-row-reverse">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                name="search" 
                placeholder="جستجوی سفارشات..." 
                className="pr-10" />
            </div>
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="همه وضعیت‌ها" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه وضعیت‌ها</SelectItem>
              <SelectItem value="processing">در حال پردازش</SelectItem>
              <SelectItem value="shipped">ارسال شده</SelectItem>
              <SelectItem value="delivered">تحویل داده شده</SelectItem>
              <SelectItem value="cancelled">لغو شده</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="w-4 h-4 ml-2" />
            فیلترها
          </Button>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">شماره سفارش</TableHead>
              <TableHead className="text-right">مشتری</TableHead>
              <TableHead className="text-right">تاریخ</TableHead>
              <TableHead className="text-right">تعداد</TableHead>
              <TableHead className="text-right">مبلغ</TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
              <TableHead className="text-right">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell style={{ fontWeight: 600 }}>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items} محصول</TableCell>
                <TableCell style={{ fontWeight: 600 }}>
                  {order.amount} تومان
                </TableCell>
                <TableCell>
                  <Badge className={`${order.statusColor} text-white border-0`}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 ml-1" />
                        جزئیات
                      </Button>
                    </DialogTrigger>
                    <OrderDetailsDialog order={order} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}