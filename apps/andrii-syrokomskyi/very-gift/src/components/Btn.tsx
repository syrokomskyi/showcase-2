import classNames from "classnames";
import type { PropsWithChildren } from "react";

type Theme = "light" | "dark" | "gray";
type Size = "sm" | "regular";

interface BtnProps extends PropsWithChildren {
  to?: string;
  theme?: Theme;
  size?: Size;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

const Btn = ({
  theme = "light",
  size = "regular",
  to = undefined,
  children,
  className = "",
  disabled = false,
  onClick,
  ariaLabel,
}: BtnProps) => {
  const classes = classNames(
    "flex items-center leading-none font-semibold transition-all duration-300 border border-transparent focus:outline-none lg:text-xl lg:leading-none group relative overflow-hidden transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl",
    {
      "bg-white/95 text-appAccent hover:bg-white hover:text-appAccent-100 hover:border-white/20 backdrop-blur-sm":
        theme === "light",
      "bg-appAccent text-white hover:bg-appAccent/90 hover:text-white hover:border-appAccent/20 shadow-appAccent/25":
        theme === "dark",
      "bg-gray-50/95 text-appGray-600 hover:bg-white hover:border-appAccent/20 disabled:bg-gray-100/50 disabled:text-gray-400 disabled:hover:border-transparent disabled:hover:scale-100 disabled:shadow-none backdrop-blur-sm":
        theme === "gray",
      "px-6 py-4 rounded-xl text-sm lg:px-10 lg:py-5 lg:rounded-2xl":
        size === "regular",
      "px-4 py-3 rounded-lg text-xs lg:px-8 lg:py-4 lg:rounded-xl":
        size === "sm",
    },
    className,
  );
  return (
    <>
      {to ? (
        <a href={to} className={classes} aria-label={ariaLabel}>
          {children}
        </a>
      ) : (
        <button 
          type="button" 
          onClick={onClick} 
          disabled={disabled} 
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Btn;
