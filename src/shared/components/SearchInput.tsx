import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = "Buscar..." }: Props) {
  return (
    <div className="relative w-full max-w-xs">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 pl-9 pr-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
      />
    </div>
  );
}