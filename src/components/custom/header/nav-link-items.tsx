"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  navLinks: {
    href: string;
    label: string;
    imgUrl?: string;
  }[];
  isMobile?: boolean;
}

export function NavLinkItems({ navLinks, isMobile }: NavLinkProps) {
  const pathname = usePathname();
  const LinkWrapper = isMobile ? SheetClose : React.Fragment;

  return (
    <nav className={cn(
      "flex",
      isMobile ? "flex-col gap-1" : "items-center gap-6"
    )}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <LinkWrapper key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "group relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all",
                isMobile 
                  ? "w-full hover:bg-accent/50" 
                  : "hover:text-primary",
                isActive && "text-primary"
              )}
            >
              {link.imgUrl && (
                <Image
                  src={link.imgUrl}
                  alt={link.label}
                  width={20}
                  height={20}
                  className={cn(
                    "transition-all",
                    !isActive && "opacity-60 group-hover:opacity-100"
                  )}
                />
              )}
              <span className="relative">
                {link.label}
                {!isMobile && isActive && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary" />
                )}
              </span>
            </Link>
          </LinkWrapper>
        );
      })}
    </nav>
  );
}
