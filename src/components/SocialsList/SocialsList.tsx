import React, { FC } from "react";
import { EMAIL, PHONE_NUMBER } from "../constants/apiEndpoints";
import Link from "next/link";
export interface SocialsList1Props {
  className?: string;
}
export interface SocialType {
  name: string;
  icon: string;
  href: string;
}
const socials: SocialType[] = [
  // { name: "Facebook", icon: "lab la-facebook-square", href: "#" },
  // { name: "Twitter", icon: "las la-phone-volume", href: "#" },
  // { name: "Instagram", icon: "lab la-instagram", href: "#" },
  { name: "+30 6947484950", icon: "fa-solid fa-phone", href: PHONE_NUMBER },
  { name: EMAIL, icon: "fa-regular fa-envelope", href: EMAIL },
];

const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-2.5" }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <Link
        href={"mailto:" + item.href}
        className="flex items-center text-2xl  hover:text-black text-neutral-300 dark:hover:text-white hover:text-white leading-none space-x-2 group"
        key={index}
        title={`Share on ${item.name}`}
      >
        <i className={item.icon} aria-hidden={true}></i>
        <span className="hidden lg:block text-sm">{item.name}</span>
      </Link>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
