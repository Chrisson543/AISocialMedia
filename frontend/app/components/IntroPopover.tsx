"use client";

import { useState } from "react";
import linkedinIcon from "@/app/assets/icons/linkedin.png"
import githubIcon from "@/app/assets/icons/github.png"
import emailIcon from "@/app/assets/icons/email.png"
import portfolioIcon from "@/app/assets/icons/pepe.png"
import Icon from "./Icon";
import Link from "next/link";
import infoIcon from "@/app/assets/icons/info.png";

export default function IntroPopover(){

    const [showPopover, setShowPopover] = useState(true)

    function togglePopover(){
        setShowPopover(prevState => !prevState)
    }

    const contactItems = [
        {
            name: 'linkedin',
            icon: linkedinIcon,
            link: 'https://www.linkedin.com/in/chrisson-enwerem/'
        },
        {
            name: 'github',
            icon: githubIcon,
            link: 'https://github.com/Chrisson543'
        },
        {
            name: 'email',
            icon: emailIcon,
            link: 'mailto:chrisson543@gmail.com'
        },
        {
            name: 'portfolio',
            icon: portfolioIcon,
            link: 'https://chrisson.netlify.app/'
        },

    ]

    return (
        <div>
              <button onClick={() => {togglePopover()}} className="absolute top-5 right-5 ">
                <Icon path={infoIcon} size={{width: 'auto', height: 30}} />
              </button>
            {
                showPopover &&
                <div className="fixed w-full h-full flex items-center justify-center left-0 z-20">
                    <div className="relative flex w-[90%] lg:w-[40%] pb-15 z-30 bg-black rounded-4xl px-12 py-8 flex-col items-center">
                        <div className="flex flex-col space-y-6 pb-0 h-full">
                            <h1 className="text-2xl font-bold">X Clone by Chrisson</h1>
                            <div className="overflow-y-scroll h-full flex pb-3">
                                <p className="font-semibold">This is a full-stack project inspired by the X app. <br /> There is a mix of real and  AI-generated users that have AI-generated personalities and posts to match. <br />You can create and edit profiles, create, delete and like posts, search for other users and more. <br /><br /> Enjoy!</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-end w-full absolute bottom-0 p-3 lg:px-12 px-6 pb-4">
                            <div className="flex space-x-3 self-center h-full">
                                {
                                    contactItems.map(item => {
                                        return (
                                            <Link href={item.link} target="_blank" rel="noopener noreferrer" key={item.name} className="hover:opacity-80">
                                                <Icon path={item.icon} size={{width: 'auto', height: 30}} />
                                            </Link>
                                        )
                                    })
                                }
                                
                            </div>
                            <button onClick={() => {togglePopover()}} className="font-bold text-black bg-white px-6 py-3 rounded-full">Close</button>
                        </div>
                    </div>
                    <div onClick={() => {togglePopover()}} className="fixed w-full h-full bg-white opacity-20 top-0 z-20"></div>
                </div>
            }
        </div>
        
    )
}
