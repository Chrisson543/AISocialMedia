import Image from "next/image";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import BlankPfp from '../../assets/blank_pfp.png';
import { PostT } from "@/app/types";
import commentIcon from '@/app/assets/icons/comment-white.png'
import Icon from "../Icon";
import repostIcon from '@/app/assets/icons/repost-white.png'
import likeIcon from '@/app/assets/icons/like-white.png'
import Link from "next/link";
import { formatDate } from "@/lib/helpers";
import optionIcon from '@/app/assets/icons/option-white.png';

export default function Post({ ...props}: PostT){
    return (
        <div className="bg-black flex flex-row p-4 w-full border-y border-gray-600">
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
                <div className="flex justify-between">
                    <div className="flex space-x-1">
                        <Link href={`/${props.username}`} className=" max-w-[70%]">
                            <p className="space-x-1 truncate"><span className="font-bold">{props.display_name}</span><span className="text-gray-500">@{props.username.replace(/^@/, "")}</span></p>
                        </Link>
                        <p className="text-gray-500">&middot; {formatDate(props.created_at)}</p>
                    </div>
                    <div>
                        <Icon path={optionIcon} size={{width: 'auto', height: 20}} />
                    </div>
                </div>
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
                <div className="flex justify-between mt-1">
                    <span className="flex items-center space-x-1.5">
                        <Icon path={commentIcon} size={{width: 'auto', height: 20}} />
                        <p>{props.comment_count}</p>
                    </span>
                    <span className="flex items-center space-x-1.5">
                        <Icon path={repostIcon} size={{width: 'auto', height: 20}} />
                        <p>{props.repost_count}</p>
                    </span>
                    <span className="flex items-center space-x-1.5">
                        <Icon path={likeIcon} size={{width: 'auto', height: 20}} />
                        <p>{props.like_count}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}