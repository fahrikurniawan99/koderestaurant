import * as React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function Container({ className, children }: Props) {
  return <div className={twMerge("px-5 lg:px-28", className)}>{children}</div>;
}
