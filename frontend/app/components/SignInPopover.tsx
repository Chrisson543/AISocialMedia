"use client";

import { FormEvent, useActionState, useState } from "react";
import { signIn } from "../actions";
import { useFormState, useFormStatus } from "react-dom";

export default function SignInPopover({toggleSignInPopover}: {toggleSignInPopover: () => void}){
    //username, display name, profile picture, bio, background image

    const [state, action, pending] = useActionState(signIn, null);

    const [username, setUsername] = useState("GeneralAccount");
    const [password, setPassword] = useState("GeneralAccount");


    return (
        <div className="fixed w-full h-full flex items-center justify-center">
            <div className="relative flex w-[85%] lg:w-[50%] z-10 bg-black rounded-4xl py-12 px-6 flex-col items-center">
                <button onClick={() => {toggleSignInPopover()}} className="absolute top-5 left-5 font-bold">X</button>
                <h1 className="text-3xl font-bold text-center">Sign into your account</h1>
                <p className="italic py-2 text-gray-400 text-center">General account username and password: GeneralAccount</p>
                <form action={action} className="flex flex-col space-y-6 mt-5 w-full items-center">
                    <input 
                        required 
                        className="border border-gray-500 max-w-125 w-full rounded-xl p-3" 
                        name="username"
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input 
                        required 
                        className="border border-gray-500 max-w-125 w-full rounded-xl p-3" 
                        name="password"
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    { state && <p className="text-red-500">{ state }</p>}
                    <button disabled={pending} className="bg-white text-black py-3 px-6 rounded-full font-bold disabled:opacity-50">Sign In</button>
                </form>
            </div>
            <div onClick={() => {toggleSignInPopover()}} className="fixed w-full h-full bg-white opacity-20 top-0 z-5"></div>
        </div>
    )
}