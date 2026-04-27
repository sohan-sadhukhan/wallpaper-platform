"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../../lib/nav";

const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden items-center gap-2 md:flex">
      {NAV_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "hover:text-primary rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname === href &&
              "text-foreground font-semibold underline underline-offset-4",
          )}>
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNav;
