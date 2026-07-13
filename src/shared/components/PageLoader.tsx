import { Loader2 } from "lucide-react";

export function PageLoader() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <Loader2
          className="h-8 w-8 animate-spin text-d3-purple"
          role="status"
          aria-label="Carregando"
        />
        <span className="text-sm text-muted-foreground">Carregando...</span>
      </div>
    </div>
  );
}
