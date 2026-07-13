import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type BaseCardProps = {
  icon?: React.ReactNode;
  title: string;
  description: string;
  footer?: React.ReactNode;
  className?: string;
};

export function BaseCard({ icon, title, description, footer, className }: BaseCardProps) {
  return (
    <Card
      className={cn(
        "group flex flex-col border-border/50 bg-card transition-all duration-300 hover:border-d3-purple/20 hover:shadow-lg hover:shadow-d3-purple/5 hover:-translate-y-1",
        className
      )}
    >
      <CardHeader className="gap-3">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-d3-purple/10 text-d3-purple transition-colors duration-300 group-hover:bg-d3-purple group-hover:text-white">
            {icon}
          </div>
        )}
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
      {footer && <CardFooter className="mt-auto pt-4">{footer}</CardFooter>}
    </Card>
  );
}
