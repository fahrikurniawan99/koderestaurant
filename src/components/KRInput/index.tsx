import * as React from "react";
import { twMerge } from "tailwind-merge";
import { LuEye, LuEyeOff } from "react-icons/lu";
import clsx from "clsx";

type KRInputProps = {
  containerClassName?: string;
  inputClassName?: string;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function KRInput({
  containerClassName,
  inputClassName,
  label,
  ...props
}: KRInputProps) {
  const [show, setShow] = React.useState(false);
  return (
    <fieldset>
      {label && (
        <label
          className={clsx(
            "mb-1 block text-sm font-medium text-gray-700",
            props.required &&
              "after:ml-1 after:inline-block after:text-red-600 after:content-['*']"
          )}
          id={props.id}
        >
          {label}
        </label>
      )}
      <div
        className={twMerge(
          "flex w-full rounded-md border px-4 py-3",
          props.disabled && "opacity-70",
          containerClassName
        )}
      >
        <input
          {...props}
          type={show ? "text" : props.type}
          className={twMerge(
            "w-full text-sm text-gray-700 outline-none",
            inputClassName
          )}
        />
        {props.type === "password" ? (
          show ? (
            <LuEye className="cursor-pointer" onClick={() => setShow(false)} />
          ) : (
            <LuEyeOff
              className="cursor-pointer"
              onClick={() => setShow(true)}
            />
          )
        ) : null}
      </div>
    </fieldset>
  );
}
