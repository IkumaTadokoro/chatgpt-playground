import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "email" | "password";
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

// eslint-disable-next-line import/prefer-default-export
export function InputField(props: InputFieldProps) {
  const { type = "text", label, className, registration, error } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        className={clsx(
          "appearance-none block w-full px-3 py-2 border border-zinc-500 bg-zinc-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm",
          className
        )}
        {...registration}
      />
    </FieldWrapper>
  );
}
