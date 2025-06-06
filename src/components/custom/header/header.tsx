import Link from "next/link";

import { HeaderProps } from "@/app/types";
import { notFound } from "next/navigation";
import { getGlobalPageData } from "@/data-utils/loaders";

import { AuthButton, AuthUserNavButton } from "@/components/custom/auth";
import { Button } from "@/components/ui/button";
import { StrapiUserMeProps } from "@/types";
import { MobileNavigation } from "./mobile-navbar";
import { NavLinkItems } from "./nav-link-items";
import { ThemeToggle } from "../theme-toggle";
import { StrapiImage } from "@/components/custom/strapi-image";

async function loader(): Promise<HeaderProps> {
  try {
    const data = await getGlobalPageData();
    if (!data?.data) notFound();
    return data?.data?.header;
  } catch (error) {
    console.error("Failed to load global data:", error);
    throw error;
  }
}

export async function Header({ user }: Readonly<StrapiUserMeProps>) {
  console.log("user", user);
  const headerData = await loader();
  const { logoText, navItems, cta, showSignUp, logoImage } = headerData;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={logoText.href} className="flex items-center gap-3">
          {logoImage && (
            <StrapiImage
              src={logoImage.url}
              alt={logoText.label}
              width={26}
              height={26}
              className="rounded-sm dark:invert"
            />
          )}
          <span className="text-sm md:text-lg lg:text-xl font-heading font-bold text-gray-900 dark:text-white">
            {logoText.label}
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          <nav className="flex items-center gap-6">
            {navItems ? (
              <NavLinkItems navLinks={navItems} />
            ) : (
              <div>No nav items</div>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {cta && (
              <Button asChild variant="outline">
                <Link href={cta.href} className="cursor-pointer">
                  {cta.label}
                </Link>
              </Button>
            )}

            {/* {user && (
              <Button asChild variant="outline">
                <Link href={"/dashboard"} className="cursor-pointer">
                  Dashboard
                </Link>
              </Button>
            )} */}
            
            {showSignUp && (
              <>{user ? <AuthUserNavButton user={user} /> : <AuthButton />}</>
            )}
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <MobileNavigation
            headerData={headerData}
            user={user as unknown as StrapiUserMeProps}
          />
        </div>
      </div>
    </header>
  );
}

export const styles = {
  navbar:
    "flex-between background-light900_dark200 fixed z-50 w-full p-6 shadow-light-300 dark:shadow-none sm:px-12 gap-5",
  link: "flex items-center gap-1",
  logoText: "ml-2 h2-bold font-space-grotesk text-dark-100 dark:text-light-900",
  span: "text-primary-500",
};
