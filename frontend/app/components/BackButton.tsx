"use client"

import Icon from "./Icon";
import BackArrowIcon from '../assets/icons/back-white.png'
import { useRouter } from "next/navigation";

export default function BackButton(){

    const router = useRouter()
    
    return (
        <button onClick={() => router.back()}>
            <Icon path={BackArrowIcon} size={{width: 20, height: 20}} />
        </button>
    )
}