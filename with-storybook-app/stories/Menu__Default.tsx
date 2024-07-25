
import React from "react";
import "./menu__default.css";

interface Menu__DefaultProps {
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
export const Menu__Default = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: Menu__DefaultProps) => {
  const mode = primary
    ? "storybook-menu__default--primary"
    : "storybook-menu__default--secondary";
  return (
    <button
      type="button"
      className={["storybook-menu__default", `storybook-menu__default--${size}`, mode].join(" ")}
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
