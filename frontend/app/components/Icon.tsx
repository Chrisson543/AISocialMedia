import Image, { StaticImageData } from "next/image";

export default function Icon({path, size}: {path: StaticImageData; size: {width: number  | string; height: number  | string}}){
    return (
        <Image 
            src={path}
            alt="icon"
            width={64}
            height={64}
            style={{objectFit: 'cover', height: size.width, width: size.height}}
        />
    )
}
