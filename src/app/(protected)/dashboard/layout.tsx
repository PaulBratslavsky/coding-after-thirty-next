import { Header } from "@/components/custom/header/header";
import { getUserMeLoader } from "@/lib/services/user";

// Force dynamic rendering for the entire app
export const dynamic = "force-dynamic"

async function loader() {
  try {
    const user = await getUserMeLoader();
    return user?.data;
  } catch (error) {
    console.error("Failed to load user:", error);
    throw error;
  }
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await loader();
  return (
    <main>
      <Header user={user} />
      {children}
    </main>
  );
}
