// EditActivity.jsx
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

  // ✅ ประกาศ today ภายใน component
  const today = new Date().toISOString().split("T")[0];

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
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-screen max-w-lg space-y-8 rounded-2xl bg-gray-200 p-8 shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          แก้ไขกิจกรรม
        </h2>

        <form className="space-y-4 text-gray-900 rounded-2xl" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium text-gray-700">ชื่อกิจกรรม</label>
            <input
              type="text"
              id="name"
              name="name"
              value={activity.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="ชื่อกิจกรรม"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium text-gray-700">รายละเอียดกิจกรรม</label>
            <textarea
              id="description"
              name="description"
              value={activity.description}
              onChange={handleChange}
              required
              rows={3}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="รายละเอียดกิจกรรม"
            />
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block font-medium text-gray-700">ประเภทกิจกรรม</label>
            <select
              id="type"
              name="type"
              value={activity.type}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="">-- เลือกประเภทกิจกรรม --</option>
              <option value="competition">การแข่งขัน</option>
              <option value="workshop">เวิร์กช็อป</option>
              <option value="seminar">สัมมนา</option>
              <option value="exhibition">นิทรรศการ</option>
              <option value="training">ฝึกอบรม</option>
            </select>
          </div>

          {/* Level */}
          <div>
            <label htmlFor="level" className="block font-medium text-gray-700">ระดับ</label>
            <select
              id="level"
              name="level"
              value={activity.level}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="">-- เลือกระดับ --</option>
              <option value="general">ทั่วไป</option>
              <option value="highschool">มัธยม</option>
              <option value="university">มหาวิทยาลัย</option>
            </select>
          </div>

          {/* Team Size */}
          <div>
            <label htmlFor="team_size" className="block font-medium text-gray-700">จำนวนสมาชิกทีม</label>
            <input
              type="number"
              id="team_size"
              name="team_size"
              value={activity.team_size}
              min={1}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block font-medium text-gray-700">วันที่จัดกิจกรรม</label>
            <input
              type="date"
              id="date"
              name="date"
              value={activity.date}
              onChange={handleChange}
              min={today}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block font-medium text-gray-700">สถานที่จัดกิจกรรม</label>
            <input
              type="text"
              id="location"
              name="location"
              value={activity.location}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="สถานที่จัดกิจกรรม"
            />
          </div>

          {/* Registration Open */}
          <div>
            <label htmlFor="reg_open" className="block font-medium text-gray-700">วันที่เปิดรับสมัคร</label>
            <input
              type="date"
              id="reg_open"
              name="reg_open"
              value={activity.reg_open}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          {/* Registration Close */}
          <div>
            <label htmlFor="reg_close" className="block font-medium text-gray-700">วันที่ปิดรับสมัคร</label>
            <input
              type="date"
              id="reg_close"
              name="reg_close"
              value={activity.reg_close}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          {/* Contact Name */}
          <div>
            <label htmlFor="contact_name" className="block font-medium text-gray-700">ชื่อผู้ติดต่อ</label>
            <input
              type="text"
              id="contact_name"
              name="contact_name"
              value={activity.contact_name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="ชื่อผู้ติดต่อ"
            />
          </div>

          {/* Contact Phone */}
          <div>
            <label htmlFor="contact_phone" className="block font-medium text-gray-700">เบอร์โทรผู้ติดต่อ</label>
            <input
              type="tel"
              id="contact_phone"
              name="contact_phone"
              value={activity.contact_phone}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="เบอร์โทรผู้ติดต่อ"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label htmlFor="contact_email" className="block font-medium text-gray-700">อีเมลผู้ติดต่อ</label>
            <input
              type="email"
              id="contact_email"
              name="contact_email"
              value={activity.contact_email}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="อีเมลผู้ติดต่อ"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block font-medium text-gray-700">สถานะ</label>
            <select
              id="status"
              name="status"
              value={activity.status}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="draft">ร่าง</option>
              <option value="open">เปิดรับสมัคร</option>
              <option value="closed">ปิดรับสมัคร</option>
              <option value="in_progress">กำลังดำเนินการ</option>
              <option value="completed">เสร็จสิ้น</option>
            </select>
          </div>

          <button
            type="submit"
            className=" btn btn-primary w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            บันทึกการแก้ไข
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditActivity;
