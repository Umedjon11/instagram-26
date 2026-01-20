import { setToken } from "@/utils/axios"
import axios from "axios"

export const LogInAxios = async (account: { userName: string, password: string }) => {
    try {
        const { data } = await axios.post("https://instagram-api.softclub.tj/Account/login", account)
        setToken(data)
    } catch (error: any) {
        console.log(error)
    }
}