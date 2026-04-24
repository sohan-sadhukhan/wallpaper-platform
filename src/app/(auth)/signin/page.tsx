import SignInForm from "@/components/Forms/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Metadata, Route } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In | Wallpaper App",
  description:
    "Sign in to your Wallpaper App account to explore, download, and manage your favorite wallpapers.",
};

const page = () => {
  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-20">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Sign in to continue exploring and downloading wallpapers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* SignIn Form */}
          <SignInForm />
        </CardContent>
        <CardFooter className="justify-center text-sm">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href={"/signup" as Route}
              className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default page;
