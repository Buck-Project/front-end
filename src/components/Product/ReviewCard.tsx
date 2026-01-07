// src/components/product/ReviewCard.tsx
import { Star, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ReviewCardProps {
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  images?: string[];
}

export function ReviewCard({
  name,
  avatar,
  rating,
  date,
  comment,
  helpful,
  images,
}: ReviewCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(helpful);
  const [isHelpful, setIsHelpful] = useState(false);

  const handleHelpful = () => {
    if (!isHelpful) {
      setHelpfulCount(helpfulCount + 1);
      setIsHelpful(true);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-gray-900">{name}</h4>
            <span className="text-gray-500">{date}</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 mb-4 leading-relaxed">{comment}</p>
      {images && images.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100"
            >
              <img
                src={img}
                alt={`Review ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <Button
          variant={isHelpful ? "default" : "outline"}
          size="sm"
          onClick={handleHelpful}
          className="gap-2"
        >
          <ThumbsUp className="w-4 h-4" />
          مفید بود
          <span className="mr-1">({helpfulCount.toLocaleString("fa-IR")})</span>
        </Button>
      </div>
    </div>
  );
}