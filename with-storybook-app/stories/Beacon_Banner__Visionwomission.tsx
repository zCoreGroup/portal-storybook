
import React from "react";
import "./beacon_banner__visionwomission.css";

interface Beacon_Banner__VisionwomissionProps {
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
export const Beacon_Banner__Visionwomission = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: Beacon_Banner__VisionwomissionProps) => {
  const mode = primary
    ? "storybook-beacon_banner__visionwomission--primary"
    : "storybook-beacon_banner__visionwomission--secondary";
  return (
    <button
      type="button"
      className={["storybook-beacon_banner__visionwomission", `storybook-beacon_banner__visionwomission--${size}`, mode].join(" ")}
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
