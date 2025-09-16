"use client"

import Link from "next/link";
import { useActionState } from "react";
import { register } from "@/app/api/auth/actions/auth";

export default function Register(){
        const [state,action,isPending]=useActionState(register,undefined);
        return(
                <div className="flex justify-center items-center">
                        <div className="flex flex-col bg-sky-600 mt-2 px-4 pb-2">
                                <h1 className="text-center font-bold">Register</h1>
                        <form action={action} className="flex flex-col gap-4" >
                                <div className="flex flex-col">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" name="name"
                                        className="border-2 border-gray-400"
                                        defaultValue={state?.name}
                                         />
                                         {state?.errors?.name&&
                                         <p className="text-red-600 font-bold">      {state.errors.name}
                                         </p>}
                                </div>
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
                                         {state?.errors?.password&&
                                         <div>
                                                <p>Password must:</p>
                                                <ul>{state.errors.password.map(err=>(
                                                        <li key={err} className="text-red-600">
                                                                {err}
                                                        </li>
                                                ))}</ul>
                                         </div>
                                         }
                                </div>
                                <div className="flex flex-col">
                                        <label htmlFor="confirmPassword">Confirm Password:</label>
                                        <input type="password" name="confirmPassword"
                                        className="border-2 border-gray-400" 
                                        />
                                        {state?.errors?.confirmPassword&&
                                         <p className="text-red-600 font-bold">      {state.errors.confirmPassword}
                                         </p>}
                                </div>
                                <div className="flex gap-2">
                                        <button disabled={isPending}
                                        className="bg-purple-800 text-white px-4 py-1 rounded-xl cursor-pointer"
                                        >{isPending?"Loading":"Register"}</button>
                                        <Link href={"/login"} className="text-teal-400 font-bold">Have an account? login Here</Link>
                                </div>
                        </form>
                        </div>
                </div>
        )
}