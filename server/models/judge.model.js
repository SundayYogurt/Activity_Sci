import User from "./user.model.js";

const Judge = User.init(
  {},
  {
    // กำหนด ขอบเขต scope ของ judge ให้ ขึ้นเป็น judge เท่านั้น ไม่รวม user type อื่น ตอนที่ query ข้อมูล เช่น findAll, findOne {(where: {...})}

    scopes: {
      defaultScope: {
        where: {
          type: "judge", // กรองเฉพาะ user ที่มี type เป็น "judge"
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: (judge) => {
        judge.type = "judge"; // กำหนดค่า type เป็น "judge" ก่อนสร้าง
      },
    },
  }
);

export default Judge; // ส่งออก model judge
