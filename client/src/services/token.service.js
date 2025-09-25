const getUser = () => {
    const user = localStorage.getItem("user");
  if (!user) return null; // หรือ return ค่า default อื่นๆ
  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
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