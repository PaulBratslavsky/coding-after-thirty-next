import { getUserMeLoader, getUserProfileByIdLoader } from "@/data-utils/services/user";

async function loader() {
  const userResponse = await getUserMeLoader();
  const profileUserId = userResponse?.data?.userProfile?.documentId;

  let profile = null;

  if (profileUserId) {
    const response = await getUserProfileByIdLoader(profileUserId) 
    profile = response?.data;
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