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
        "group flex flex-col border-border/50 bg-card transition-all duration-300 hover:border-d3-purple/20 hover:shadow-lg hover:shadow-d3-purple/5 hover:-translate-y-1 [--card-spacing:--spacing(8)]",
        className
      )}
    >
      <CardHeader className="gap-8">
        {icon && (
          <div className="flex h-16 w-16 items-center mx-auto justify-center rounded-lg bg-d3-purple/10 text-d3-purple transition-colors duration-300 group-hover:bg-d3-purple group-hover:text-white">
            {icon}
          </div>
        )}
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="text-sm text-center leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
      {footer && <CardFooter className="mt-auto pt-4">{footer}</CardFooter>}
    </Card>
  );
}
