import React, { FC, ReactNode } from "react";
import twFocusClass from "../../utails/twFocusClass";

export interface NavItemProps {
  className?: string;
  radius?: string;
  onClick?: () => void;
  isActive?: boolean;
  renderX?: ReactNode;
  id?: any;
  children?:any,
}

const NavItem: FC<NavItemProps> = ({
  className = "px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize",
  radius = "rounded-full",
  children,
  onClick = () => {},
  isActive = false,
  renderX,
  id,
}) => {
  return (
    <li className="nc-NavItem relative" data-nc-id={`NavItem${id}`}>
      {renderX && renderX}
      <button
        className={`block !leading-none font-medium whitespace-nowrap ${className} ${radius} ${
          isActive
            ? "bg-secondary-800 text-secondary-50 "
            : "text-neutral-500 text-neutral-40 hover:text-neutral-100  hover:bg-neutral-800"
        } ${twFocusClass()}`}
        onClick={() => {
          onClick && onClick();
        }}
      >
        {children}
      </button>
    </li>
  );
};

export default NavItem;
