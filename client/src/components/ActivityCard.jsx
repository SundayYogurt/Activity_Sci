// ActivityCard.jsx
import React from "react";
import ActivityService from "../services/activities.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ActivityCard = ({ activities }) => {

  const handleDelete = async (id) => {

    try {
      const response = await ActivityService.deleteActivities(id)

      if(response.status === 200) {
        Swal.fire({
          icon: "success",
          title: `deleted ${activities.name}`,
          text: "this Activity have been deleted",
          confirmButtonText:"ok",
        }).then(() => {
          window.location.reload();
        })
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
  }
  return (
    <div className="card w-96 bg-base-100 shadow-sm relative">
      <div className="card-body">
        <h2 className="card-title">{activities.name}</h2>
        <p>{activities.description}</p>
        <p>📍 {activities.location}</p>
        <p>📅 {new Date(activities.date).toLocaleDateString()}</p>
        <div className="card-actions justify-end">
           <a href={`/edit-activity/${activities.id}`}>
              <button className="btn btn-warning">Edit</button>
            </a>
          <button className="btn btn-error" onClick={() => handleDelete(activities.id)}>delete</button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
