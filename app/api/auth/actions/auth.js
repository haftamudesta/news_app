"use server"

import bcrypt from "bcrypt"
import { getCollection } from "@/lib/mongoDB"
import { LoginFormSchema,RegisterFormSchema } from "@/lib/rules";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/sessions";
import { cookies } from "next/headers";

export async function register(state,formData){
        const validateFormFields=RegisterFormSchema.safeParse({
                email:formData.get("email"),
                password:formData.get("password"),
                confirmPassword:formData.get("confirmPassword")
        })
        if(!validateFormFields.success){
                return{
                        errors:validateFormFields.error.flatten().fieldErrors,
                        email:formData.get("email"),
                }
        }

        const {email,password}=validateFormFields.data
        const userCollection=await getCollection("users");
        if(!userCollection) return {
                errors:
                {message:"Server Error!!"}
        };

        const existingUser=await userCollection.findOne({ email })
        if(existingUser){
                return{
                        errors:
                {message:"Email already exist. Please log in with your email!!"}
                }
        }
        
        const hashedPassword=await bcrypt.hash(password,10);
        const results=await userCollection.insertOne({email,password:hashedPassword})

        await createSession(results.insertedId.toString())
        redirect("/")
        
}

export async function login(state,formData){
        console.log(formData.get("email"),formData.get("password"))
        const validateFormFields=LoginFormSchema.safeParse({
                email:formData.get("email"),
                password:formData.get("password"),
        })
        if(!validateFormFields.success){
                return{
                        errors:validateFormFields.error.flatten().fieldErrors,
                        email:formData.get("email"),
                }
        }
        const {email,password}=validateFormFields.data;
        const userCollection=await getCollection("users");
        if(!userCollection) return {
                errors:
                {message:"Server Error!!"}
        };

        const existingUser=await userCollection.findOne({ email })
        console.log(existingUser)
        if(!existingUser){
                return{
                        errors:
                {message:"Invalid Credentials!!"}
                }
        }
        const validatePassword=await bcrypt.compare(password,existingUser.password);

        if(!validatePassword){
                return{
                        errors:
                        {message:"Invalid Credentials!!"}
                }
        }
        await createSession(existingUser._id.toString())
        redirect("/")
}

export async function logout(){
        const cookieStore=await cookies();
        cookieStore.delete("session")
        redirect("/")
}