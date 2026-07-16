import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "default" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "default",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      {eyebrow && (
        <span className="inline-block rounded-full bg-d3-purple/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-d3-purple">
          {eyebrow}
        </span>
      )}
      <h2 className={cn(
        "text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl",
        tone === "light" ? "text-white" : "text-foreground"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "max-w-2xl text-base leading-relaxed md:text-lg",
          tone === "light" ? "text-white/70" : "text-muted-foreground"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
