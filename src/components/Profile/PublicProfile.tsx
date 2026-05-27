import { CachedPublicProfileInfo } from "@/lib/data";
import { notFound } from "next/navigation";
import ProfileSection from "./ProfileSection";

const PublicProfile = async ({ username }: { username: string }) => {
  const userInfo = await CachedPublicProfileInfo(username);

  if (!userInfo) {
    notFound();
  }

  return (
    <ProfileSection
      avatar={userInfo.image}
      bio={userInfo.bio}
      cover={userInfo.coverImage}
      email={userInfo.email}
      name={userInfo.name}
      username={userInfo.username}
    />
  );
};

export default PublicProfile;
