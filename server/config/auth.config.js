import dotenv from "dotenv" // เรียกใช้ dotenv เพื่อโหลด environment variables
dotenv.config()                  // โหลดค่าจากไฟล์ .env

export default {
    secret: process.env.JWT_SECRET // ส่งออกค่า secret สำหรับ JWT จาก .env
}