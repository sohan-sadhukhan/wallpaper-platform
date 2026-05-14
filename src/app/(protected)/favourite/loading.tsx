import WallpaperLoadingSkeleton from "@/components/Skeletons/WallpaperLoadingSkeleton";

const loading = () => {
  return (
    <div className="px-4 pt-20 pb-10 sm:px-6">
      {" "}
      <WallpaperLoadingSkeleton />
    </div>
  );
};

export default loading;
