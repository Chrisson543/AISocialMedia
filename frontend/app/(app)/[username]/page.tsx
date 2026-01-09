import Image from "next/image";
import { PostT, UserT } from "@/app/types";
import Icon from "@/app/components/Icon";
import BlankPfp from '@/app/assets/blank_pfp.png';
import calendarIcon from '@/app/assets/icons/calendar-grey.png';
import { format } from "date-fns";
import BackButton from "@/app//components/BackButton";
import Post from "@/app/components/Post/Post";
import Tabs from "@/app/components/Tabs";
import Link from "next/link";
import { apiFetch, getUser } from "@/lib/api-helpers";
import { followUser, unfollowUser } from "@/app/actions";
import FollowButton from "@/app/components/FollowButton";
import EditProfilePopover from "@/app/components/EditProfileButton";
import ProfilePicture from "@/app/components/ProfilePicture";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}){
    const { username } = await params;

    const currentUser = await getUser()

    const userData = await apiFetch<UserT>(`/users/${username}`,{
        method: "POST",
        redirectOn401: true,
        body: {
            userId: currentUser.id
        }
    })

    const userPosts = await apiFetch<PostT[]>(`/posts/${username}`,{
        method: "POST",
        redirectOn401: true,
        body: {
            viewer: currentUser.username
        }
    })

    const tabViews = [
            {
                name: 'Posts',
                items: userPosts.map(post =>
                        <Post {...post} key={post.id}/>
                    )
            },
            // {
            //     name: 'Media',
            //     items: userPosts
            //         .filter(post => post.content_image)
            //         .map(post =>
            //             post.content_image ? (<Post {...post} key={post.id}/>) : null
            //         )
            // }
        ]

    return(
        <div className="flex flex-col w-full h-full bg-black overflow-y-auto">
            <div className="flex flex-col w-full">
                <div className="flex flex-col w-full">
                    <div className="w-full flex flex-row items-center space-x-3 fixed bg-black p-3 z-20">
                        <BackButton />
                        <div className="ml-3">
                            <h1 className="text-2xl font-bold">{userData.display_name}</h1>
                            <p className="text-gray-600">{userPosts.length} posts</p>
                        </div>
                    </div>
                    <div className="w-full mt-15 p-3">
                        <ProfilePicture
                            userData={{profile_picture: userData.background_image}} 
                            size={{width: 1024, height: 576}} 
                            style={{height: 200, width: '100%', objectFit:'cover'}}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full p-3">
                    <div className="flex flex-col w-full relative">
                        <div className="w-40 h-40 bg-black flex items-center justify-center rounded-full absolute -translate-y-1/2">
                            <ProfilePicture
                                userData={userData} 
                                className="rounded-full"
                                size={{width: 300, height: 300}} 
                                style={{width: 150, height: 150}}
                            />
                        </div>
                        <div className="flex flex-row self-end items-center space-x-3 mt-3">
                            {/* <Icon path={optionIcon} size={{width: 40, height: 40}} className="border rounded-full border-white p-3" /> */}
                            <FollowButton currentUser={currentUser} userData={userData} />
                        </div>
                    </div>
                    <div className="flex flex-col w-full px-3 pt-7">
                        <h1 className="text-2xl font-bold">{userData.display_name}</h1>
                        <p className="text-gray-500">@{userData.username}</p>
                        <p>{userData.bio}</p>
                        <div className="text-[#878787] my-2">
                            <span className="flex flex-row space-x-2 items-center">
                                <Icon path={calendarIcon} size={{width: 18, height: 18}} />
                                <p>Joined {format(userData.created_at, 'MMM yyyy')}</p>
                            </span>
                        </div>
                        <div className="text-[#878787] flex space-x-3">
                            <Link href={`/${username}/following`}>
                                <p><span className="text-white font-bold">{userData.following_count}</span> Following</p>
                            </Link>
                            
                            <Link href={`/${username}/followers`}>
                                <p><span className="text-white font-bold">{userData.follower_count}</span> Followers</p>
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Tabs tabViews={tabViews} />
        </div>
    )
}   