import Image, { StaticImageData } from "next/image"
import { UserT } from "../types"
import { CSSProperties } from "react";
import { getSafeSrc } from "@/lib/helpers";

export default function ProfilePicture(
    { userData, size, className, style }: {
         userData: { profile_picture?: string} ,
         size: {
            width: number,
            height: number
         },
         className?: string,
         style?: CSSProperties
        }
){
    function getPFP() {
        const src = getSafeSrc(userData?.profile_picture);

        return (
            <Image
            src={src}
            alt="pfp"
            width={size.width}
            height={size.height}
            style={style}
            className={className}
            />
        );
    }

    return getPFP()
}