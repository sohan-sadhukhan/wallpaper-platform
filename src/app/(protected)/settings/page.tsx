import ChangePasswordForm from "@/components/Forms/ChangePasswordForm";
import DeleteAccountForm from "@/components/Forms/DeleteAccountForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import SignOut from "@/components/SignOut";
import ProfileInfoSkeleton from "@/components/Skeletons/ProfileInfoSkeleton";
import UsernameEmailSection from "@/components/UsernameEmailSection";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Settings | Wallpaper App",
  description:
    "Manage your account settings, profile preferences, and application options in Wallpaper App.",
};

const page = async () => {
  return (
    <section className="mx-auto w-full px-4 py-20 sm:px-6">
      <section
        aria-labelledby="settings-heading"
        className="space-y-6">
        <header className="space-y-2">
          <h1
            id="settings-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Account Settings
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage your profile details, update your password, and control your
            account access.
          </p>
        </header>

        <section
          aria-labelledby="profile-settings-heading"
          className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle
                id="profile-settings-heading"
                className="text-xl sm:text-2xl">
                Profile Information
              </CardTitle>
              <CardDescription>
                Keep your username and email address up to date.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/*  Username & Email update form  */}
              <Suspense fallback={<ProfileInfoSkeleton />}>
                <UsernameEmailSection />
              </Suspense>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle
                id="password-settings-heading"
                className="text-xl sm:text-2xl">
                Password & Security
              </CardTitle>
              <CardDescription>
                Change your password regularly to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/*  Password change form  */}
              <ChangePasswordForm />
            </CardContent>
          </Card>

          {/* Logout */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                Account Access
              </CardTitle>
              <CardDescription>
                Sign out from your current session.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignOut />
            </CardContent>
          </Card>

          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle
                id="danger-zone-heading"
                className="text-destructive text-xl sm:text-2xl">
                Danger Zone
              </CardTitle>
              <CardDescription>
                Permanently delete your account and all related data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/*  Account deletion form  */}
              <DeleteAccountForm />
            </CardContent>
          </Card>
        </section>
      </section>
    </section>
  );
};

export default page;
