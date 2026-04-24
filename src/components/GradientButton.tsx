import { forwardRef, type ButtonHTMLAttributes } from "react";
import { ArrowUpRight } from "lucide-react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  withArrow?: boolean;
}

export const GradientButton = forwardRef<HTMLButtonElement, Props>(
  ({ className = "", children, withArrow = true, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={`group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-700 px-7 py-3.5 text-base font-medium text-white shadow-[0_10px_40px_-10px_rgba(29,78,216,0.6)] transition-all duration-300 hover:shadow-[0_18px_60px_-10px_rgba(29,78,216,0.7)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${className}`}
      >
        <span className="relative z-10">{children}</span>
        {withArrow && (
          <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-300 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </button>
    );
  }
);
GradientButton.displayName = "GradientButton";
