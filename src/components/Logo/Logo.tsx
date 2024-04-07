
import NextLink from "next/link";
import Image from "next/image";
import LogoSvgLight from "./LogoSvgLight";
import LogoSvg from "./LogoSvg";
export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}
const Logo: React.FC<LogoProps> = ({
  img = "/images/logo.png",
  imgLight = "/images/logo-light.png",
  className = "",
}) => {
  return (
    <NextLink href="/" className={`ttnc-logo inline-block text-primary-6000 ${className}`} title="Tour Greece" passHref>
        {/* <LogoSvgLight /> */}
        <LogoSvg />
        {/* Uncomment the following code if you have SVG components for the logo */}
        {/* <LogoSvgLight /> */}
        {/* <LogoSvg /> */}
        {/* <Image
          src={img}
          alt="Logo"
          width={200} // Adjust the width as needed
          height={50} // Adjust the height as needed
          className={`block max-h-12 ${imgLight ? "dark:hidden" : ""}`}
        />
        {imgLight && (
          <Image
            src={imgLight}
            alt="Logo-Light"
            width={200}
            height={50} 
            className="hidden max-h-12 dark:block block"
          />
        )} */}
    </NextLink>
  );
};

export default Logo;
