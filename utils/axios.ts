import axios from "axios"


export const setToken = (token: string) => {
    localStorage.setItem("access_token", token)
}

export const getToken = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token")
        return token
    }
    return null
}

export const clearStorage = () => {
    localStorage.clear()
}

export const isLogined = (error: any) => {
    if (error.response.status == 401 && window.location.pathname != "/register" && window.location.pathname != "/login") {
        localStorage.clear()
        window.location.pathname = "/login"
    }
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