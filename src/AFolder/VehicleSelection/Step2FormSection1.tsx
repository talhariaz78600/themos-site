import React, { useState, useCallback, useEffect } from "react";
import MultiLabelCheckbox from "../../components/MultiLabelCheckbox";
import NcInputNumber from "../../components/NcInputNumber/NcInputNumber";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
// import Textarea from "shared/Textarea/Textarea";

interface ExtraItem {
  label: string;
  price: number;
  checked: boolean;
  count: number;
}

interface Step2FormSection1Props {
  extrasArr: ExtraItem[];
  onExtrasArrCheckChange: (index: number) => void;
  onExtrasArrCountChange: (index: number, value: number) => void;
  onExtrasArrNoteChange: (value: string) => void;
}

const Step2FormSection1: React.FC<Step2FormSection1Props> = (props) => {
  const [showItems, setShowItems] = useState<number>(3);
  const {
    extrasArr,
    onExtrasArrCheckChange,
    onExtrasArrCountChange,
    onExtrasArrNoteChange,
  } = props;

  const handleExpand = () => {
    setShowItems((prev) => (prev === 3 ? 10 : 3));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 md:space-y-0">
      <h2 className="text-md font-semibold">Equipment and Extras</h2>
      <div className="flex flex-col justify-start items-start justify-self-start space-y-4 w-full">
        {extrasArr.slice(0, showItems).map((item, index) => (
          <div
            className="grid grid-cols-2 items-start space-y-2 pb-2 place-items-stretch w-full"
            key={index}
          >
            <MultiLabelCheckbox
              label1={item.label}
              label2={item.price}
              isChecked={item.checked}
              checkboxID={index}
              handleOnChange={() => onExtrasArrCheckChange(index)}
            />
            {index !== 2 && item.checked && (
              <NcInputNumber
                defaultValue={item.count}
                onChange={(value) => onExtrasArrCountChange(index, value)}
                className="justify-self-end"
              />
            )}
          </div>
        ))}
        <div onClick={handleExpand} className="cursor-pointer">
          <span className="text-sm text-primary-6000 flex items-center">
            <span>{showItems === 3 ? "Show more" : "Show less"}</span>
            {showItems === 3 ? (
              <MdArrowDropDown size={18} />
            ) : (
              <MdArrowDropUp size={18} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Step2FormSection1;
