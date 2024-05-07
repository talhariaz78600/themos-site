import React, { FC, useEffect, useState } from "react";
import Heading from "../Heading/Heading";
import Nav from "../Nav/Nav";
import NavItem from "../NavItem/NavItem";
import ButtonSecondary from "../Button/ButtonSecondary";
import { ReactNode } from "react";

export interface HeaderFilterProps {
  tabActive: string;
  tabs: string[];
  heading: ReactNode;
  subHeading?: ReactNode;
  onClickTab: (item: string) => void;
  homePage: boolean;
}

const HeaderFilter: FC<HeaderFilterProps> = ({
  tabActive,
  tabs,
  subHeading = "",
  heading = "🎈 Latest Articles",
  onClickTab,
  homePage,
}) => {
  const [tabActiveState, setTabActiveState] = useState(tabActive);

  useEffect(() => {
    setTabActiveState(tabActive);
  }, [tabActive]);

  const handleClickTab = (item: string) => {
    onClickTab && onClickTab(item);
    setTabActiveState(item);
  };

  const viewAllButton = () => {
    if (homePage) {
      return (
        <ButtonSecondary className="!leading-none">
          <span>View all</span>
          <i className="ml-3 las la-arrow-right text-xl" />
        </ButtonSecondary>
      );
    }
    return null; // Ensure to return null when not rendering the button
  };

  return (
    <div className="flex flex-col mb-8 relative">
      <Heading desc={subHeading}>{heading}</Heading>
      <div className="flex items-center justify-between">
        <Nav
          className="sm:space-x-2"
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
        >
          {tabs.map((item, index) => (
            <NavItem
              key={index}
              isActive={tabActiveState === item}
              onClick={() => handleClickTab(item)}
              id={`tour ${index}`}
            >
              {item}
            </NavItem>
          ))}
        </Nav>
        <span className="hidden sm:block flex-shrink-0">{viewAllButton()}</span>
      </div>
    </div>
  );
};

export default HeaderFilter;