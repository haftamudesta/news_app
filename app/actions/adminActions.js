'use server'

import { getCollection } from "@/lib/mongoDB";
import User from "@/models/UsersModel";
import Joi from "joi";

const joiAdminSchema=Joi.object({
        email:Joi.string().min(5).required(),
        role:Joi.string().required(),
})


export const fetchAdminAction =async ()=>{
        try{
                await getCollection ("user");
                const result=await User.find({role:'admi'}).select('name,email,role');
                const dataObject=JSON.parse(JSON.stringfy(result));
                return dataObject;
        }catch(error){
                throw new Error(error);
        }
}

export async function createadminAction(formData) {
        try{
                const email=formData.get('email')?.toString();
                const role=formData.get('role')?.toString();
                const {error,value}=joiAdminSchema.validate({email,role});
                if(error){
                        throw new Error(error)
                }
                await connectToMongoDB();
                const existingUser=await User.findOne({email});
                if(!existingUser){
                        throw new Error("User does not exist!")
                }
                existingUser.role=role;
                const result=await existingUser.save();
        }catch(error){
                return{error:error.message}
        }
        
}

export const deleteAdminAction=async (email)=>{
        try{
                await connectToMongoDB();
                const existingUser=await User.findOne({email});
                if(!existingUser){
                        throw new Error("user not found!")
                }
                existingUser.role='user';
                await existingUser.save();
        }catch(error){
                throw new Error(error)
        }

}