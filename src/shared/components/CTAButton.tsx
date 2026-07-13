import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type React from "react";

type CTAButtonProps = {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
};

export function CTAButton({ to, children, variant = "primary" }: CTAButtonProps) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-d3-purple focus-visible:ring-offset-2",
        variant === "primary" &&
          "bg-d3-purple text-white shadow-md shadow-d3-purple/25 hover:bg-d3-purple-light hover:shadow-lg hover:shadow-d3-purple/30 hover:-translate-y-px active:translate-y-0",
        variant === "outline" &&
          "border-2 border-d3-purple/30 bg-transparent text-d3-purple hover:border-d3-purple hover:bg-d3-purple/5"
      )}
    >
      {children}
    </Link>
  );
}
