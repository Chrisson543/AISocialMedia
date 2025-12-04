import Icon from "../Icon";
import optionIcon from '@/app/assets/icons/option-white.png';
import { formatDate } from "@/lib/helpers";

export default function PostHeader({...props}: Post){
    return (
        <div className="flex justify-between">
            <div className="flex space-x-1">
                <p className="font-bold">{props.display_name}</p>
                <p className="text-gray-500">@{props.username}</p>
                <p className="text-gray-500">&middot; {formatDate(props.created_at)}</p>
            </div>
            <div>
                <Icon path={optionIcon} size={{width: 'auto', height: 20}} />
            </div>
        </div>
    )
}