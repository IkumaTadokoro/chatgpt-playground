import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";

import { Spinner } from "../Spinner";

const variants = {
  primary: "bg-green-700 text-white",
  inverse: "bg-white text-green-700",
  danger: "bg-red-700 text-white",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

const sizes = {
  sm: "py-2 px-4 text-sm",
  md: "py-2 px-6 text-md",
  lg: "py-3 px-8 text-lg",
};

export type ButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
} & IconProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className = "",
      size = "md",
      variant = "primary",
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={clsx(
        "w-full flex justify-center items-center border border-zinc-700 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80",
        sizes[size],
        variants[variant],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Spinner size="sm" className="text-current" />}
      {!isLoading && startIcon}
      <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
    </button>
  )
);
