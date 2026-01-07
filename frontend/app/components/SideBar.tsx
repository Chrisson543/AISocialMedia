"use client"

import Icon from "@/app/components/Icon";
import HomeIcon from '@/app/assets/icons/home.png';
import SearchIcon from '@/app/assets/icons/search.png';
import Usercon from '@/app/assets/icons/user.png';
import Link from "next/link";
import Image from "next/image";
import BlankPfp from '@/app/assets/blank_pfp.png';
import optionIcon from '@/app/assets/icons/option-white.png';
import newPost from '@/app/assets/icons/new-post.png';
import { UserT } from "../types";
import { useActionState, useEffect, useState } from "react";
import { createPost, logout } from "../actions";
import ProfilePicture from "./ProfilePicture";

export default function SideBar({ user }: {user: UserT}){
    const iconSize = 23;

    const navbarItems = [
        {
            name: 'Home',
            path: '/',
            icon: HomeIcon,
            size: {
                width: iconSize,
                height: iconSize
            }
        },
        {
            name: 'Search',
            path: '/search',
            icon: SearchIcon,
            size: {
                width: 20,
                height: 20
            }
        },
        {
            name: 'Profile',
            path: '/' + user.username,
            icon: Usercon,
            size: {
                width: iconSize,
                height: iconSize
            }
        }
    ]

    const [showLogoutPopover, setShowLogoutPopover] = useState(false)
    const [showNewPostPopover, setShowNewPostPopover] = useState(false)
    const [postState, postAction, postIsPending] = useActionState(createPost, null)

    function toggleLogoutPopup(){
        setShowLogoutPopover(prevState => !prevState)
    }

    function togglePostPopup(){
        setShowNewPostPopover(prevState => !prevState)
    }

    useEffect(() => {
        if (!postState) return;
        if (postState.status === 'success') {
            togglePostPopup();
        }
    }, [postState]);

    return (
        <nav className="flex border-t lg:border-t-0 flex-row lg:flex-col h-20 lg:h-screen p-3 pt-6 justify-between border-r border-gray-500 w-full lg:w-[20%] fixed lg:sticky bottom-0 lg:top-0 z-10 bg-black">
            <div className="lg:space-y-3 flex flex-row lg:flex-col justify-around items-center lg:items-start w-[85%] lg:w-full lg:px-6">
                {
                    navbarItems.map(item => {
                        return (
                            <Link href={item.path} key={item.name} className="flex lg:space-x-4 items-center hover:opacity-80">
                                <Icon path={item.icon} size={item.size}/> 
                                <p className="text-2xl hidden lg:block">{item.name}</p>
                            </Link>
                        )
                    })
                }
                <button onClick={() => {togglePostPopup()}} className="lg:hidden">
                    <Icon path={newPost} size={{width: iconSize,height: iconSize}}/>
                </button>
            </div>
            <div className="flex flex-row lg:flex-col w-[15%] lg:w-full space-y-3">
                <button
                    className="bg-white text-black px-8 py-4 rounded-full font-bold lg:flex justify-center hover:opacity-90 hidden"
                    onClick={() => {togglePostPopup()}}
                >
                    Post
                </button>
                <button 
                    className="bg-black flex flex-row  lg:w-full lg:p-3 items-center hover:opacity-70 hover:bg-gray-800 hover:rounded-full"
                    onClick={() => {toggleLogoutPopup()}}
                >
                    <div className="flex lg:w-[20%] h-full justify-center mr-3">
                        <ProfilePicture
                            userData={user} 
                            className="object-cover max-w-12.5 max-h-12.5 rounded-4xl"
                            size={{width: 618, height: 618}} 
                            style={{objectFit: 'cover'}}
                        />
                    </div>
                    <div className="hidden lg:flex flex-col w-[80%]">
                        <div className="flex justify-between w-full">
                            <div className="flex space-x-1 w-[85%]">
                                <div className="block space-x-1.5">
                                    <p className="space-x-1 font-bold">{ user.display_name }</p>
                                    <p className="space-x-1 text-gray-500">
                                        @{user.username.replace(/^@/, "")}
                                    </p>
                                </div>
                            </div>
                            <div className="flex w-[15%] justify-end items-center">
                                <Icon path={optionIcon} size={{width: 25, height: 'auto'}} />
                            </div>
                        </div>
                    </div>
                </button>
            </div>
            {
                showLogoutPopover &&
                <div className="flex fixed w-full h-full top-0 left-0">
                    <div onClick={() => {toggleLogoutPopup()}} className="absolute w-screen h-screen bg-white top-0 left-0 opacity-0"></div>
                    <div className="absolute bottom-20 right-0 lg:right-auto lg:left-10 bg-black border border-white font-bold rounded-xl py-2">
                        <button onClick={() => {logout()}} className="p-4 hover:opacity-90 hover:bg-gray-800">Log Out @{user.username}</button>
                    </div>
                </div>
            }
            {
                showNewPostPopover &&
                <div className="flex fixed w-full items-center justify-center h-full top-0 left-0">
                    <div onClick={() => {togglePostPopup()}} className="absolute w-screen h-screen bg-white top-0 left-0 opacity-10"></div>
                    <form 
                        action={postAction}
                        className="absolute flex flex-col p-3 w-[90%] lg:w-[60%] h-[60%] bg-black rounded-xl py-2 justify-between"
                    >
                        <div>
                            <button onClick={() => {togglePostPopup()}}>X</button>
                        </div>
                        <div className="flex flex-row h-full">
                            <div className="flex w-[15%] lg:w-[12%] justify-center">
                                <ProfilePicture
                                    userData={user} 
                                    className="object-cover max-w-12.5 max-h-12.5 rounded-4xl"
                                    size={{width: 618, height: 618}} 
                                    style={{objectFit: 'cover'}}
                                />
                            </div>
                            <div className="flex w-[85%] lg:w-[88%] h-full">
                                <textarea required className="w-full text-2xl p-3 h-full resize-none focus:outline-none" name="contentText" id="contentText" placeholder="Whats happening?"></textarea>
                            </div>
                        </div>
                        <div className="border-t border-t-gray-800 pt-3 flex justify-end flex-col items-end">
                            { postState?.status == 'error' && <p className="text-red-500 self-center">{ postState.error }</p>}
                            <button disabled={postIsPending} type="submit" className="bg-white px-6 py-3 text-black font-bold rounded-full disabled:opacity-50">Post</button>
                        </div>
                    </form>
                </div>
            }
        </nav>
    )
}