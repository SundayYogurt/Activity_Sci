import axios from "axios"
import TokenService from "./token.service"
const baseURL = import.meta.env.VITE_BASE_URL

const instance = axios.create({
    baseURL: baseURL,
    headers:{
        "Content-Type":"application/json",
    }
})

//add interceptor to req object
instance.interceptors.request.use(
    (config)=>{
        //recieve after logged in
        const token = TokenService.getLocalAccessToken();
        if(token){
            config.headers["x-access-token"] = token;
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default instance