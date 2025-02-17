import { Loader2 } from "lucide-react";

const Loading = ({ className = "" }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2 className={`h-10 w-10 animate-spin text-white ${className}`} />
    </div>
  );
};

export default Loading;
