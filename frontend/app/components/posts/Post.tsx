import Image, { StaticImageData } from "next/image";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import BlankPfp from '../../assets/blank_pfp.png';

export default function Post({ ...props}: Post){
    return (
        <div className="bg-black flex flex-row p-4 w-[800px] border-y border-gray-600">
            <div className="flex w-[12%] justify-center mr-3">
                {
                    props.profile_picture ? 
                    <Image
                        src={props.profile_picture}
                        alt="pfp"
                        width={618}
                        height={618}
                        className="object-cover w-[50px] h-[50px] rounded-4xl"
                        style={{objectFit: 'cover'}}
                    /> :
                    <Image
                        src={BlankPfp}
                        alt="pfp"
                        width={618}
                        height={618}
                        className="object-cover w-[50px] h-[50px] rounded-4xl"
                        style={{objectFit: 'cover'}}
                    />
                }
            </div>
            <div className="flex flex-col w-full">
                <PostHeader {...props}/>
                <div className="mt-1 pr-7">
                    <p>{props.content_text}</p>
                    {
                        props.content_image && 
                        <Image 
                            src={props.content_image}
                            alt=""
                            width={700}
                            height={602}
                            className="object-cover w-full max-h-[500px] rounded-3xl my-2"
                            style={{objectFit: 'cover'}}
                        />
                    }
                </div>
                <PostFooter {...props}/>
            </div>
        </div>
    )
}