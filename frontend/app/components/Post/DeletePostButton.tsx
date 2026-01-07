"use client"

import { PostT, UserT } from "@/app/types"
import optionIcon from '@/app/assets/icons/option-white.png';
import Icon from "../Icon";
import { useActionState, useState } from "react";
import { deletePost } from "@/app/actions";

export default function DeletePostButton(
    { props, currentUser }:
    {
        props: PostT,
        currentUser: UserT
    }
){

    const [showDelete, setShowDelete] = useState(false)
    const [state, action, pending] = useActionState(deletePost, null)

    function toggleDelete(){
        setShowDelete(prevState => !prevState)
    }

    return (
        props.username == currentUser.username &&
        <div className="relative flex w-[10%] justify-end">
            <button onClick={() => {toggleDelete()}}>
                <Icon path={optionIcon} size={{width: 25, height: 'auto'}} />
            </button>
            {
                showDelete &&
                <div className="relative">
                    <div onClick={() => {toggleDelete()}} className="fixed left-0 top-0 w-screen h-screen z-30 bg-white opacity-8"></div>
                    <form action={action} className="absolute -top-15 right-0 bg-black z-40 rounded-xl">
                        <input type="hidden" name="postId" value={props.id} />
                        <button disabled={pending} className="py-3 px-6 w-35 border-white border rounded-xl disabled:opacity-50">
                            <p>Delete post</p>
                        </button>
                    </form>
                </div>
            }
        </div>
    )
}