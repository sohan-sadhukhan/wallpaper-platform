import { auth } from "@/lib/auth";
import { AUTH_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b shadow backdrop-blur-2xl"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href={"/"}>
          <Image
            src="/logo.webp"
            alt="Wallpaper App Logo"
            width={120}
            height={40}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>

        {session?.session && (
          <div>
            <div className="hidden items-center gap-4 md:flex">
              {/* Desktop navigation */}
              <DesktopNav />
              <ThemeToggleButton />
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggleButton />
              {/* Mobile drawer trigger */}
              <MobileMenu />
            </div>
          </div>
        )}

        {!session?.session && (
          <div className="flex items-center gap-2 sm:gap-4">
            {/* ── Auth buttons ── */}
            {AUTH_LINKS.map(({ href, label }, index) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex h-7 items-center justify-center gap-1 rounded-lg border border-transparent bg-clip-padding px-2.5 text-sm text-[0.8rem] font-medium whitespace-nowrap transition-all outline-none select-none",
                  index === 0 ?
                    "border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
                  : "bg-primary text-primary-foreground hover:bg-primary/80",
                )}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
