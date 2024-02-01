'use client'

import { HomeIcon, Receipt, PlusCircle } from "lucide-react"
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Gastos',
    href: '/dashboard/expenses',
    icon: Receipt,
  },
  {
    name: 'Crear gasto',
    href: '/dashboard/create-expense',
    icon: PlusCircle,
  },
];

export default function NavLinks() {
  const path = usePathname()
  const { theme } = useTheme()
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const className = `flex h-[48px] grow items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 hover:bg-accent ${path === link.href ? 'bg-accent' : '' }`;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={className}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}