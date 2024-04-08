"use client"
import Heading from "../Heading/Heading";
import React, { FC } from "react";
import { useEffect} from "react";

import Glide from "@glidejs/glide";
export interface SectionClientSayProps {
    className?: string;
}

const DEMO_DATA = [
    {
        id: 1,
        clientName: "Tiana Abie",
    clientAddress: "Malaysia",
    content:
      "This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!",
  },
  {
      id: 2,
      clientName: "Lennie Swiffan",
      clientAddress: "London",
      content:
      "This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!",
    },
    {
        id: 3,
        clientName: "Berta Emili",
        clientAddress: "Tokyo",
        content:
        "This place is exactly like the picture posted on Chisfis. Great service, we had a great stay!",
    },
];

const SectionClientSay: FC<SectionClientSayProps> = ({ className = "" }) => {
  useEffect(() => {
    if (document.querySelector(`.talha`)) {
      new Glide(`.talha`, {
        perView: 1,
        autoplay: 5000
      }).mount();
    }
  }, []);
  

  const renderBg = () => {
    return (
      <div className="hidden md:block">
        <img
          className="absolute top-9 -left-20"
          src="/images/clientSay1.png"
          alt="Client1 say"
        />
        <img
          className="absolute bottom-[100px] right-full mr-40"
          src="/images/clientSay2.png"
          alt="Client2 say"
        />
        <img
          className="absolute top-full left-[140px]"
          src="/images/clientSay3.png"
          alt="Client3 say"
        />
        <img
          className="absolute -bottom-10 right-[140px]"
          src="/images/clientSay4.png"
          alt="Client4 say"
        />
        <img
          className="absolute left-full ml-32 bottom-[80px]"
          src="/images/clientSay5.png"
          alt="Client5 say"
        />
        <img
          className="absolute -right-10 top-10 "
          src="/images/clientSay6.png"
          alt="Client6 say"
        />      </div>
    );
  };

  return (
    <div
      className={`nc-SectionClientSay relative ${className} `}
      data-nc-id="SectionClientSay"
    >
      <Heading desc="Let's see what people think of Chisfis" isCenter>
        Good news from far away
      </Heading>
      <div className="relative md:mb-16 max-w-2xl mx-auto">
        {renderBg()}
        <img className="mx-auto" src="/images/clientSayMain.png" alt="Client10 say" />
        <div className={`mt-12 lg:mt-16 relative talha`}>
          <img
            className="opacity-50 md:opacity-100 absolute -mr-16 lg:mr-3 right-full top-1"
            src="/images/quotation.png"
            alt="Client8 say"
          />
          <img
            className="opacity-50 md:opacity-100 absolute -ml-16 lg:ml-3 left-full top-1"
            src="/images/quotation2.png"
            alt="Client9 say"
          />
          <div className="glide__track " data-glide-el="track">
            <ul className="glide__slides ">
              {DEMO_DATA.map((item) => (
                <li
                  key={item.id}
                  className="glide__slide flex flex-col items-center text-center"
                >
                  <span className="block text-2xl">{item.content}</span>
                  <span className="block mt-8 text-2xl font-semibold">
                    {item.clientName}
                  </span>
                  <div className="flex items-center space-x-2 text-lg mt-2 text-neutral-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{item.clientAddress}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="mt-10 glide__bullets flex items-center justify-center"
            data-glide-el="controls[nav]"
          >
            {DEMO_DATA.map((item, index) => (
              <button
                key={item.id}
                className="glide__bullet w-2 h-2 rounded-full bg-neutral-300 mx-1 focus:outline-none"
                data-glide-dir={`=${index}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
