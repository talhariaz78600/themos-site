import React from "react";
import Input from "../../components/input/Input";
import Label from "../../components/Label/Label";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephone, BsFillInfoCircleFill } from "react-icons/bs";

interface NameMailAndPhoneProps {
  fName: string;
  lName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  errorState: Record<string, string>;
  onFirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameMailAndPhone: React.FC<NameMailAndPhoneProps> = ({
  fName,
  lName,
  email,
  countryCode,
  phoneNumber,
  errorState,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onCountryCodeChange,
  onPhoneNumberChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 md:space-y-0">
      <h2 className="text-2xl font-semibold">A Few Details About You</h2>
      <div className="flex flex-col justify-start items-start justify-self-start space-y-8">
        {/* Textfields */}
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-8 md:space-y-0 w-full md:flex-row md:justify-between items-center md:items-start md:space-x-4">
            <div className="relative w-full h-14 flex items-center">
              <Input
                id="fName"
                type="text"
                placeholder="First Name"
                name="fName"
                value={fName}
                onChange={onFirstNameChange}
              />
              <Label isError={errorState.fName}  className = ""  noLabel=""  htmlFor="fName">
                First Name
              </Label>
            </div>

            <div className="relative w-full h-14 flex items-center">
              <Input
                id="lName"
                type="text"
                placeholder="Last Name"
                name="lName"
                value={lName}
                onChange={onLastNameChange}
              />
              <Label isError={errorState.lName} className = ""  noLabel="" htmlFor="lName">
                Last Name
              </Label>
            </div>
          </div>
          <div className="w-full relative h-14 flex items-center">
            <Input
              id="email"
              type="email"
              placeholder="Your Email"
              className="px-9"
              autoComplete="email"
              name="email"
              value={email}
              onChange={onEmailChange}
            />
            <div className="absolute inset-y-0  ml-2 flex items-center pointer-events-none">
              <HiOutlineMail size={20} />
            </div>
            <Label isError={errorState.email}  noLabel="" htmlFor="email" className="ml-2">
              Email Address
            </Label>
          </div>
          <div className="flex justify-between items-start space-x-4">
            <div className="relative flex flex-row items-center h-14 ">
              <Input
                id="countryCode"
                className="w-20 text-center pl-6"
                autoComplete="tel-country-code"
                size={5}
                maxLength={5}
                name="countryCode"
                value={countryCode}
                onChange={onCountryCodeChange}
              />
              <div className="text-sm absolute top-4.5 ml-2 mix-blend-difference">
                +
              </div>
            </div>
            <div className="relative w-full flex items-center pt-1">
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                className="px-9"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onPhoneNumberChange}
                autoComplete="tel-national"
              />
              <div className="absolute inset-y-0 ml-2 flex items-center pointer-events-none">
                <BsTelephone size={20} />
              </div>
              <Label isError={errorState.phoneNumber}   noLabel="" htmlFor="phoneNumber" className="ml-2">
                Phone Number
              </Label>
            </div>
          </div>
          <div className="relative flex items-start text-gray-400 font-normal">
            <BsFillInfoCircleFill size={16} />
            <span className="px-2 text-sm">
              You don't have to worry, we won't call you for anything unrelated to the service.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameMailAndPhone;
