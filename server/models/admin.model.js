
import User from "./user.model"

const Admin = User.init({

},
    {
        // กำหนด ขอบเขต scope ของ admin ให้ ขึ้นเป็น admin เท่านั้น ไม่รวม user type อื่น ตอนที่ query ข้อมูล เช่น findAll, findOne {(where: {...})}
        scopes: {
            defaultScope: {
                where: {
                    type: "admin" // กรองเฉพาะ user ที่มี type เป็น "admin"
                }
            }
        }
    }, {
    hook: {
        beforeCreate: (admin) => {

            admin.type = "admin" // กำหนดค่า type เป็น "admin" ก่อนสร้าง
        }
    }
})

export default Admin // ส่งออก model admin