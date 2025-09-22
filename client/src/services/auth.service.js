import api from "./api"
import TokenService from "./token.service.js";
const API_URL = import.meta.env.VITE_AUTH_API;


const register = async (formData) => {
    return await api.post(API_URL+"/signup",formData)
}

const login = async (email, password) => {
    const response = await api.post(API_URL+"/signin",{email, password})
    //saving user data to local storage
    if(!response.data.token){
        return response
    }else{
        TokenService.setUser(response.data)
        return response;
    }
}

const logout = () => {
    TokenService.removeUser();
}

const AuthService = {
    register,
    login,
    logout
}
export default AuthService