import { Loader2Icon } from "lucide-react";

const loading = () => {
  return (
    <div className="grid h-dvh place-items-center">
      <Loader2Icon className="h-20 w-20 animate-spin" />
    </div>
  );
};

export default loading;
