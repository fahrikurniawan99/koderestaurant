import clsx from "clsx";
import { LuCheck } from "react-icons/lu";
import * as React from "react";
import { toast } from "react-hot-toast";

export type PaymentMethodType = "mandiri" | "gopay" | "paypal";

type Props = {
  icon: PaymentMethodType;
  text: string;
  active: PaymentMethodType;
  onButtonSelect: React.Dispatch<React.SetStateAction<PaymentMethodType>>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function PaymentMethod({
  icon,
  text,
  active,
  onButtonSelect,
  ...props
}: Props) {
  return (
    <button
      type="button"
      onClick={() => {
        toast.success(text + " berhasil diterapkan");
        onButtonSelect(icon);
      }}
      className={clsx(
        "flex h-14 w-full items-center rounded-lg border p-3 font-medium text-gray-700",
        active === icon && "border-green-600"
      )}
      {...props}
    >
      <img alt={icon} src={`/${icon}.png`} className="mr-2 h-full" />
      {text}
      <LuCheck
        className={clsx(
          "ml-auto stroke-[3px] text-gray-400",
          active === icon && "text-green-500"
        )}
      />
    </button>
  );
}
