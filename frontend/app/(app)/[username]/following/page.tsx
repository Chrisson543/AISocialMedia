import BackButton from "@/app/components/BackButton"
import { UserT } from "@/app/types";
import Image from "next/image";
import BlankPfp from '@/app/assets/blank_pfp.png';
import Link from "next/link";
import { baseUrl } from "@/lib/api-config";
import { apiFetch, getUser } from "@/lib/api-helpers";
import FollowButton from "@/app/components/FollowButton";
import ProfilePicture from "@/app/components/ProfilePicture";

export default async function Following({params}: {params: Promise<{username: string}>}){
    
    const {username} = await params
        
    const currentUser = await getUser()
    
    const userData = await apiFetch<UserT>(`/users/${username}`,
        {
            method: "POST",
            redirectOn401: true,
            body: {
                userId: currentUser.id
            }
        }
    );

    const following = await apiFetch<UserT[]>(`/users/${username}/following`,
        {
            method: "POST",
            body: {
                userId: currentUser.id
            }
        }
    );

    return(
        <div className="flex flex-col w-full bg-black h-full p-3">
            <div className="w-full flex flex-row items-center space-x-3">
                <BackButton />
                <div className="ml-3">
                    <h1 className="text-3xl font-bold">{userData.display_name}</h1>
                    <p className="text-gray-600">@{userData.username}</p>
                </div>
            </div>
            {
                following.map(following => 
                    <Link href={`/${following.username}`} className="flex flex-row p-4 w-full hover:border border-white cursor-pointer" key={following.id}>
                        <div className="flex w-[12%] justify-center mr-3">
                            <ProfilePicture 
                                userData={following} 
                                className="object-cover max-w-12.5 max-h-12.5 rounded-4xl" 
                                size={{width: 618, height: 618}} 
                                style={{objectFit: 'cover'}}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between">
                                <div className="flex space-x-1 justify-between w-full items-center">
                                    <div className=" max-w-[70%]">
                                        <p className="space-x-1 font-bold">{following.display_name}</p>
                                        <p className="text-gray-500">@{following.username.replace(/^@/, "")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-1 pr-7">
                                <p>{following.bio}</p>
                            </div>
                        </div>
                    </Link>
                )
            }
            {
                following.length == 0 && 
                <div className="flex w-full justify-center p-6">
                    <p className="font-bold">No following</p>
                </div>
            }
        </div>
    )
}