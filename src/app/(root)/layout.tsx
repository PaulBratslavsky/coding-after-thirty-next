import { Header } from "@/components/custom/header/header";
import { getUserMeLoader } from "@/data-utils/services/user";

// Force dynamic rendering for the entire app
export const dynamic = "force-dynamic";

async function getCurrentUser() {
  const user = await getUserMeLoader();
  return user?.data;
}

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const user = await getCurrentUser();
  
  return (
    <div>
      <Header user={user} />
      {children}
    </div>
  );
}
