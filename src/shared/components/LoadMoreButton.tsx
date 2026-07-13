
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type LoadMoreButtonProps = {
  onClick: () => void;
  isLoading?: boolean;
  label?: string;
};

export function LoadMoreButton({ onClick, isLoading, label = "Carregar mais" }: LoadMoreButtonProps) {
  return (
    <div className="mt-8 flex justify-center">
      <Button 
        variant="outline" 
        onClick={onClick} 
        disabled={isLoading}
        className="min-w-[200px]"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Carregando...
          </>
        ) : (
          label
        )}
      </Button>
    </div>
  );
}
