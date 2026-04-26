"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../../lib/nav";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../shadcnui/navigation-menu";

const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation">
      {/* ── Main page links ── */}
      <NavigationMenu>
        <NavigationMenuList>
          {NAV_LINKS.map(({ href, label }) => (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink
                href={href}
                data-active={pathname === href}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent hover:bg-transparent",
                  pathname === href &&
                    "text-foreground font-semibold underline underline-offset-4",
                )}>
                {label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default DesktopNav;
