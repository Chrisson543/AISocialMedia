"use client"

import { PostT } from "@/app/types";
import likeIcon from '@/app/assets/icons/like-white.png'
import likedIcon from '@/app/assets/icons/like_heart.png'
import Icon from "../Icon";
import { useActionState } from "react";
import { likePost, removeLike } from "@/app/actions";

export default function LikeButton({ ...props }: PostT){

    let likedByMe = props.liked_by_me;
    
    const [likeState, likeAction, likePending] = useActionState(likePost, {})
    const [removelikeState, removeLikeAction, removeLikePending] = useActionState(removeLike, {})

    return (
            <form action={likedByMe ? removeLikeAction : likeAction} className="flex">
                <button className="flex items-center space-x-1.5"  type='submit' disabled={likePending || removeLikePending}>
                    <Icon path={likedByMe ? likedIcon : likeIcon} size={{width: 'auto', height: 20}} />
                    <input type="hidden" name="postId" value={props.id} />
                    <input type="hidden" name="author" value={props.username} />
                    <p>{props.like_count}</p>
                </button>
            </form>
    )
}