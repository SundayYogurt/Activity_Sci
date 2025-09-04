
import express from 'express' // เรียกใช้ express สำหรับสร้าง web server
import dotenv from 'dotenv'  // เรียกใช้ dotenv เพื่อโหลด environment variables จากไฟล์ .env
const app = express()              // สร้าง instance ของ express app
dotenv.config();                   // โหลดค่าตัวแปรจากไฟล์ .env เข้าสู่ process.env
import cors from 'cors'
const PORT = process.env.PORT || 3000; // กำหนด port ที่จะใช้รัน server
const FRONTEND_URL = process.env.FRONTEND_URL
import authRouter from "./routers/auth.router.js"   // import router สำหรับ auth API
import activityRouter from "./routers/activity.router.js" // import router สำหรับ activity API
import db from "./models/index.js" // import models และเชื่อมต่อฐานข้อมูล
const role = db.Role                 // ดึง model role สำหรับสร้าง role เริ่มต้น

// ฟังก์ชันสร้าง role เริ่มต้นในฐานข้อมูล
const initRole = () => {
  role.create({id:1, name:"admin"})     
  role.create({id:2, name:"manager"}) 
  role.create({id:3, name:"teacher"})     
  role.create({id:4, name:"judge"})
}

// sync schema กับฐานข้อมูล (force: true จะลบและสร้างใหม่ทุกครั้ง)
db.sequelize.sync({force: true}).then(()=>{
   initRole();                         // สร้าง role เริ่มต้น
   console.log("Drop and Sync")        // log เมื่อ sync สำเร็จ
})

app.use(cors({
  origin:["http://localhost:5173","127.0.0.1:5173", FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  allowedHeaders:["Content-Type","Authorization","x-access-token"]
}))
app.use(express.json())                // Middleware สำหรับแปลง request body เป็น json
app.use(express.urlencoded({ extended: true})) // Middleware สำหรับแปลง urlencoded เป็น json


app.use('/api/v1/auth', authRouter)          // กำหนด router สำหรับ path /api/v1/auth
app.use('/api/v1/activities', activityRouter) // กำหนด router สำหรับ path /api/v1/activities

app.get('/', (req, res) => { // route หลัก (root) สำหรับเช็คว่า server ทำงาน
  res.send('Restful API')    // ส่งข้อความกลับ
})

app.listen(PORT,() => {
  console.log("Listening to http://localhost:" + PORT) // log เมื่อ server ทำงาน
});