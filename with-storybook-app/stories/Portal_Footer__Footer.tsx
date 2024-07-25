
import React from "react";
import "./portal_footer__footer.css";

interface Portal_Footer__FooterProps {
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
export const Portal_Footer__Footer = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: Portal_Footer__FooterProps) => {
  const mode = primary
    ? "storybook-portal_footer__footer--primary"
    : "storybook-portal_footer__footer--secondary";
  return (
    <button
      type="button"
      className={["storybook-portal_footer__footer", `storybook-portal_footer__footer--${size}`, mode].join(" ")}
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
