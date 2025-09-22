const getUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

const setUser = (user) => {
    localStorage.setItem("user",JSON.stringify(user))
}

const getLocalAccessToken =  () => {
    const user = getUser();
    // ? = if(user){} ? = undefined
    return user?.accessToken;
}

const removeUser = () => {
    localStorage.removeItem("user")

}

const TokenService = {
    getLocalAccessToken,
    getUser,
    setUser,
    removeUser
}

export default TokenService