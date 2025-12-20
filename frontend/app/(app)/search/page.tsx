"use client";

import { UserT } from "@/app/types";
import { baseUrl } from "@/lib/api-config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react"
import BlankPfp from '../../assets/blank_pfp.png';
import Link from "next/link";

export default function Page(){
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState<UserT[]>([]);

    const router = useRouter();

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        router.push(`/${searchTerm}`)
    }

    useEffect(() => {

        const controller = new AbortController()
        const { signal } = controller

        const id = setTimeout(async () => {
            try{

                if (!searchTerm) return

                const res = await fetch(`${baseUrl}/users/search/${searchTerm}`, { signal });
                const data = await res.json()
                
                setSearchSuggestions(data)
            }
            catch (err:any){
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            }
        }, 300)

        return () => {
            clearTimeout(id);
            controller.abort();
        };

    }, [searchTerm])

    return (
        <div className="w-full p-3">
            <form onSubmit={handleSubmit}>
                <input 
                    name="search-term" 
                    type="text" 
                    placeholder="Search User" 
                    value={searchTerm} 
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                    className="border border-white rounded-full p-3 w-full"
                />
                <div>
                    {searchSuggestions.map(user => {
                        return(
                            <Link href={`/${user.username}`} key={user.username} className="bg-black hover:opacity-80 hover:border flex flex-row w-full p-3 justify-start items-center">
                                <div className="flex w-auto h-full justify-center mr-3">
                                    {
                                        user.profile_picture ? 
                                        <Image
                                            src={user.profile_picture}
                                            alt="pfp"
                                            width={618}
                                            height={618}
                                            className="object-cover h-full max-w-12.5 max-h-12.5 rounded-4xl"
                                            style={{objectFit: 'cover'}}
                                        /> :
                                        <Image
                                            src={BlankPfp}
                                            alt="pfp"
                                            width={618}
                                            height={618}
                                            className="object-cover h-full max-w-12.5 max-h-12.5 rounded-4xl"
                                            style={{objectFit: 'cover'}}
                                        />
                                    }
                                </div>
                                <div className="flex flex-col w-[80%]">
                                    <div className="flex justify-between w-full">
                                        <div className="flex space-x-1 w-[85%]">
                                            <div className="block space-x-1.5">
                                                <p className="space-x-1 font-bold">{user.display_name}</p>
                                                <p className="space-x-1 text-gray-500">
                                                    @{user.username.replace(/^@/, "")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </form>
        </div>
    )
}