import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ItemsPerView = {
  base: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemsPerView?: ItemsPerView;
};

const BREAKPOINTS: Array<{ min: number; key: keyof ItemsPerView }> = [
  { min: 1280, key: "xl" },
  { min: 1024, key: "lg" },
  { min: 768, key: "md" },
  { min: 640, key: "sm" },
];

function computePerView(viewport: number, cfg: ItemsPerView): number {
  for (const bp of BREAKPOINTS) {
    if (viewport >= bp.min && cfg[bp.key] != null) return cfg[bp.key] as number;
  }
  return cfg.base;
}

export function Carousel<T>({ items, renderItem, itemsPerView = { base: 1, md: 3 } }: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewport, setViewport] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    function onResize() {
      setViewport(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const perView = computePerView(viewport, itemsPerView);
  const maxIndex = Math.max(0, items.length - perView);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, Math.max(0, items.length - perView)));
  }, [perView, items.length]);

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
          "absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-[120%] rounded-full h-10 w-10 bg-[#0a0a0a] border border-[#7c3aed]/40 text-[#a78bfa] shadow-md flex items-center justify-center hover:bg-[#7c3aed] hover:text-white transition-colors",
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
          "absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-[120%] rounded-full h-10 w-10 bg-[#0a0a0a] border border-[#7c3aed]/40 text-[#a78bfa] shadow-md flex items-center justify-center hover:bg-[#7c3aed] hover:text-white transition-colors",
          !canGoNext && "hidden"
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}