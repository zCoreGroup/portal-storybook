
import React from "react";
import "./beacon_banner__missionwovision.css";

interface Beacon_Banner__MissionwovisionProps {
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
export const Beacon_Banner__Missionwovision = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: Beacon_Banner__MissionwovisionProps) => {
  const mode = primary
    ? "storybook-beacon_banner__missionwovision--primary"
    : "storybook-beacon_banner__missionwovision--secondary";
  return (
    <button
      type="button"
      className={["storybook-beacon_banner__missionwovision", `storybook-beacon_banner__missionwovision--${size}`, mode].join(" ")}
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
