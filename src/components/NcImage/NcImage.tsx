
import React, { FC, ImgHTMLAttributes} from "react";
import Image from "next/image";
export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  alt?: string;
  src: string;
  id?: string;
  className:string;
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
        <Image className={className} src={src} alt={alt}  width={800}  priority={false} height={800} />
    </div>
  );
};

export default NcImage;
