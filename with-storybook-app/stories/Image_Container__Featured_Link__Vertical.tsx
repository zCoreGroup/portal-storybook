
import React from "react";
import "./image_container__featured_link__vertical.css";

interface Image_Container__Featured_Link__VerticalProps {
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
export const Image_Container__Featured_Link__Vertical = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: Image_Container__Featured_Link__VerticalProps) => {
  const mode = primary
    ? "storybook-image_container__featured_link__vertical--primary"
    : "storybook-image_container__featured_link__vertical--secondary";
  return (
    <button
      type="button"
      className={["storybook-image_container__featured_link__vertical", `storybook-image_container__featured_link__vertical--${size}`, mode].join(" ")}
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
