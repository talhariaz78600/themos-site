
import React, { FC, ImgHTMLAttributes} from "react";
import Image from "next/image";
export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  alt?: string;
  src: string;
  id?: string;
}
const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-imgs",
  src = "",
  className = "object-cover",
  id,
  ...args
}) => {
  return (
    <div className={`nc-NcImage ${containerClassName}`}>
        <Image src={src} alt={alt}  width={400}  height={400} />
    </div>
  );
};

export default NcImage;
