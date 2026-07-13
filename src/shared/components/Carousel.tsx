import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      
      <div className="mt-4 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={goPrev}
          disabled={!canGoPrev}
          onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, "prev")}
          aria-label="Item anterior"
          className={cn("rounded-full h-10 w-10", !canGoPrev && "opacity-50")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={goNext}
          disabled={!canGoNext}
          onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, "next")}
          aria-label="Próximo item"
          className={cn("rounded-full h-10 w-10", !canGoNext && "opacity-50")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
