"use client";

import createFavourite from "@/server/createFavourite";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "./shadcnui/button";

type FavouriteButtonProps = {
  id: string;
  isFavorited: boolean;
};

const FavouriteButton = ({ id, isFavorited }: FavouriteButtonProps) => {
  const [liked, setLiked] = useState(isFavorited);

  const handleFavourite = async () => {
    setLiked(!liked);

    const { isFavorited } = await createFavourite(id);

    setLiked(isFavorited);
  };

  return (
    <Button
      size="icon"
      aria-label="Favourite"
      className="absolute top-2 right-2 rounded-full"
      onClick={handleFavourite}>
      <Heart
        size={12}
        className={liked ? "fill-red-500 text-red-500" : "text-white"}
      />
    </Button>
  );
};

export default FavouriteButton;
