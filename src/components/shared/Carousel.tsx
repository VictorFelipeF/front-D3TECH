import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemsPerView?: { base: number; md: number };
};

export function Carousel<T>({ items, renderItem, itemsPerView = { base: 1, md: 3 } }: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getItemsPerView = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      return itemsPerView.md;
    }
    return itemsPerView.base;
  };

  const perView = getItemsPerView();
  const maxIndex = Math.max(0, items.length - perView);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent, direction: "prev" | "next") => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      direction === "prev" ? goPrev() : goNext();
    }
  };

  if (!items.length) return null;

  return (
    <div className="relative group">
      <div className="overflow-hidden px-1 py-4">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / perView)}%)` }}
        >
          {items.map((item, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / perView}%` }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
      
      <button
        type="button"
        onClick={goPrev}
        onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, "prev")}
        aria-label="Item anterior"
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 rounded-full h-11 w-11 bg-background border border-border shadow-md flex items-center justify-center hover:bg-d3-purple hover:text-white transition-colors",
          !canGoPrev && "hidden"
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={goNext}
        onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, "next")}
        aria-label="Próximo item"
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 rounded-full h-11 w-11 bg-background border border-border shadow-md flex items-center justify-center hover:bg-d3-purple hover:text-white transition-colors",
          !canGoNext && "hidden"
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
