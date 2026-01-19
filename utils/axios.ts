import axios from "axios"


export const setToken = (token: string) => {
    localStorage.setItem("access_token", token)
}

export const getToken = () => {
    const token = localStorage.getItem("access_token")
    return token
}

export const clearStorage = () => {
    localStorage.clear()
}

export const axiosRequest = axios.create({
    baseURL: "https://instagram-api.softclub.tj"
})

axiosRequest.interceptors.request.use(
    (config) => {
        const token = getToken()

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        console.log(2)
    }
)