import React, { useEffect, useState } from 'react';
import ActivityService from '../services/activities.service';
import Swal from 'sweetalert2';
import ActivityCard from '../components/ActivityCard'; // อย่าลืม import ถ้ายังไม่ได้

const Activities = () => {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ActivityService.getAllActivities();

        if (response.status === 200) {
          setActivities(response.data);
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

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
      {activities.length > 0 ? (
        activities.map((activity) => (
          <ActivityCard key={activity.id} activities={activity} />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">ไม่มีกิจกรรมในขณะนี้</p>
      )}
    </div>
  );
};

export default Activities;
