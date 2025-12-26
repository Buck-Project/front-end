// src/components/product/ProductCard.tsx
import { Heart, ShoppingCart, Star } from "lucide-react";
// ✅ درست (با alias @ درست)
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// ...
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  discount?: number;
}

export function ProductCard({
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  isNew,
  discount,
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && <Badge className="bg-blue-600 hover:bg-blue-700">جدید</Badge>}
          {discount && (
            <Badge className="bg-red-600 hover:bg-red-700">
              {discount}% تخفیف
            </Badge>
          )}
        </div>
        {/* Wishlist Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
        {/* Quick Add to Cart - Shows on Hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <Button className="w-full bg-black hover:bg-gray-800 text-white">
            <ShoppingCart className="w-4 h-4 ml-2" />
            افزودن به سبد خرید
          </Button>
        </div>
      </div>
      {/* Product Info */}
      <div className="p-4">
        <h3 className="mb-2 text-gray-900 line-clamp-2 min-h-[3rem]">{name}</h3>
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-gray-700">{rating}</span>
          </div>
          <span className="text-gray-500">({reviews} نظر)</span>
        </div>
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-gray-900">
            {price.toLocaleString("fa-IR")} تومان
          </span>
          {originalPrice && (
            <span className="text-gray-400 line-through">
              {originalPrice.toLocaleString("fa-IR")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}