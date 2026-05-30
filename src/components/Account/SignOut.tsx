"use client";

import { authClient } from "@/lib/auth-client";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";

const SignOut = () => {
  // State to track loading status during signout
  const [loading, setLoading] = useState(false);

  // Next.js router for navigation
  const { replace } = useRouter();

  //  Handles the signout process
  const signoutHandler = async () => {
    try {
      setLoading(true);

      // Call the sign out method from auth client
      const { error } = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => replace("/signin"),
        },
      });

      // Handle error if signout fails
      if (error) {
        toast.error(error.message);
      }

      setLoading(false);
    } catch (error) {
      // Handle unexpected errors
      toast.error("An unexpected error occurred during signout.");
      setLoading(false);
    }
  };
  return (
    <Button
      size={"lg"}
      onClick={signoutHandler}
      disabled={loading}
      variant={"destructive"}
      className="inline-flex w-fit cursor-pointer items-center gap-2">
      {/* Show loading spinner and text while signing out */}
      {
        loading ?
          <>
            <Loader2Icon className="animate-spin" /> Signing out...
          </>
          // Show sign out icon and text when not loading
        : <>
            <LogOutIcon />
            Sign Out
          </>

      }
    </Button>
  );
};

export default SignOut;
