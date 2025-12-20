import BackButton from "@/app/components/BackButton"
import { UserT } from "@/app/types";
import Image from "next/image";
import BlankPfp from '@/app/assets/blank_pfp.png';
import Link from "next/link";
import { baseUrl } from "@/lib/api-config";

export default async function Following({params}: {params: Promise<{username: string}>}){
    
    const {username} = await params

    const userDataRes = await fetch(`${baseUrl}/users/${username}`);
    const userData: UserT = await userDataRes.json()

    const followingRes = await fetch(`${baseUrl}/users/${username}/following`);
    const following: UserT[] = await followingRes.json()

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
                    <div className="flex flex-row p-4 w-full" key={following.id}>
                        <Link href={`/${following.username}`} className="flex w-[12%] justify-center mr-3">
                            {
                                following.profile_picture ? 
                                <Image
                                    src={following.profile_picture}
                                    alt="pfp"
                                    width={618}
                                    height={618}
                                    className="object-cover max-w-12.5 max-h-12.5 rounded-4xl"
                                    style={{objectFit: 'cover'}}
                                /> :
                                <Image
                                    src={BlankPfp}
                                    alt="pfp"
                                    width={618}
                                    height={618}
                                    className="object-cover max-w-12.5 max-h-12.5 rounded-4xl"
                                    style={{objectFit: 'cover'}}
                                />
                            }
                        </Link>
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between">
                                <div className="flex space-x-1 justify-between w-full items-center">
                                    <Link href={`/${following.username}`} className=" max-w-[70%]">
                                        <p className="space-x-1 font-bold">{following.display_name}</p>
                                        <p className="text-gray-500">@{following.username.replace(/^@/, "")}</p>
                                    </Link>
                                    <button className="bg-white px-6 py-3 text-black font-semibold rounded-full">Follow</button>
                                </div>
                            </div>
                            <div className="mt-1 pr-7">
                                <p>{following.bio}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}