import axios from "axios"


export const Register = async (account: { userName: string, fullName: string, email: string, password: string, confirmPassword: string}) => {
    try {
        await axios.post("https://instagram-api.softclub.tj/Account/register", account)
        window.location.pathname = "/login"
    } catch (error: any) {
        return error.response.data.errors[0]
    }
}