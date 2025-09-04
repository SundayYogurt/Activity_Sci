import express from 'express'
import dotenv from 'dotenv'
import db from './models/index.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

db.sequelize.sync({force: true}).then(()=>{

   console.log("Drop and Sync")        // log เมื่อ sync สำเร็จ
})

app.listen(3000, () => console.log('Server is running on http://localhost:' + PORT))

app.get('/', (req, res) => { // route หลัก (root) สำหรับเช็คว่า server ทำงาน
  res.send('Restful Activity API ')    // ส่งข้อความกลับ
})