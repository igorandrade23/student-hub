import {
  BookOpen,
  CalendarDays,
  FolderOpen,
  LayoutDashboard,
  Megaphone
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Início", icon: LayoutDashboard },
  { href: "/materiais", label: "Materiais", icon: FolderOpen },
  { href: "/calendario", label: "Calendário", icon: CalendarDays },
  { href: "/avisos", label: "Avisos", icon: Megaphone },
  { href: "/revisao", label: "Revisão", icon: BookOpen }
];
