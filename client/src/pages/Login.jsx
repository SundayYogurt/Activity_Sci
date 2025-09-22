import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/auth.service";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function LoginForm() {
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const {login, user} =  useAuthContext();
  useEffect(()=>{
    if(user){
       navigate("/")
    } 
  },[user])

  const handleChange = (e) => {
    // {} this is restructuring
    const { name, value } = e.target;
    // ... copy old LoginData && name: value = new value
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault(); // กัน browser ส่ง GET แล้วเปลี่ยน URL
  console.log("Login data:", loginData);


  try {
    const currentUser = await AuthService.login(loginData.email, loginData.password)
    if(currentUser.status === 200){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "login สำเร็จ!",
        text: "Login successfully",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        login(currentUser.data)
        navigate("/")
      })
    }
  } catch (error) {
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: "User login",
        text: error?.response?.data?.message || error.message ,
        showConfirmButton: false,
        timer: 1500
    })
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <img
            alt="grab restaurant"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS40T_zWGmKbsnTCWBoCVnVgEiKQ8LgHTQ0zA&s"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Sign in to your account
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              required
              value={loginData.email}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={loginData.password}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-soft btn-primary bg-white text-gray-800 hover:bg-gray-100 w-full"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}