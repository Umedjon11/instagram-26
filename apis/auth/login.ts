import { setToken } from "@/utils/axios"
import axios from "axios"

export const LogIn = async (account: { userName: string, password: string }) => {
    try {
        const { data } = await axios.post("https://instagram-api.softclub.tj/Account/login", account)
        setToken(data.data)
        window.location.pathname = "/"
    } catch (error: any) {
        return error.response.data.errors[0]
    }
}