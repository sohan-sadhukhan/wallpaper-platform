import ProfileSection from "@/components/ProfileSection";
import prisma from "@/lib/database/dbClient";
import authUserServer from "@/server/authUserServer";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile | Wallpaper App",
  description: "View and manage your public profile in Wallpaper App.",
};

const page = async () => {
  const session = await authUserServer();

  const userInfo = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      bio: true,
      interests: {
        select: { name: true },
      },
      name: true,
      username: true,
      email: true,
      image: true,
      coverImage: true,
    },
  });

  if (!userInfo) {
    redirect("/signin");
  }

  const interestNames =
    userInfo?.interests.map((interest) => interest.name) ?? [];

  return (
    <section className="mx-auto w-full px-4 py-20 sm:px-6">
      <ProfileSection
        name={userInfo.name}
        username={userInfo.username}
        email={userInfo.email}
        bio={userInfo.bio ?? ""}
        avatar={userInfo.image ?? "avatar.png"}
        cover={userInfo.coverImage ?? "cover.jpg"}
        interests={interestNames}
      />
    </section>
  );
};

export default page;
