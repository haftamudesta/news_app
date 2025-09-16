"use client"

import Input from "@/app/components/Input";
import Select from "@/app/components/Select";
import { ShowMessage } from "@/app/components/ShowMessage";
import { useSession } from "next-auth/react";
import { useEffect,useState } from "react";
import {fetchAllUsers, createadminAction, deleteAdminAction, fetchAdminAction }
from "@/app/actions/adminActions";
import { useRouter } from "next/navigation";
import SubmitButton from "@/app/components/SubmitButton";
import { MdDelete } from "react-icons/md";
import {getAutenticatedhUser} from "@/lib/getAuthUser";


export default function page(){
        const {status}=useSession();
        const [adminData,setAdminData]=useState([]);
        const [user,setUser]=useState([])
        const router=useRouter();
        
        

        // useEffect(()=>{
        //         const fetchData=async ()=>{
        //                 try{
        //                         const fetchedadmindata=await fetchAdminAction();
        //                         setAdminData(fetchedadmindata)
        //                 }catch(error){
        //                         throw new Error(error)
        //                 }
        //         }
        //         fetchData();
        // },[])

        useEffect(()=>{
                const fetchUsers=async ()=>{
                        try{
                                const fetchedUser=await getAutenticatedhUser();
                                setUser(fetchedUser)
                        }catch(error){
                                throw new Error(error)
                        }
                }
                fetchUsers();
        },[])

        console.log("all users:",user);
        if(status==='loading'){
                return <p>Loading...</p>
        }
        if(!user || user.role ==='user'){
                return <ShowMessage message="you are not super admin" />
        }
        return (
                <div className="grid place-items-center min-h-screen">
                        <form action={async (formData)=>{await createadminAction(formData)
                        router.push('/admin-controls')
                        }}
                        className="shadow-xl w-[90%] sm:w-[580px] p-4 mt-4 rounded-md flex flex-col gap-4"
                        >
                                <h2 className="text-white font-bold text-2xlmb-4 self-center">Create Admin</h2>
                                <Input 
                                typeattr={"email"}
                                 nameAttr={"email"}
                                 placeholderAttr={"User Email"}
                                 requiredattr={true} 
                                />
                                <Select
                                 nameAttr={"role"}
                                  classAttr="w-full"
                                 placeholderAttr={"Select Role"}
                                 requiredattr={true}
                                 optionsAttr={['admin','superAdmin']}
                                />
                                <SubmitButton />
                        </form>
                        <div className="mt-4 w-[90%] sm:w-[580px]">
                                {adminData.length>0 &&(
                                        adminData.map((admins)=>(
                                                <div key={admins?._id}
                                                className="my-4 flex flex-col bg-base-100p-4 rounded-lg"
                                                >
                                                        <MdDelete className='self-end text-red-600' 
                                                        onClick={()=>{
                                                                deleteAdminAction(admins?.email)
                                                                router.replace('/admin-controls')
                                                        }}
                                                        />
                                                        <h2>Name:{admins?.name}</h2>
                                                        <h2>email:{admins?.email}</h2>
                                                        <h2>role:{admins?.role}</h2>
                                                </div>
                                        ))
                                        
                                )}
                        </div>
                </div>
        )
}