import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { TStrapiUserData } from "@/types";
import { AuthLogoutButton } from "./auth-logout-button";
import { cn } from "@/lib/utils";

interface IAuthUserNavButtonProps {
  user: TStrapiUserData;
  className?: string;
}

export function AuthUserNavButton({ user, className } : IAuthUserNavButtonProps) {
  return (
    <div className={cn("items-center gap-2 md:flex", className)}>
      {user?.username}
      <Button asChild className="w-8 h-8 rounded-full">
        <Link href="/dashboard/profile" className="cursor-pointer">
          {user?.username[0].toLocaleUpperCase()}
        </Link>
      </Button>
      <AuthLogoutButton />
    </div>
  );
}
