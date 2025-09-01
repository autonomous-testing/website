import React, { useState, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
  width?: number;
  height?: number;
  placeholder?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  sizes = "100vw",
  width,
  height,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==",
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [webpExists, setWebpExists] = useState(false);

  useEffect(() => {
    if (src) {
      // Check if WebP version exists
      const webpSrc = getWebPSrc(src);
      const webpImg = new Image();
      webpImg.onload = () => {
        setWebpExists(true);
      };
      webpImg.onerror = () => {
        setWebpExists(false);
      };
      webpImg.src = webpSrc;

      // Load the original image
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setImageLoaded(true);
      };
      img.onerror = () => {
        setError(true);
        setImageLoaded(true);
      };
      img.src = src;
    }
  }, [src]);

  // Generate WebP src if the original is PNG/JPG
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.match(/\.(png|jpg|jpeg)$/i)) {
      return originalSrc.replace(/\.(png|jpg|jpeg)$/i, ".webp");
    }
    return originalSrc;
  };

  const webpSrc = getWebPSrc(src);

  return (
    <picture>
      {/* Only show WebP source if the file exists */}
      {webpExists && (
        <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
      )}
      {/* Fallback to original format */}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        loading={loading}
        sizes={sizes}
        width={width}
        height={height}
        onError={() => setError(true)}
      />
    </picture>
  );
};

export default OptimizedImage;
