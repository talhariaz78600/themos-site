import React from "react";

interface MultiLabelCheckboxProps {
  checkboxID: number;
  label1: string;
  label2: string | number; // label2 can be a string or number (to handle the Euro symbol case)
  isChecked: boolean;
  handleOnChange?: (checkboxID: number) => void; // Function to handle checkbox change
}

const MultiLabelCheckbox: React.FC<MultiLabelCheckboxProps> = ({
  checkboxID,
  label1,
  label2,
  isChecked,
  handleOnChange,
}) => {
  const onChangeHandler = () => {
    if (handleOnChange) {
      handleOnChange(checkboxID); // Call the provided onChange handler with checkboxID
    }
  };

  return (
    <div className="form-check form-check-inline flex items-start">
      <input
        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded bg-white checked:bg-blue-600 checked:border-primary-6000 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="checkbox"
        id={`inlineCheckbox${checkboxID}`}
        checked={isChecked}
        onChange={onChangeHandler} // Call local handler instead of directly passing checkboxID
      />
      <div className="flex flex-col items-start px-2">
        <label
          className="form-check-label inline-block text-neutral-400 dark:text-neutral-400 cursor-pointer"
          htmlFor={`inlineCheckbox${checkboxID}`}
        >
          {label1}
        </label>
        <label
          className="form-check-label inline-block text-neutral-400 dark:text-neutral-400 cursor-pointer"
          htmlFor={`inlineCheckbox${checkboxID}`}
        >
          {typeof label2 === "number" ? `€${label2}` : label2}
        </label>
      </div>
    </div>
  );
};

export default MultiLabelCheckbox;
