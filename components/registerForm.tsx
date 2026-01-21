"use client"

import { LogIn } from "@/apis/auth/login"
import { Register } from "@/apis/auth/register"
import { Eye, EyeOff, Facebook } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

const RegisterForm = () => {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState<null | string>(null)
    const [seePass, setSeePass] = useState<boolean>(false)
    const [seeConfPass, setSeeConfPass] = useState<boolean>(false)
    const Reg = async (data: any) => {
        const result = await Register(data)
        if (result) {
            setError(result)
        }
    }
    return (
        <form onSubmit={handleSubmit(Reg)} className="w-full flex flex-col gap-[1vh]">
            <div className="flex cursor-pointer font-medium text-[#0095F6] gap-2 m-[0_auto] items-center">
                <Facebook />
                <p>Login with Facebook</p>
            </div>
            <div className="flex justify-between m-[2vh_0] items-center w-full">
                <p className="w-[43%] border"></p>
                <p className="text-[#E5E5E5]">Or</p>
                <p className="w-[43%] border"></p>
            </div>
            <input suppressHydrationWarning={true} {...register("userName")} required className="w-full border rounded-[3px] p-[1.3vh_20px]" placeholder="User name" />
            <input suppressHydrationWarning={true} {...register("fullName")} required className="w-full border rounded-[3px] p-[1.3vh_20px]" placeholder="Full name" />
            <input suppressHydrationWarning={true} {...register("email")} type="email" required className="w-full border rounded-[3px] p-[1.3vh_20px]" placeholder="Email" />
            <div className="flex gap-2 items-center border w-full rounded-[3px]">
                <input suppressHydrationWarning={true} {...register("password")} required type={seePass ? "text" : "password"} className="w-[89%] rounded-[3px] p-[1.3vh_20px]" placeholder="Password" />
                <button suppressHydrationWarning={true} type="button" className="cursor-pointer" onClick={() => setSeePass(!seePass)}>{seePass ? (<EyeOff />) : (<Eye />)}</button>
            </div>
            <div className="flex gap-2 items-center border w-full rounded-[3px]">
                <input suppressHydrationWarning={true} {...register("confirmPassword")} required type={seeConfPass ? "text" : "password"} className="w-[89%] rounded-[3px] p-[1.3vh_20px]" placeholder="Confirm Password" />
                <button suppressHydrationWarning={true} type="button" className="cursor-pointer" onClick={() => setSeeConfPass(!seeConfPass)}>{seeConfPass ? (<EyeOff />) : (<Eye />)}</button>
            </div>
            <p className="text-center">People who use our service may have uploaded your contact information to Instagram. <span className="cursor-pointer text-[#1C5AF0]">Learn more</span></p>
            <p className="text-center">By registering, you agree to our <span className="cursor-pointer text-[#1C5AF0]">Terms</span>, <span className="cursor-pointer text-[#1C5AF0]">Privacy Policy</span> and <span className="cursor-pointer text-[#1C5AF0]">Cookie Policy</span>.</p>
            {error && (<p className="text-[red] font-semibold text-center">{error}</p>)}
            <button suppressHydrationWarning={true} className="bg-[#4A5DF9] w-full rounded-[3px] text-white font-semibold mt-[1vh] p-[1vh_0] cursor-pointer">Register</button>
            <div className="flex gap-1 m-[0_auto] mt-[4vh] items-center">
                <p>Already have an account?</p>
                <Link href={"/login"} className="font-medium text-[#5C80F8]">LogIn</Link>
            </div>
        </form>
    )
}

export default RegisterForm