import React from "react";

interface CardCarouselProps {
  src: string;
  alt?: string;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ src, alt }) => {
  return (
    <div
      className="
        bg-white rounded-2xl shadow-md flex items-center justify-center
        w-full h-full p-3 sm:p-4 
      "
    >
      <img
        src={src}
        alt={alt}
        className="w-auto h-auto max-w-[85%] max-h-[65%] object-contain"
        draggable={false}
      />
    </div>
  );
};

export default CardCarousel;
