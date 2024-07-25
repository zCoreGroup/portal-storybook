
import React from "react";
import "./sub_page_menu.css";

interface Sub_Page_MenuProps {
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
export const Sub_Page_Menu = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: Sub_Page_MenuProps) => {
  const mode = primary
    ? "storybook-sub_page_menu--primary"
    : "storybook-sub_page_menu--secondary";
  return (
    <button
      type="button"
      className={["storybook-sub_page_menu", `storybook-sub_page_menu--${size}`, mode].join(" ")}
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
