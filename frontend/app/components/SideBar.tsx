import Icon from "@/app/components/Icon";
import HomeIcon from '@/app/assets/icons/home.png';
import SearchIcon from '@/app/assets/icons/search.png';
import Usercon from '@/app/assets/icons/user.png';
import Link from "next/link";
import Image from "next/image";
import BlankPfp from '@/app/assets/blank_pfp.png';
import optionIcon from '@/app/assets/icons/option-white.png';

export default function SideBar(){
    const iconSize = 23;

    const navbarItems = [
        {
            name: 'Home',
            path: '/',
            icon: HomeIcon,
            size: {
                width: iconSize,
                height: iconSize
            }
        },
        {
            name: 'Search',
            path: '/search',
            icon: SearchIcon,
            size: {
                width: 20,
                height: 20
            }
        },
        {
            name: 'Profile',
            path: '/',
            icon: Usercon,
            size: {
                width: iconSize,
                height: iconSize
            }
        }
    ]

    return (
        <nav className="flex border-t lg:border-t-0 flex-row lg:flex-col h-20 lg:h-screen p-3 justify-between border-r border-gray-500 w-full lg:w-[20%] fixed lg:sticky bottom-0 lg:top-0 z-10 bg-black">
            <div className="lg:space-y-3 flex flex-row lg:flex-col justify-around items-center lg:items-start w-[85%] lg:w-full lg:mx-5">
                {
                    navbarItems.map(item => {
                        return (
                            <Link href={item.path} key={item.name} className="flex space-x-4 items-center">
                                <Icon path={item.icon} size={item.size}/>
                                <p className="text-2xl hidden lg:block">{item.name}</p>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="bg-black flex flex-row w-[15%] lg:w-full lg:p-3 justify-end items-center">
                <div className="flex lg:w-[20%] h-full justify-center mr-3">
                    <Image
                        src={BlankPfp}
                        alt="pfp"
                        width={618}
                        height={618}
                        className="object-cover max-w-12.5 max-h-12.5 rounded-4xl"
                        style={{objectFit: 'cover'}}
                    />
                    {/* {
                        props.profile_picture ? 
                        <Image
                            src={props.profile_picture}
                            alt="pfp"
                            width={618}
                            height={618}
                            className="object-cover max-w-12.5 max-h-12.5 rounded-4xl"
                            style={{objectFit: 'cover'}}
                        /> :
                        <Image
                            src={BlankPfp}
                            alt="pfp"
                            width={618}
                            height={618}
                            className="object-cover max-w-12.5 max-h-12.5 rounded-4xl"
                            style={{objectFit: 'cover'}}
                        />
                    } */}
                </div>
                <div className="hidden lg:flex flex-col w-[80%]">
                    <div className="flex justify-between w-full">
                        <div className="flex space-x-1 w-[85%]">
                            <div className="block space-x-1.5">
                                <p className="space-x-1 font-bold">display name</p>
                                <p className="space-x-1 text-gray-500">
                                    @{'username'.replace(/^@/, "")}
                                </p>
                            </div>
                        </div>
                        <div className="flex w-[15%] justify-end">
                            <Icon path={optionIcon} size={{width: 25, height: 'auto'}} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}