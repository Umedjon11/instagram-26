import { axiosRequest, isLogined } from "@/utils/axios"


export const getUserProfileInfo = async () => {
    try {
        const { data } = await axiosRequest.get("/UserProfile/get-my-profile")
        return data.data
    } catch (error) {
        isLogined(error)
    }
}