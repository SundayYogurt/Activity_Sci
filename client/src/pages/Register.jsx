// src/pages/RegisterForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import AuthService from "../services/auth.service";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "teacher",
    name: "",
    email: "",
    password: "",
    phone:"",
    school:""
  });

  const handleChange = (e) => {
    // {} this is restructuring
    const { name, value } = e.target;
    // ... copy old LoginData && name: value = new value
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const newUser = await AuthService.register(formData);

    if (newUser.status >= 200 && newUser.status < 300) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: newUser.data.message || "สมัครสมาชิกสำเร็จ",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        setFormData({
        type: "teacher",
        name: "",
        email: "",
        password: "",
        phone:"",
        school:""
        })
        navigate("/login");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "สมัครไม่สำเร็จ",
        text: newUser.data.message || "เกิดข้อผิดพลาด",
        confirmButtonText: "ตกลง"
      });
    }

  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาดในการเชื่อมต่อ",
      text: err.response?.data?.message || err.message || "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
      confirmButtonText: "ตกลง"
    });
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
        <h2 className="mt-6 text-2xl font-bold text-gray-800">Sign up</h2>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>

    <input
  type="hidden"
  name="type"
  value={formData.type}
/>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            phone
          </label>
          <input
            id="phone"
            name="phone"
            type="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm"
          />
        </div>

                <div>
          <label htmlFor="school" className="block text-sm font-medium text-gray-700">
            school
          </label>
          <input
            id="school"
            name="school"
            type="school"
            required
            value={formData.school}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Sign up
          </button>
        </div>
      </form>
      
    </div>
  </div>
);
}