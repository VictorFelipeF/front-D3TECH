import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = "Buscar..." }: Props) {
  return (
    <div className="relative w-full max-w-xs">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 pl-9 pr-3 rounded-none border border-d3-purple/20 bg-white text-sm text-d3-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-d3-purple/30 focus:border-d3-purple/40 transition-all"
      />
    </div>
  );
}