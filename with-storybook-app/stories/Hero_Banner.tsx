
import React from "react";
import "./hero_banner.css";

interface Hero_BannerProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Hero_Banner = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: Hero_BannerProps) => {
  const mode = primary
    ? "storybook-hero_banner--primary"
    : "storybook-hero_banner--secondary";
  return (
    <button
      type="button"
      className={["storybook-hero_banner", `storybook-hero_banner--${size}`, mode].join(" ")}
      {...props}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};
