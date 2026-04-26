"use client";

import deleteWallpaper from "@/server/deleteWallpaper";
import { Loader2, Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./shadcnui/button";

const DeleteWallpaper = ({
  id,
  userId,
  imageUrl,
}: {
  id: string;
  userId: string;
  imageUrl: string;
}) => {
  const [deletePending, setDeletePending] = useState(false);
  const pathName = usePathname();

  // Call server action to delete wallpaper
  const handleDelete = async () => {
    setDeletePending(true);

    const { message, isSuccess } = await deleteWallpaper({
      id,
      userId,
      imageUrl,
    });

    setDeletePending(false);
    if (!isSuccess) {
      toast.error(message);
      return;
    }
    toast.success(message);
  };

  // Show delete button only on profile pages
  return pathName.includes("/profile") ?
      <Button
        variant={"destructive"}
        size={"icon-lg"}
        aria-label="Delete"
        className="absolute top-2 left-2 rounded-full"
        onClick={handleDelete}>
        {deletePending ?
          <Loader2
            size={12}
            className="animate-spin"
          />
        : <Trash2 size={12} />}
      </Button>
    : null;
};

export default DeleteWallpaper;
