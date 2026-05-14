"use client";

import { cn } from "@/lib/utils";
import { useLinkStatus } from "next/link";

export function NavItem({ label, active }: { label: string; active: boolean }) {
  const { pending } = useLinkStatus();

  return (
    <div className="relative inline-flex flex-col">
      <span className={cn(pending ? `animate-pulse duration-300` : ``)}>
        {label}
      </span>

      {/* Active underline */}
      <div
        className={cn(
          "bg-primary absolute -bottom-1 left-0 h-0.5 w-full transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Pending animation */}
      {pending && (
        <div className="bg-primary absolute -bottom-1 left-0 h-0.5 w-full origin-left animate-pulse" />
      )}
    </div>
  );
}
