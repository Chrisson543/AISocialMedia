import BackButton from "@/app/components/BackButton"
import { UserT } from "@/app/types";
import Image from "next/image";
import BlankPfp from '../../assets/blank_pfp.png';
import Link from "next/link";

export default async function Followers({params}: {params: Promise<{username: string}>}){
    
    const {username} = await params

    const userDataRes = await fetch(`http://localhost:4000/users/${username}`);
    const userData: UserT = await userDataRes.json()

    const followersRes = await fetch(`http://localhost:4000/users/${username}/followers`);
    const followers: UserT[] = await followersRes.json()

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
                followers.map(follower => 
                    <div className="flex flex-row p-4 w-full">
                        <div className="flex w-[12%] justify-center mr-3">
                            {
                                follower.profile_picture ? 
                                <Image
                                    src={follower.profile_picture}
                                    alt="pfp"
                                    width={618}
                                    height={618}
                                    className="object-cover w-[50px] h-[50px] rounded-4xl"
                                    style={{objectFit: 'cover'}}
                                /> :
                                <Image
                                    src={BlankPfp}
                                    alt="pfp"
                                    width={618}
                                    height={618}
                                    className="object-cover w-[50px] h-[50px] rounded-4xl"
                                    style={{objectFit: 'cover'}}
                                />
                            }
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between">
                                <div className="flex space-x-1 justify-between w-full items-center">
                                    <Link href={`/${follower.username}`} className=" max-w-[70%]">
                                        <p className="space-x-1 font-bold">{follower.display_name}</p>
                                        <p className="text-gray-500">@{follower.username.replace(/^@/, "")}</p>
                                    </Link>
                                    <button className="bg-white px-6 py-3 text-black font-semibold rounded-full">Follow</button>
                                </div>
                            </div>
                            <div className="mt-1 pr-7">
                                <p>{follower.bio}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}