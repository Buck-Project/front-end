// components/ui/input.tsx
import { forwardRef } from "react";
import { useField } from "formik";
import { cn } from "@/lib/utils";
import type { FormikInputProps } from "@/types/inputTypes";

<<<<<<< HEAD
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, containerClassName, ...props }, ref) => {
        return (
            <div className={cn("flex flex-col gap-1", containerClassName)}>
                {label && (
                    <label className="text-sm font-medium text-foreground text-right">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    {...props}
                />
                {error && <span className="text-sm text-destructive text-right">{error}</span>}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
=======
const isRTL = (text: string | undefined): boolean => {
  if (!text) return true;
  const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlChars.test(text);
};

export const Input = forwardRef<HTMLInputElement, FormikInputProps>(
  (
    {
      label,
      icon: Icon,
      onIconClick,
      onlyNumbers = false,
      forceRTL = false,
      containerClassName = "",
      inputClassName = "",
      iconClassName = "",
      errorClassName = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const [field, meta] = useField(props.name);
    const hasError = meta.touched && meta.error;
    const value = field.value ?? "";
    const isRightToLeft = forceRTL || isRTL(value);

    return (
      <div className={cn("flex flex-col gap-1", containerClassName)}>
        {label && (
          <label
            className="text-sm font-medium text-foreground"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <Icon
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer",
                iconClassName
              )}
              onClick={onIconClick}
            />
          )}

          <input
            {...field}
            {...props}
            ref={ref}
            dir={isRightToLeft ? "rtl" : "ltr"}
            disabled={disabled}
            className={cn(
              "w-full px-4 py-2 rounded-md border border-input bg-card text-foreground",
              "placeholder:text-muted-foreground focus:outline-none",
              "focus:ring-2 focus:ring-ring/50 focus:border-primary transition",
              Icon ? "pl-10" : "",
              isRightToLeft ? "text-right" : "text-left",
              disabled && "opacity-50 cursor-not-allowed",
              inputClassName
            )}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
>>>>>>> c6af0c5fd7bc08cb87078f213a2f3b071e5b4cbb
