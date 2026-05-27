"use client";

import adminDeleteWallpaper from "@/server/adminDeleteWallpaper";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";

type PostDeleteButtonProps = {
  wallpaperId: string;
};

const PostDeleteButton = ({ wallpaperId }: PostDeleteButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const { success, message } = await adminDeleteWallpaper(wallpaperId);
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={loading}
      aria-label="Delete this post permanently"
      className="w-full cursor-pointer bg-red-500/15 text-xs font-medium text-red-400 hover:bg-red-500/25">
      {loading ? "Deleting…" : "Delete"}
    </Button>
  );
};

export default PostDeleteButton;
