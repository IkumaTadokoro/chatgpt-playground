import clsx from "clsx";
import { FieldError } from "react-hook-form";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export function FieldWrapper(props: FieldWrapperProps) {
  const { label, className, error, children } = props;
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className={clsx("block text-sm font-medium text-zinc-400", className)}
      >
        {label}
        <div className="mt-1">{children}</div>
      </label>
      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className="text-sm font-semibold text-red-500"
        >
          {error.message}
        </div>
      )}
    </div>
  );
}
