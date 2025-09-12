"use client"

import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/api/auth/actions/auth";

export default function Login(){
        const [state,action,isPending]=useActionState(login,undefined);
        console.log(state)
        return(
                <div className="flex justify-center items-center">
                        <div className="flex flex-col bg-sky-600 mt-2 px-4 pb-2">
                                <h1 className="text-center font-bold">Login</h1>
                        <form action={action} className="flex flex-col gap-4" >
                                <div className="flex flex-col">
                                        <label htmlFor="email">Email:</label>
                                        <input type="text" name="email"
                                        className="border-2 border-gray-400"
                                        defaultValue={state?.email}
                                         />
                                         {state?.errors?.email&&
                                         <p className="text-red-600 font-bold">      {state.errors.email}
                                         </p>}
                                </div>
                                <div className="flex flex-col">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" name="password"
                                        className="border-2 border-gray-400"
                                         />
                                </div>
                                {state?.errors?.password&&
                                         <p className="text-red-600 font-bold">      {state.errors.password}
                                         </p>}
                                
                                <div className="flex gap-2">
                                        <button disabled={isPending}
                                        className="bg-purple-800 text-white px-4 py-1 rounded-xl cursor-pointer"
                                        >{isPending?"Loading":"Login"}</button>
                                        <Link href={"/register"} className="text-teal-400 font-bold cursor-pointer">Have not an account? sign up Here</Link>
                                </div>
                        </form>
                        </div>
                </div>
        )
}