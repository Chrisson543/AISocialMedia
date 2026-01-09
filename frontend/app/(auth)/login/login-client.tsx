"use client";

import CreateAccountPopover from "@/app/components/CreateAccountPopover";
import SignInPopover from "@/app/components/SignInPopover";
import { useState } from "react";

export default function LoginClient(){

    const [showCreatePopover, setShowCreatePopover] = useState(false)
    const [showSignInPopover, setShowSignInPopover] = useState(false)

    function toggleCreatePopover(){
        setShowCreatePopover(!showCreatePopover)
    }

    function toggleSignInPopover(){
        setShowSignInPopover(!showSignInPopover)
    }

    return (
        <main className="w-full h-full flex flex-col lg:flex-row">
            <div className="lg:w-[50%] text-5xl lg:text-9xl items-center justify-center flex font-bold p-10 lg:p-20">
                C
            </div>
            <div className="w-full lg:w-[50%] items-center flex lg:justify-center flex-col px-20 py-0 lg:p-20">
                <h1 className="text-5xl font-bold py-6">Happening now</h1>
                <h2 className="text-4xl font-bold py-6">Join today.</h2>
                <div className="flex flex-col space-y-6 py-15">
                    <button onClick={() => {toggleCreatePopover()}} className="max-w-75 px-6 py-3 bg-white text-black rounded-full font-bold text-xl">Create account</button>
                    <button onClick={() => {toggleSignInPopover()}} className="max-w-75 px-6 py-3 bg-white text-black rounded-full font-bold text-xl">Sign in</button>
                </div>
            </div>
            {showCreatePopover && <CreateAccountPopover toggleCreatePopover={toggleCreatePopover}/>}
            {showSignInPopover && <SignInPopover toggleSignInPopover={toggleSignInPopover}/>}
        </main>
    )
}