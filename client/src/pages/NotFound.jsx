import React from "react";
import { useNavigate } from "react-router";


const NotAllowed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <div className="flex justify-center">
          
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mt-4">403</h1>
        <h2 className="text-xl font-semibold text-gray-700 mt-2">
          Access Denied
        </h2>
        <p className="text-gray-500 mt-2">
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาติดต่อผู้ดูแลระบบ
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary"
          >
            🔙 กลับหน้าแรก
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotAllowed;