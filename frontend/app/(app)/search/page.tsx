"use client";

import { UserT } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react"
import BlankPfp from '../../assets/blank_pfp.png';
import Link from "next/link";
import ProfilePicture from "@/app/components/ProfilePicture";

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

                const res = await fetch(`/api/users/search/${encodeURIComponent(searchTerm)}`, {
                    signal,
                    cache: "no-store",
                });
                if (!res.ok) throw new Error(await res.text());
                const data = (await res.json()) as UserT[];
                setSearchSuggestions(data);

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
        <div className="w-full flex flex-col h-full">
            <form onSubmit={handleSubmit} className="fixed w-full bg-black p-3">
                <input 
                    name="search-term" 
                    type="text" 
                    placeholder="Search User" 
                    value={searchTerm} 
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                    className="border border-white rounded-full p-3 w-full"
                />
            </form>
            <div className="flex flex-col w-full h-full pt-18.5">
                {searchSuggestions.map(user => {
                    return(
                        <Link href={`/${user.username}`} key={user.username} className="bg-black hover:opacity-80 hover:border flex flex-row w-full p-3 justify-start items-center">
                            <div className="flex w-auto h-full justify-center mr-3">
                                <ProfilePicture
                                    userData={user} 
                                    className="object-cover h-full max-w-12.5 max-h-12.5 rounded-4xl"
                                    size={{width: 618, height: 618}} 
                                    style={{objectFit: 'cover'}}
                                />
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
                {
                    searchTerm !== "" && searchSuggestions.length == 0 && 
                    <div className="flex w-full justify-center p-6">
                        <p>No results</p>
                    </div>
                }
            </div>
        </div>
    )
}