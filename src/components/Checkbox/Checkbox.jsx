import React, { FC } from "react";

const Checkbox = ({
  label = "",
  name,
  defaultChecked,
  onChange,
}) => {
  return (
    <div className={`flex text-sm sm:text-base cursor-pointer`}>
      <input
        id={name}
        type="checkbox"
        className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-neutral-700  checked:bg-primary-500 focus:ring-primary-500 cursor-pointer"
        defaultChecked={defaultChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <label
          htmlFor={name}
          className="ml-3.5 flex flex-col flex-1 justify-center"
        >
          <span className="text-neutral-100 dark:text-neutral-100">
            {label}
          </span>
        </label>
      )}
    </div>
  );
};

export default Checkbox;
