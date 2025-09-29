// ActivityDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import ActivityService from "../services/activities.service";
import { useAuthContext } from "../context/AuthContext";

const ActivityDetail = () => {
  const { id } = useParams(); // ดึง id จาก URL
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ActivityService.getActivityById(id);
        if (response.status === 200) {
          setActivity(response.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "ไม่พบกิจกรรม",
            confirmButtonText: "ตกลง",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการเชื่อมต่อ",
          text:
            error.response?.data?.message ||
            error.message ||
            "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
          confirmButtonText: "ตกลง",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await ActivityService.deleteActivities(activity.id);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: `Deleted ${activity.name}`,
          text: "This activity has been deleted",
          confirmButtonText: "OK",
        }).then(() => navigate("/activities")); // กลับไปหน้า list
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการลบกิจกรรม",
        text:
          error.response?.data?.message ||
          error.message ||
          "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        confirmButtonText: "ตกลง",
      });
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!activity) return <p className="text-center mt-6">ไม่พบกิจกรรม</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Activity Detail</h2>

      <div className="text-gray-800 p-4 bg-gray-100 rounded-lg shadow-md space-y-2" >
        <h3 className="text-xl font-semibold">{activity.name}</h3>
        <p>{activity.description}</p>
        <p>ประเภท: {activity.type}</p>
        <p>ระดับ: {activity.level}</p>
        <p>จำนวนสมาชิกทีม: {activity.team_size}</p>
        <p>วันที่จัด: {new Date(activity.date).toLocaleDateString()}</p>
        <p>สถานที่: {activity.location}</p>
        <p>เปิดรับสมัคร: {new Date(activity.reg_open).toLocaleDateString()}</p>
        <p>ปิดรับสมัคร: {new Date(activity.reg_close).toLocaleDateString()}</p>
        <p>ผู้ติดต่อ: {activity.contact_name}</p>
        <p>โทร: {activity.contact_phone}</p>
        <p>อีเมล: {activity.contact_email}</p>
        <p>สถานะ: {activity.status}</p>

        {user?.type === "admin" && (
          <div className="card-actions justify-end mt-4 space-x-2">
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/edit-activity/${activity.id}`)}
            >
              Edit
            </button>
            <button className="btn btn-error" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityDetail;