"use server"

import { cookies } from "next/headers"
import { decrypt } from "./sessions";
import User from "@/models/UsersModel";

export const getAutenticatedhUser=async()=>{
       const cookieStore=await cookies();
       const session=cookieStore.get("session")?.value;
       if(session){
        const user=await decrypt(session);
        const result= await User.findById(user.userId);
        return {
              id: result._id.toString(),
              name: result.name,
              email: result.email,
              role: result.role,
    };
       } 
}