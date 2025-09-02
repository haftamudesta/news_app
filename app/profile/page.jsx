"use client"

 import { Bookmark } from "../components/Bookmark";
 import { History } from "../components/History";
import SignInPage from "../components/SignIn";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

const ProfilePage = () => {
  const {status,data:session}=useSession();
  const [activeTap,setActiveTap]=useState(0);
  const tabs=[
    {title:"History",component:<History />},
    {title:"Bookmark",component:<Bookmark />},
  ]
  const handleTabClick=(index)=>{
    setActiveTap(index)
  }
  console.log("fetched data",session);
  if(status==="loading"){
    return <h1>Loading...</h1>
  }else if(status==="authenticated"){
    return (
      <div className="mx-auto px-8">
        <div>
          <button onClick={()=>signOut()} className="cursor-pointer">Sign Out</button>
        </div>
        <div>
          <Image src={session?.user?.image} alt='image'
          width={160}
          height={160}
          priority
          />
          <div>
            Name: <span>{session?.user?.name}</span>
          </div>
          <div>
            Email: <span>{session?.user?.email}</span>
          </div>
          <hr className="w-full border-slate-700"/>
        </div>
        <div>
          <div className="flex flex-col">
            <div className="flex mt-2 justify-center">
              <div className="bg-base-200 shadow-md rounded-3xl text-center flex justify-center">
                {tabs.map((tab,index)=>(
                  <button key={index} className={`rounded-3xl w-32 py-2 ${activeTap===index&&'bg-primmary text-white'}`}
                  onClick={()=>handleTabClick(index)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            {tabs[activeTap].component}
          </div>
        </div>
      </div>
      
    );
  }
  return (
    <div className="flex justify-center items-center">
      <SignInPage />
    </div>
    
  )
}

export default ProfilePage