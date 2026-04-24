import SignUpForm from "@/components/Forms/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import type { Metadata, Route } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up | Wallpaper App",
  description:
    "Create a Wallpaper App account to upload, save, and discover high-quality wallpapers.",
};

const page = () => {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-20">
      <Card className="w-full max-w-xl">
        <CardHeader className="text-center">
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Join the platform and start managing your favorite wallpapers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* SignUn Form */}
          <SignUpForm />
        </CardContent>
        <CardFooter className="justify-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={"/signin" as Route}
              className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default page;
