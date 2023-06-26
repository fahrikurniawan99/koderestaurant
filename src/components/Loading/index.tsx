import { LuLoader2 } from "react-icons/lu";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LuLoader2 className="animate-spin stroke-[2.5px] text-2xl text-green-500" />
    </div>
  );
}
