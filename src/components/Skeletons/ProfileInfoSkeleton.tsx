const ProfileInfoSkeleton = () => {
  return (
    <div className="grid animate-pulse gap-4 sm:grid-cols-2">
      {/* Username Field Skeleton */}
      <div className="flex flex-col gap-2">
        {/* Label */}
        <div className="bg-muted h-4 w-20 rounded-md" />
        {/* Input */}
        <div className="bg-muted h-9 w-full rounded-md" />
      </div>

      {/* Email Field Skeleton */}
      <div className="flex flex-col gap-2">
        {/* Label */}
        <div className="bg-muted h-4 w-12 rounded-md" />
        {/* Input */}
        <div className="bg-muted h-9 w-full rounded-md" />
      </div>

      {/* Submit Button Skeleton */}
      <div className="bg-muted h-9 w-full rounded-md" />
    </div>
  );
};

export default ProfileInfoSkeleton;
