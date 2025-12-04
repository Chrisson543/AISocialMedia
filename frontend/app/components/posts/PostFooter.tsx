import Icon from "../Icon";
import commentIcon from '@/app/assets/icons/comment-white.png'
import likeIcon from '@/app/assets/icons/like-white.png'
import repostIcon from '@/app/assets/icons/repost-white.png'

export default function PostFooter({...props}: Post){
    return (
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
    )
}