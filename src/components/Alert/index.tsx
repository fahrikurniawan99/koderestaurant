import { LuAlertTriangle } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

type AlertProps = {
  className?: string;
  message: string;
  type: "Error" | "Warning" | "Success" | "Info";
};

export default function Alert(props: AlertProps) {
  return (
    <div
      className={twMerge(
        "mt-3 flex items-center gap-3 rounded-lg px-5 py-4",
        !open && "hidden",
        props.type === "Error" && "bg-red-100 text-red-600",
        props.type === "Warning" && "bg-yellow-100 text-yellow-600",
        props.type === "Info" && "bg-blue-100 text-blue-600",
        props.className
      )}
    >
      <LuAlertTriangle className="shrink-0 text-2xl" />
      <p>
        <span className="font-semibold">{props.type} !</span> {props.message}
      </p>
    </div>
  );
}
