// ActivityCard.jsx
import React from "react";
import ActivityService from "../services/activities.service";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router"

const ActivityCard = ({ activities, onDelete }) => {
  const { user } = useAuthContext();

  console.log(typeof user.type, user.type === "admin");

  const handleDelete = async () => {
    try {
      const response = await ActivityService.deleteActivities(activities.id);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: `Deleted ${activities.name}`,
          text: "This activity has been deleted",
          confirmButtonText: "OK",
        }).then(() => {
          if (onDelete) onDelete(activities.id);
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
    }
  };

  return (
    <div className="card w-96 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h2 className="card-title text-lg font-bold">{activities.name}</h2>
      </div>
      <div className="p-5 space-y-2">
        <p className="text-gray-700">{activities.description}</p>
        <p className="text-gray-500 text-sm">📍 {activities.location}</p>
        <p className="text-gray-500 text-sm">
          📅 {new Date(activities.date).toLocaleDateString()}
        </p>

        {/* Admin / Teacher Buttons */}
        {(user?.user?.type === "admin" ||user?.user?.type === "teacher") && (
          <div className="flex flex-wrap gap-2 mt-3">
            {user?.user?.type === "admin" && (
              <>
                <Link
                  to={`/edit-activity/${activities.id}`}
                  className="btn btn-warning flex-1 text-white"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn btn-error flex-1 text-white"
                >
                  Delete
                </button>
              </>
            )}
            <Link
              to={`/activityDetail/${activities.id}`}
              className="btn btn-primary flex-1 text-white"
            >
              Detail
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;