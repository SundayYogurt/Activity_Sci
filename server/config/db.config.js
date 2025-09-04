import dotenv from "dotenv" // โหลด dotenv เพื่อใช้ environment variables
dotenv.config();                 // โหลดค่าจากไฟล์ .env

export default {
    HOST:process.env.HOST,           // host ของฐานข้อมูล
    USER:process.env.USER,           // user สำหรับเชื่อมต่อฐานข้อมูล
    PASSWORD:process.env.PASSWORD,   // password สำหรับเชื่อมต่อฐานข้อมูล
    DB:process.env.DB,               // ชื่อฐานข้อมูล
    PORT:process.env.DBPORT,         // port ของฐานข้อมูล
    DIALECT:process.env.DIALECT,     // dialect ของฐานข้อมูล (เช่น postgres, mysql)
    pool:{                           // กำหนด pool สำหรับ connection
        max:5,                      // จำนวน connection สูงสุด
        min:0,                      // จำนวน connection ต่ำสุด
        acquire:30000,              // เวลารอ connection (ms)
        idle:10000,                 // เวลาว่างก่อนปิด connection (ms)
    }
}