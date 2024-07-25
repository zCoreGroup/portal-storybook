
import React from "react";
import "./beacon_banner__stacked_banner.css";

interface Beacon_Banner__Stacked_BannerProps {
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
export const Beacon_Banner__Stacked_Banner = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: Beacon_Banner__Stacked_BannerProps) => {
  const mode = primary
    ? "storybook-beacon_banner__stacked_banner--primary"
    : "storybook-beacon_banner__stacked_banner--secondary";
  return (
    <button
      type="button"
      className={["storybook-beacon_banner__stacked_banner", `storybook-beacon_banner__stacked_banner--${size}`, mode].join(" ")}
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
