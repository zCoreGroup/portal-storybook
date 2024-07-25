
import React from "react";
import "./beacon_banner__wologo.css";

interface Beacon_Banner__wologoProps {
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
export const Beacon_Banner__wologo = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: Beacon_Banner__wologoProps) => {
  const mode = primary
    ? "storybook-beacon_banner__wologo--primary"
    : "storybook-beacon_banner__wologo--secondary";
  return (
    <button
      type="button"
      className={["storybook-beacon_banner__wologo", `storybook-beacon_banner__wologo--${size}`, mode].join(" ")}
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
