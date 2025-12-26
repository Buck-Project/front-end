// src/components/figma/ImageWithFallback.tsx
import { useState, useEffect } from "react";

export interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}

export function ImageWithFallback({
  src,
  fallbackSrc = "https://placehold.co/600x600/e0e0e0/9ca3af?text=No+Image",
  alt,
  className = "",
  loading = "lazy",
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const onError = () => {
    if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`object-cover ${className}`}
      onError={onError}
      loading={loading}
      {...props}
    />
  );
}