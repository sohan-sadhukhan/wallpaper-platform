"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "../../lib/nav";
import { Button } from "../shadcnui/button";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Menu Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="transition-colors">
        {isOpen ?
          <X
            className="size-5"
            aria-hidden="true"
          />
        : <Menu
            className="size-5"
            aria-hidden="true"
          />
        }
      </Button>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Content */}
          <nav
            id="mobile-menu"
            className={cn(
              "bg-background fixed top-14 right-0 left-0 z-50 max-h-[calc(100vh-3.5rem)] w-full flex-col gap-4 overflow-y-auto border-t p-4 shadow-lg transition-all duration-300 md:hidden",
              "animate-in fade-in slide-in-from-top-2 duration-300",
            )}
            role="navigation"
            aria-label="Mobile navigation">
            {/* Main Navigation Links */}
            <div className="space-y-2">
              <h2 className="text-muted-foreground px-2 text-xs font-semibold tracking-wide uppercase">
                Navigation
              </h2>
              <ul className="space-y-1">
                {NAV_LINKS.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={handleLinkClick}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                          isActive ?
                            "bg-primary text-primary-foreground shadow-sm"
                          : "text-foreground hover:bg-muted/50 active:bg-muted",
                        )}
                        aria-current={isActive ? "page" : undefined}>
                        <span
                          className={cn(
                            "inline-block h-4 w-1 rounded-full transition-all",
                            isActive ?
                              "bg-primary-foreground"
                            : "bg-transparent",
                          )}
                          aria-hidden="true"
                        />
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
