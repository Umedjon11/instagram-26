"use client"

import { axiosRequest, isLogined } from "@/utils/axios"
import { usePathname } from "next/navigation"

const SideBar = () => {
  const pathname = usePathname()


  if (pathname == "/login" || pathname == "/register") {
    return null
  }

  return (
    <div className="pr-4 h-screen w-[18%] max-h-screen fixed bg-white dark:bg-black border-r-2">
    </div>
  )
}

export default SideBar