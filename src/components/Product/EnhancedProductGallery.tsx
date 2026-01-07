// src/components/product/EnhancedProductGallery.tsx
import { useState } from "react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EnhancedProductGalleryProps {
  images: string[];
  hasVideo?: boolean;
}

export function EnhancedProductGallery({
  images,
  hasVideo = false,
}: EnhancedProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevious = () => {
    setSelectedImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Main Image with Zoom */}
        <div
          className="relative bg-gray-100 rounded-xl overflow-hidden group cursor-crosshair border-4 border-blue-500"
          style={{ width: "885px", height: "885px" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <ImageWithFallback
            src={images[selectedImage]}
            alt="Product"
            className="w-full h-full object-cover transition-transform duration-300"
            style={{
              transform: isZoomed ? `scale(2)` : "scale(1)",
              transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
            }}
          />
          {/* Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Badge className="bg-red-600 hover:bg-red-700">۲۹٪ تخفیف</Badge>
            <Badge className="bg-green-600 hover:bg-green-700">جدید</Badge>
          </div>
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>
          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Maximize2 className="w-5 h-5 text-gray-900" />
          </button>
          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
            {selectedImage + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails with Video */}
        <div className="flex gap-6 justify-start">
          {images.slice(0, 3).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative rounded-2xl overflow-hidden transition-all ${
                selectedImage === index
                  ? "border-4 border-blue-500"
                  : "border-4 border-gray-200 hover:border-gray-300"
              }`}
              style={{ width: "292px", height: "292px" }}
            >
              <ImageWithFallback
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover bg-gray-200"
              />
            </button>
          ))}
          {hasVideo && (
            <button
              className="relative rounded-2xl overflow-hidden border-4 border-gray-200 hover:border-orange-400 transition-all group"
              style={{ width: "292px", height: "292px" }}
            >
              <div className="w-full h-full bg-orange-400 flex items-center justify-center">
                <Play className="w-16 h-16 text-white fill-white" />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <ImageWithFallback
            src={images[selectedImage]}
            alt="Product Fullscreen"
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={handlePrevious}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}
    </>
  );
}