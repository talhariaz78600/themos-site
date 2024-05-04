import React, { useEffect, useState } from "react";


const SelectSteps3Dock = () => {  


  const renderForm = () => {
    return (
      <div className="w-full relative mt-2 px-8 flex flex-col justify-center rounded-lg  shadow-2xl dark:shadow-2xl bg-[#101726] divide-y divide-neutral-700 dark:divide-neutral-700  md:divide-y-0">
        {/* Progress Bar */}
  
        <div className="w-full bg-gray-200 progresvehicalbar-top  mb-6 mt-8 rounded-full">
          <div
            className=" to-pink-500 progresvehicalbar-inner rounded-full"
            style={{ width: "100.00%" }}
          ></div>
        </div>        
      </div>
    );
  };

  return renderForm();
};

export default SelectSteps3Dock;