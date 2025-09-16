"use server"

import bcrypt from "bcrypt"
import { connectToDB } from "@/lib/mongoDB"
import { LoginFormSchema,RegisterFormSchema } from "@/lib/rules";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/sessions";
import { cookies } from "next/headers";
import User from "@/models/UsersModel"

export async function register(state,formData){
        const validateFormFields=RegisterFormSchema.safeParse({
                name:formData.get("name"),
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

        const {name,email,password}=validateFormFields.data;
        await connectToDB();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
                return {
                        errors: {
                                email: ["Email already exists. Please log in instead."],
                        },
                };
        }
        
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser = new User({
                name,
                email,
                password: hashedPassword,
                role: "user",
        });
        console.log(newUser)

        try {
                await newUser.save();
        } catch (error) {
                console.error("User creation failed:", error);
                return {
                        errors: {
                                message: ["Failed to create account. Please try again."],
                        },
                };
        }

        try {
                await createSession(newUser._id.toString());
          
        } catch (error) {
                console.error("Session creation failed:", error);
                return {
                        errors: {
                                message: ["Could not start session. Please log in manually."],
                        },
                };
        }
        redirect("/");
                 
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