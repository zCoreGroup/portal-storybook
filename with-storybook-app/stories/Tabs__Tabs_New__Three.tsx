
import React from "react";
import "./tabs__tabs_new__three.css";

interface Tabs__Tabs_New__ThreeProps {
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
export const Tabs__Tabs_New__Three = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: Tabs__Tabs_New__ThreeProps) => {
  const mode = primary
    ? "storybook-tabs__tabs_new__three--primary"
    : "storybook-tabs__tabs_new__three--secondary";
  return (
    <button
      type="button"
      className={["storybook-tabs__tabs_new__three", `storybook-tabs__tabs_new__three--${size}`, mode].join(" ")}
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
