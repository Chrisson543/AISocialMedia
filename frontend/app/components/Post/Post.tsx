
import Image from "next/image";
import BlankPfp from '@/app//assets/blank_pfp.png';
import { PostT } from "@/app/types";
import commentIcon from '@/app/assets/icons/comment-white.png'
import Icon from "@/app/components/Icon";
import repostIcon from '@/app/assets/icons/repost-white.png'
import Link from "next/link";
import { formatDate } from "@/lib/helpers";
import optionIcon from '@/app/assets/icons/option-white.png';
import { apiFetch, getUser } from "@/lib/api-helpers";
import { revalidatePath } from "next/cache";
import LikeButton from "./LikeButton";
import DeletePostButton from "./DeletePostButton";
import ProfilePicture from "../ProfilePicture";

export default async function Post({ ...props}: PostT){
    const currentUser = await getUser()

    return (
        <div className="bg-black flex flex-row p-4 w-full border-y border-gray-600">
            <Link href={`/${props.username}`} className="flex w-[12%] justify-center mr-3">
                <ProfilePicture
                    userData={props} 
                    className="object-cover max-w-12.5 max-h-12.5 rounded-4xl"
                    size={{width: 618, height: 618}} 
                    style={{objectFit: 'cover'}}
                />
            </Link>
            <div className="flex flex-col w-full">
                <div className="flex justify-between w-full">
                    <div className="flex space-x-1 w-[90%]">
                        <Link href={`/${props.username}`} className="flex flex-wrap space-x-1.5">
                            <p className="space-x-1 font-bold">{props.display_name}</p>
                            <p className="space-x-1 text-gray-500">
                                @{props.username.replace(/^@/, "")}
                                <span className="text-gray-500">&middot; {formatDate(props.created_at)}</span>
                            </p>
                        </Link>
                    </div>
                    <DeletePostButton props={props} currentUser={currentUser} />
                </div>
                <div className="mt-1 pr-7 w-full">
                    <p>{props.content_text}</p>
                    {
                        props.content_image && 
                        <Image 
                            src={props.content_image}
                            alt=""
                            width={700}
                            height={602}
                            className="object-cover w-full max-h-125 rounded-3xl my-2"
                            style={{objectFit: 'cover'}}
                        />
                    }
                </div>
                <div className="flex justify-between mt-1 w-full">
                    <button disabled className="disabled:opacity-30 flex items-center space-x-1.5">
                        <Icon path={commentIcon} size={{width: 'auto', height: 20}} />
                        <p>{props.comment_count}</p>
                    </button>
                    <button disabled className="disabled:opacity-30 flex items-center space-x-1.5">
                        <Icon path={repostIcon} size={{width: 'auto', height: 20}} />
                        <p>{props.repost_count}</p>
                    </button>
                    <LikeButton { ...props } />
                </div>
            </div>
        </div>
    )
}