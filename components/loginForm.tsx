"use client"

import { LogIn } from "@/apis/auth/login"
import { Eye, EyeOff, Facebook } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

const LoginForm = () => {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState<null | string>(null)
    const [seePass, setSeePass] = useState<boolean>(false)
    const Login = async (data: any) => {
        const result = await LogIn(data)
        if (result) {
            setError(result)
        }
    }
    return (
        <form onSubmit={handleSubmit(Login)} className="w-full flex flex-col gap-[1vh]">
            <input suppressHydrationWarning={true} {...register("userName")} required className="w-full border rounded-[3px] p-[1.3vh_20px]" placeholder="User name" />
            <div className="flex gap-2 items-center border w-full rounded-[3px]">
                <input suppressHydrationWarning={true} {...register("password")} required type={seePass ? "text" : "password"} className="w-[89%] rounded-[3px] p-[1.3vh_20px]" placeholder="Password" />
                <button suppressHydrationWarning={true} type="button" className="cursor-pointer" onClick={() => setSeePass(!seePass)}>{seePass ? (<EyeOff />) : (<Eye />)}</button>
            </div>
            <button suppressHydrationWarning={true} className="bg-[#4A5DF9] w-full rounded-[3px] text-white font-semibold mt-[1vh] p-[1vh_0] cursor-pointer">Login</button>
            <div className="flex justify-between m-[2vh_0] items-center w-full">
                <p className="w-[43%] border"></p>
                <p className="text-[#E5E5E5]">Or</p>
                <p className="w-[43%] border"></p>
            </div>
            <div className="flex cursor-pointer font-medium text-[#0095F6] gap-2 m-[0_auto] items-center">
                <Facebook />
                <p>Login with Facebook</p>
            </div>
            {error && (<p className="text-[red] font-semibold text-center">{error}</p>)}
            <p className="cursor-pointer text-center font-medium m-[1vh_0]">Forgot password?</p>
            <div className="flex gap-1 m-[0_auto] mt-[4vh] items-center">
                <p>You don't have an account?</p>
                <Link href={"/register"} className="font-medium text-[#5C80F8]">Register</Link>
            </div>
        </form>
    )
}

export default LoginForm