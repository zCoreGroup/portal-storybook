
import React from "react";
import "./maintenance_banner.css";

interface Maintenance_BannerProps {
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
export const Maintenance_Banner = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: Maintenance_BannerProps) => {
  const mode = primary
    ? "storybook-maintenance_banner--primary"
    : "storybook-maintenance_banner--secondary";
  return (
    <button
      type="button"
      className={["storybook-maintenance_banner", `storybook-maintenance_banner--${size}`, mode].join(" ")}
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
