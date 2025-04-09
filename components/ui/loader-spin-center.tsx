import { HashLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { Sparkles } from "./sparkels";

const LoaderSpinCenter = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="absolute top-0 left-0 w-full h-full">
        <Sparkles density={100} />
      </div>
      <div className="flex flex-col gap-12 items-center">
        <Label className="text-3xl font-bold">Somang</Label>
        <HashLoader color="#0091ff" />
      </div>
    </div>
  );
};

export default LoaderSpinCenter;
