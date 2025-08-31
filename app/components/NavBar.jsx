"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useState } from 'react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/16/solid';
import { FaHome,FaBookOpen,FaEye,FaChartLine  } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const navLinks = [
        { href: "/", label: "Home", icon: <FaHome className="w-5 h-5" /> },
        { href: "/news/recent_news", label: "Recent News", icon: <FaBookOpen className="w-5 h-5" /> },
        { href: "/news/most_viewed", label: "Most Viewed", icon: <FaEye className="w-5 h-5" /> },
        { href: "/news/trending", label: "Trending", icon: <FaChartLine className="w-5 h-5" /> },
        { href: "/admin-controls/categories", label: "Categories", icon: <BiSolidCategory className="w-5 h-5" /> },
        { href: "/profile", label: "Profile", icon: <CgProfile className="w-5 h-5" /> }
    ];

const NavBar = () => {
        const router=useRouter();
        const pathname=usePathname();
        const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-[#12243c] to-[#0f222a]">
            <div className="container mx-auto flex justify-between items-center py-4 px-4">
                <div className="flex items-center gap-2">
                    <Image 
                        src={'https://res.cloudinary.com/demf8vxpk/image/upload/v1744657916/static_images/z6cg49tnn7utgzd4yrwj.png'}
                        width={40}  
                        height={40}
                        priority
                        alt="News Logo"
                        className="rounded-full"
                    />
                    <p className="text-white hidden sm:block">News App</p>
                </div>

                <nav className="hidden md:block">
                    <ul className="flex gap-2">
                     {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link 
                                    href={link.href} 
                                    className={`${pathname === link.href ? 'bg-purple-500 text-emerald-500' : ''} px-4 py-1 rounded-lg font-bold hover:bg-primary/80 transition-colors`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <button 
                    className="md:hidden z-50 p-2 rounded-lg bg-white/10 hover:bg-blue-400 transition-colors"
                    onClick={() => setIsOpenMenu(!isOpenMenu)}
                    aria-label="Toggle menu"
                >
                    {isOpenMenu ? (
                        <XMarkIcon className="h-6 w-6 text-white" />
                    ) : (
                        <Bars3Icon className="h-6 w-6 text-white" />
                    )}
                </button>
            </div>
             <div className={`md:hidden fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ${isOpenMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpenMenu(false)}>
            </div>
                <div className={`md:hidden fixed top-18 right-0 h-full w-[250px] bg-[#0f222a] z-40 shadow-xl transition-all duration-300 ease-in-out transform ${isOpenMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="container mx-auto px-4 py-4">
                        <ul className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <button
                                        onClick={() => {
                                            router.push(link.href);
                                            setIsOpenMenu(false);
                                        }}
                                        className={`w-full flex items-center gap-4 p-3 rounded-lg text-lg 
                                            ${pathname === link.href ? 'bg-primary' : 'hover:bg-primary/50'} 
                                            transition-colors`}
                                    >
                                        {link.icon}
                                        {link.label}
         </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            
        </header>
  )
}

export default NavBar