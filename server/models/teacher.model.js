import { DataTypes } from "sequelize"; // import DataTypes สำหรับกำหนดชนิดข้อมูล
import User from "./user.model.js";
import sequelize from "./db.js";
const Teacher = User.init(
  {
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // กำหนด ขอบเขต scope ของ teacher ให้ ขึ้นเป็น teacher เท่านั้น ไม่รวม user type อื่น ตอนที่ query ข้อมูล เช่น findAll, findOne {(where: {...})}
    sequelize,
    scopes: {
      defaultScope: {
        where: {
          type: "teacher", // กรองเฉพาะ user ที่มี type เป็น "teacher"
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: (teacher) => {
        teacher.type = "teacher"; // กำหนดค่า type เป็น "teacher" ก่อนสร้าง
      },
    },
  }
);

export default Teacher; // ส่งออก model teacher
