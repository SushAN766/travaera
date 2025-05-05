
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const Image = ({ 
  src, 
  alt, 
  className, 
  fallback = "/placeholder.svg", 
  ...props 
}: ImageProps) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      className={cn("object-cover", className)}
      onError={handleError}
      {...props}
    />
  );
};

export default Image;
