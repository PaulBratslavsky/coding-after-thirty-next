"use client";
import { Hamburger } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

import { AuthButton } from "@/components/custom/auth/auth-button";
import { StrapiUserData } from "@/types";
import { NavLinkItems } from "./nav-link-items";
import { ThemeToggle } from "@/components/custom/theme-toggle";
import { StrapiImage } from "@/components/custom/strapi-image";
import { HeaderProps } from "@/types/base";
import { AuthUserNavButton } from "../auth";

interface MobileNavigationProps {
  readonly headerData: HeaderProps;
  readonly user: StrapiUserData | null;
}

export function MobileNavigation({ headerData, user }: MobileNavigationProps) {
  const { logoText, navItems, cta, logoImage } = headerData;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="sm:hidden">
          <Hamburger className="w-9 h-9" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="background-light900_dark200">
        <SheetHeader className="flex items-center justify-between gap-2 px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            {logoImage && (
              <StrapiImage
                src={logoImage.url}
                alt={logoText.label}
                width={32}
                height={32}
                className="rounded-sm dark:invert"
              />
            )}
        
          </Link>

          {/* CTA Button */}
          {cta && (
            <Button asChild variant="outline" size="sm" className="ml-auto w-full my-2">
              <Link href={cta.href} className="cursor-pointer">
                {cta.label}
              </Link>
            </Button>
          )}

          {/* Hidden Title for accessibility */}
          <SheetTitle className="sr-only">Navigation</SheetTitle>
        </SheetHeader>
        <div className="px-6 no-scrollbar flex h-[calc(100vh-4rem)] flex-col justify-between overflow-y-auto">
          <div>
            <NavLinkItems navLinks={navItems} isMobile />
          </div>
        </div>
        <SheetFooter className="flex flex-row gap-2">
          <>{user ? <AuthUserNavButton user={user} /> : <AuthButton label="Sign In" />}</>      
          <ThemeToggle />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export const styles = {
  navbar:
    "flex-between background-light900_dark200 fixed z-50 w-full p-6 shadow-light-300 dark:shadow-none sm:px-12 gap-5",
  link: "flex items-center gap-1",
  logoText: "ml-2 h2-bold font-space-grotesk text-dark-100 dark:text-light-900",
  span: "text-primary-500",
};
