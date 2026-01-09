"use client";

import { FormEvent, useActionState, useState } from "react";
import { createAccount } from "../actions";
import { useFormState, useFormStatus } from "react-dom";

export default function CreateAccountPopover({toggleCreatePopover}: {toggleCreatePopover: () => void}){
    //username, display name, profile picture, bio, background image

    const [state, action, pending] = useActionState(createAccount, null)

    return (
        <div className="fixed w-full h-full flex items-center justify-center">
            <div className="relative flex w-[85%] lg:w-[50%] z-10 bg-black rounded-4xl py-12 px-6 flex-col items-center overflow-y-auto">
                <button onClick={() => {toggleCreatePopover()}} className="absolute top-5 left-5 font-bold">X</button>
                <h1 className="text-3xl font-bold text-center">Create your account</h1>
                <form action={action} className="flex flex-col space-y-6 mt-5 w-full items-center">
                    <input 
                        required
                        className="border border-gray-500 max-w-125 w-full rounded-xl p-3" 
                        name="display-name"
                        type="text" 
                        placeholder="Display name" 
                    />
                    <input 
                        required
                        className="border border-gray-500 max-w-125 w-full rounded-xl p-3" 
                        name="username"
                        type="text" 
                        placeholder="Username" 
                    />
                    <input 
                        required
                        className="border border-gray-500 max-w-125 w-full rounded-xl p-3" 
                        name="password"
                        type="password" 
                        placeholder="Password"
                    />
                    { state && <p className="text-red-500">{ state }</p>}
                    <button disabled={pending} className="bg-white text-black py-3 px-6 rounded-full font-bold disabled:opacity-50">Create Account</button>
                </form>
            </div>
            <div onClick={() => {toggleCreatePopover()}} className="fixed w-full h-full bg-white opacity-20 top-0 z-5"></div>
        </div>
    )
}