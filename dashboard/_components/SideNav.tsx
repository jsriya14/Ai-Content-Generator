"use client"
//------------------------
import React, { useEffect } from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation';

function SideNav() {

    const MenuList = [
        {
            id:1,
            name: 'Home',
            icon: Home,
            path: '/dashboard'
        },
        {
            id:2,
            name: 'History',
            icon: FileClock,
            path: '/dashboard/history'
        },
        // {
        //     id:3,
        //     name: 'Billing',
        //     icon: WalletCards,
        //     path: '/dashboard/billing'
        // },
        {
            id:4,
            name: 'Settings',
            icon: Settings,
            path: '/dashboard/settings'
        }
    ]


    const path = usePathname();

    const router = useRouter();
    useEffect(() => {
        console.log(path)
    }, [path])

    const handleClick = (path: string) => {
        router.push(path);  // Use router.push to navigate
    };
    return (
        <div className='h-screen p-5 shadow-sm border bg-white'>
            <div className='flex justify-center'>
                <Image src='https://cdn-icons-png.flaticon.com/128/18525/18525350.png' alt='logo' width={120} height={100} />
            </div>
            <hr className='my-6 border' />

            <div className='mt-3'>
                {/* {MenuList.map((menu) =>
                (
                    <div key={menu.id} className={`flex gap-2 mb-2 p-3
                hover:bg-primary hover:text-white rounded-lg
                cursor-pointer items-center
                ${path == menu.path && 'bg-primary text-white'}`}>
                {/* key={index} */}

                        {/* <menu.icon className='h-6 w-6' />
                        <h2 className='text-lg'>{menu.name}</h2>
                    </div>
                ))} */}
                {MenuList.map((menu) => (
                    <div
                        key={menu.id}
                        className={`flex gap-2 mb-2 p-3
                        hover:bg-primary hover:text-white rounded-lg
                        cursor-pointer items-center
                        ${path === menu.path ? 'bg-primary text-white' : ''}`} // Use === for strict comparison
                        onClick={() => handleClick(menu.path)} // Call handleClick on click
                    >
                        <menu.icon className='h-6 w-6' />
                        <h2 className='text-lg'>{menu.name}</h2>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default SideNav

