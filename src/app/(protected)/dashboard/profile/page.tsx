import { StrapiUserProfileData, StrapiUserMeProps } from "@/types/user";
import { getUserMeLoader, getUserProfileLoader } from "@/lib/services/user";
import { notFound } from "next/navigation";

async function loader(): Promise<{ profile: StrapiUserProfileData | null, user: StrapiUserMeProps | null }> {
  const user = await getUserMeLoader() ;
  const userId = user.data?.id;
  // const userId = 5;

  if (!userId) return notFound();

  try {
    const response = await getUserProfileLoader(userId) 
    return { profile: response?.data?.data[0]  || null,
      user: user.data
    };
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

export default async function ProfileRoute() {
  const { profile, user } = await loader();
  return (
    <div className="flex flex-col gap-4 p-4">
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}