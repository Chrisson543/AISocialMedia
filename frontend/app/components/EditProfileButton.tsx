"use client";

import { FormEvent, useActionState, useState } from "react";
import { createAccount, editProfile } from "../actions";
import { useFormState, useFormStatus } from "react-dom";
import { getUserClient } from "@/lib/helpers";
import { UserT } from "../types";

export default function EditProfileButton(
    {currentUser, userData}: { currentUser: UserT, userData: UserT}
){
    //username, display name, profile picture, bio, background image

    const [state, action, pending] = useActionState(editProfile, null)
    const [showPopover, setShowPopover] = useState(false)

    function togglePopover(){
        setShowPopover(prevState => !prevState)
    }


    return (
        <div>
            <button onClick={() => {togglePopover()}} className="border px-6 py-3 text-white font-semibold rounded-full hover:opacity-80">Edit Profile</button>
            {
                showPopover && 
                <div className="fixed w-screen h-screen left-0 top-0 z-50 flex items-center justify-center">
                    <div className="relative flex lg:w-[70%] w-[90%] max-h-[70%] z-10 bg-black rounded-4xl py-12 px-6 flex-col items-center overflow-y-scroll">
                        <button onClick={() => {togglePopover()}} className="absolute top-5 left-5 font-bold">X</button>
                        <h1 className="text-3xl font-bold">Edit your profile</h1>
                        <form action={action} className="flex flex-col space-y-6 mt-5 w-full items-center justify-center">
                            <div className="flex flex-col max-w-125 w-full space-y-3 items-center">
                                <label className="font-bold" htmlFor="display-name">Display Name</label>
                                <input 
                                    required
                                    className="border border-gray-500 max-w-125 w-full rounded-xl p-3" 
                                    name="display-name"
                                    type="text" 
                                    placeholder="Display name" 
                                    defaultValue={userData.display_name}
                                />
                            </div> 
                            <div className="flex flex-col max-w-125 w-full space-y-3 items-center">
                                <label className="font-bold" htmlFor="bio">Bio</label>
                                <input 
                                    className="border border-gray-500 max-w-125 w-full rounded-xl p-3" 
                                    name="bio"
                                    type="text" 
                                    placeholder="Bio" 
                                    defaultValue={userData.bio}
                                />
                            </div>
                            <div className="flex flex-col max-w-125 w-full space-y-3 items-center">
                                <label className="font-bold" htmlFor="profile-picture">Profile picture link</label>
                                <input 
                                    required
                                    className="border border-gray-500 max-w-125 w-full rounded-xl p-3" 
                                    name="profile-picture"
                                    type="text" 
                                    placeholder="Enter profile picture link" 
                                    defaultValue={userData.profile_picture}
                                />
                                <p className="italic text-gray-400 text-center">Please enter a valid image url or a blank pfp will be used!</p>
                            </div>
                            <div className="flex flex-col max-w-125 w-full space-y-3 items-center">
                                <label className="font-bold" htmlFor="background-image">Background image link</label>
                                <input 
                                    required
                                    className="border border-gray-500 max-w-125 w-full rounded-xl p-3" 
                                    name="background-image"
                                    type="text" 
                                    placeholder="Enter background image link" 
                                    defaultValue={userData.background_image}
                                />
                                <p className="italic text-gray-400 text-center">Please enter a valid image url or a blank image will be used!</p>
                            </div>
                            { state && <p className="text-red-500">{ state }</p>}
                            <button disabled={pending} className="bg-white text-black py-3 px-6 rounded-full font-bold">{pending ? 'Saving...' : 'Save'}</button>
                        </form>
                    </div>
                    <div onClick={() => {togglePopover()}} className="fixed w-full h-full bg-white opacity-20 top-0 z-5"></div>
                </div>
            }
        </div>
    )
}