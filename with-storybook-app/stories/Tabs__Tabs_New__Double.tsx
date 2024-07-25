
import React from "react";
import "./tabs__tabs_new__double.css";

interface Tabs__Tabs_New__DoubleProps {
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
export const Tabs__Tabs_New__Double = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: Tabs__Tabs_New__DoubleProps) => {
  const mode = primary
    ? "storybook-tabs__tabs_new__double--primary"
    : "storybook-tabs__tabs_new__double--secondary";
  return (
    <button
      type="button"
      className={["storybook-tabs__tabs_new__double", `storybook-tabs__tabs_new__double--${size}`, mode].join(" ")}
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
