import { StrapiUserProfileData } from "@/types/user";
import { getUserMeLoader, getUserProfileByIdLoader } from "@/lib/services/user";

async function loader(): Promise<{ profile: StrapiUserProfileData | null }> {
  const userResponse = await getUserMeLoader();
  const profileUserId = userResponse?.data?.userProfile?.documentId;

  let profile = null;

  if (profileUserId) {
    try {
      const response = await getUserProfileByIdLoader(profileUserId) 
      profile = response?.data;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  return { 
      profile: profile,
    };
}

export default async function ProfileRoute() {
  const { profile } = await loader();
  return (
    <div className="flex flex-col gap-4 p-4">
      { profile ? <pre>{JSON.stringify(profile, null, 2)}</pre> : <pre>No profile found.</pre>}
    </div>
  );
}