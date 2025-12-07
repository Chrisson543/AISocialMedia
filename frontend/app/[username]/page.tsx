import Image from "next/image";
import { PostT, UserT } from "../types";
import Icon from "../components/Icon";
import BlankPfp from '../assets/blank_pfp.png'
import optionIcon from '@/app/assets/icons/option-white.png';
import calendarIcon from '@/app/assets/icons/calendar-grey.png';
import { format } from "date-fns";
import BackButton from "../components/BackButton";
import Post from "../components/posts/Post";
import Tabs from "../components/Tabs";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}){
    const { username } = await params;

    const userDataRes = await fetch(`http://localhost:4000/users/${username}`);
    const userData: UserT = await userDataRes.json()

    const userPostsRes = await fetch(`http://localhost:4000/posts/${username}`);
    const userPosts: PostT[] = await userPostsRes.json()

    const tabViews = {
            posts: userPosts.map(post =>
                        <Post {...post} key={post.id}/>
                    ),
            media: userPosts
                    .filter(post => post.content_image)
                    .map(post =>
                        post.content_image ? (<Post {...post} key={post.id}/>) : null
                    )
        }

    return(
        <div className="flex flex-col w-full h-full bg-black">
            <div className="flex flex-col w-full p-3">
                <div className="flex flex-col w-full">
                    <div className="w-full flex flex-row items-center space-x-3">
                        <BackButton />
                        <div className="ml-3">
                            <h1 className="text-3xl font-bold">{userData.display_name}</h1>
                            <p className="text-gray-600">{userPosts.length} posts</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <Image 
                            src={'https://replogleglobes.com/app/uploads/2022/08/how-many-planets-in-our-solar-system.jpg'}
                            width={1024}
                            height={576}
                            alt="header"
                            style={{height: 200, width: '100%', objectFit:'cover'}}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full relative">
                        <div className="w-40 h-40 bg-black flex items-center justify-center rounded-full absolute -translate-y-1/2">
                            <Image 
                                src={userData.profile_picture? userData.profile_picture : BlankPfp}
                                alt="pfp"
                                width={300}
                                height={300}
                                style={{width: 150, height: 150}}
                                className="rounded-full"
                            />
                        </div>
                        <div className="flex flex-row self-end items-center space-x-3 mt-3">
                            <Icon path={optionIcon} size={{width: 40, height: 40}} className="border rounded-full border-white p-3" />
                            <button className="bg-white px-6 py-3 text-black font-semibold rounded-full">Follow</button>
                        </div>
                    </div>
                    <div className="flex flex-col w-full px-3 pt-7">
                        <h1 className="text-3xl font-bold">{userData.display_name}</h1>
                        <p className="text-gray-500">@{userData.username}</p>
                        <p>{userData.bio}</p>
                        <div className="text-[#878787] my-2">
                            <span className="flex flex-row space-x-2 items-center">
                                <Icon path={calendarIcon} size={{width: 18, height: 18}} />
                                <p>Joined {format(userData.created_at, 'MMM yyyy')}</p>
                            </span>
                        </div>
                        <div className="text-[#878787] flex space-x-3">
                            <Link href={`/${username}/followers`}>
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