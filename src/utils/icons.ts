import {
  Code, Globe, Shield, Smartphone, Cloud, Server, Database,
  Monitor, Palette, LineChart, Users, Cog, Search, Zap,
  BarChart3, Lock, Wifi, Cpu, HardDrive, Layers,
} from "lucide-react";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Code, Globe, Shield, Smartphone, Cloud, Server, Database,
  Monitor, Palette, LineChart, Users, Cog, Search, Zap,
  BarChart3, Lock, Wifi, Cpu, HardDrive, Layers,
};

export function getIcon(name: string): ComponentType<{ className?: string }> | null {
  return iconMap[name] ?? null;
}

export const iconOptions = Object.keys(iconMap).sort();
