import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import ActivityService from "../services/activities.service";

const EditActivity = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activity, setActivity] = useState({
    name: "",
    description: "",
    type: "",
    level: "",
    team_size: 1,
    date: "",
    location: "",
    reg_open: "",
    reg_close: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    status: "draft",
  });

  // ดึงข้อมูล activity ตาม id
  useEffect(() => {
    const getActivity = async () => {
      try {
        const response = await ActivityService.getActivityById(id);
        if (response.status === 200) {
          setActivity(response.data);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          text: error?.response?.data?.message || error.message,
          confirmButtonText: "ตกลง",
        });
      }
    };
    getActivity();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ActivityService.updateActivity(id, activity);
      if (response.status === 200) {
        Swal.fire({
          title: "สำเร็จ",
          text: "กิจกรรมแก้ไขเรียบร้อยแล้ว",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate("/activities");
        }, 2000);
      }
    } catch (error) {
      Swal.fire({
        title: "แก้ไขล้มเหลว",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">แก้ไขกิจกรรม</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={activity.name}
          onChange={handleChange}
          placeholder="ชื่อกิจกรรม"
          className="w-full p-2 border rounded text-gray-900"
          required
        />
        <textarea
          name="description"
          value={activity.description}
          onChange={handleChange}
          placeholder="รายละเอียด"
          className="w-full p-2 border rounded text-gray-900"
          rows={3}
          required
        />
        <input
          type="text"
          name="contact_email"
          value={activity.contact_email}
          onChange={handleChange}
          placeholder="อีเมลผู้ติดต่อ"
          className="w-full p-2 border rounded text-gray-900"
        />
        {/* เพิ่ม input อื่นๆ ตามต้องการ */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          บันทึกการแก้ไข
        </button>
      </form>
    </div>
  );
};

export default EditActivity;