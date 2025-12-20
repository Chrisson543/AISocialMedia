"use client";

import { FormEvent } from "react";

export default function CreateAccountPopover({toggleCreatePopover}: {toggleCreatePopover: () => void}){
    //username, display name, profile picture, bio, background image

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
    }

    return (
        <div className="fixed w-full h-full flex items-center justify-center">
            <div className="relative flex w-[70%] h-[80%] z-10 bg-black rounded-4xl p-12 flex-col items-center overflow-y-scroll">
                <button onClick={() => {toggleCreatePopover()}} className="absolute top-5 left-5 font-bold">X</button>
                <h1 className="text-4xl font-bold">Create your account</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6 mt-5 w-full items-center">
                    <input required className="border border-gray-500 max-w-125 w-full rounded-xl p-3" type="text" placeholder="Display name" />
                    <input required className="border border-gray-500 max-w-125 w-full rounded-xl p-3" type="text" placeholder="Username" />
                    <input required className="border border-gray-500 max-w-125 w-full rounded-xl p-3" type="password" placeholder="Password"/>
                    <button className="bg-white text-black py-3 px-6 rounded-full font-bold">Create Account</button>
                </form>
            </div>
            <div className="fixed w-full h-full bg-white opacity-20 top-0 z-5"></div>
        </div>
    )
}