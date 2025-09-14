

import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { MenuItem } from '../components/MenuItem';
import { ShowMessage } from '../components/ShowMessage';
import { MdCategory, MdNewspaper } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {getAutenticatedhUser} from "@/lib/getAuthUser";

export default async function AdminControls() {
    const user = await getAutenticatedhUser();
    const userId=user?.userId
    console.log("user id:",userId)
    if (!userId) {
        return <ShowMessage message="Please sign in to access admin controls" />
    }
//     if (session.user?.role === 'user' || session.user?.role === 'superAdmin') {
        return (
            <div className='mx-auto ml-8'>
                <h2 className='py-4 font-bold text-2xl text-white'>Controls</h2>
                <div className='py-4 flex flex-wrap justify-evenly last:justify-stretch'>
                    {/* {session.user?.role === 'user' && ( */}
                        <Link href={'/admin_controls/admin-create-delete'}>
                            <MenuItem Icon={RiAdminFill} Title='Manage Admin' />
                        </Link>
                    {/* )} */}
                    <Link href={'/admin_controls/categories'}>
                        <MenuItem Icon={MdCategory} Title='Categories' />
                    </Link>
                    <Link href={'/admin_controls/news'}>
                        <MenuItem Icon={MdNewspaper} Title='News' />
                    </Link>
                    <Link href={'/admin_controls/url-shortner'}>
                        <MenuItem Icon={FaLink} Title='URL Shortner' />
                    </Link>
                </div>
                 </div>
        )
    //}
    
    //return <ShowMessage message="You are not authorized to view this page" />
}