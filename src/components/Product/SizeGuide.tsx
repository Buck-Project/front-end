// src/components/product/SizeGuide.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";

const sizeData = [
  { size: "S", chest: "۹۲-۹۶", waist: "۷۶-۸۰", hip: "۹۶-۱۰۰" },
  { size: "M", chest: "۹۶-۱۰۰", waist: "۸۰-۸۴", hip: "۱۰۰-۱۰۴" },
  { size: "L", chest: "۱۰۰-۱۰۴", waist: "۸۴-۸۸", hip: "۱۰۴-۱۰۸" },
  { size: "XL", chest: "۱۰۴-۱۰۸", waist: "۸۸-۹۲", hip: "۱۰۸-۱۱۲" },
  { size: "XXL", chest: "۱۰۸-۱۱۲", waist: "۹۲-۹۶", hip: "۱۱۲-۱۱۶" },
];

export function SizeGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto text-indigo-600">
          <Ruler className="w-4 h-4 ml-1" />
          راهنمای انتخاب سایز
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>راهنمای انتخاب سایز</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-right">سایز</th>
                  <th className="border border-gray-200 px-4 py-3 text-right">
                    دور سینه (سانتی‌متر)
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-right">
                    دور کمر (سانتی‌متر)
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-right">
                    دور باسن (سانتی‌متر)
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row) => (
                  <tr key={row.size} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">{row.size}</td>
                    <td className="border border-gray-200 px-4 py-3">{row.chest}</td>
                    <td className="border border-gray-200 px-4 py-3">{row.waist}</td>
                    <td className="border border-gray-200 px-4 py-3">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-blue-900 mb-2">نکات مهم:</h4>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>اندازه‌گیری را روی لباس زیر انجام دهید</li>
              <li>متر را محکم اما بدون فشار نگه دارید</li>
              <li>در صورت تردید، سایز بزرگ‌تر را انتخاب کنید</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}