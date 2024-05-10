import React from "react";
// import NavigationItem from "./NavigationItem";
// import { NAVIGATION_DEMO } from "../../data/navigation";

function Navigation() {
  const NAVIGATION_DEMO:any = [
    {
      id: 1,
      href: "/",
      name: "Home",
      // type: "dropdown",
      // children: demoChildMenus,
      // isNew: true,
    },
    {
      id: 2,
      href: "/tours",
      name: "Tours",
      // type: "megaMenu",
      // megaMenu: megaMenuDemo,
    },
    {
      id: 3,
      href: "/#transfers",
      name: "Transfers",
      // type: "megaMenu",
      // megaMenu: megaMenuDemo,
    },
    
  ];

  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {NAVIGATION_DEMO.map((item:any) => (
        <li key={item.id} >{item.name}</li>
      ))}
    </ul>
  );
}

export default Navigation;
