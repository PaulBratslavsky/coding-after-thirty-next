import { StrapiUserProfileData, StrapiUserData } from "@/types/user";
import { getUserMeLoader, getUserProfileByIdLoader } from "@/lib/services/user";
import { notFound } from "next/navigation";

async function loader(): Promise<{ profile: StrapiUserProfileData, user: StrapiUserData }> {
  const response = await getUserMeLoader();
  
  console.log(response)
  const profileUserId = response?.data?.userProfile?.documentId;

  if (!profileUserId) return notFound();

  try {
    const response = await getUserProfileByIdLoader(profileUserId) 
    return { profile: response?.data?.data || null,
      user: response.data
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