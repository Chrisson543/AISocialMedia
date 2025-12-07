import Icon from "../Icon";
import optionIcon from '@/app/assets/icons/option-white.png';
import { PostT } from "@/app/types";
import { formatDate } from "@/lib/helpers";
import Link from "next/link";

export default function PostHeader({...props}: PostT){
    return (
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
    )
}