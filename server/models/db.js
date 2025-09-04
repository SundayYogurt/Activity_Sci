import {Sequelize} from 'sequelize' // import Sequelize ORM
import dbConfig from "../config/db.config.js" // import config สำหรับฐานข้อมูล

// สร้าง instance ของ Sequelize สำหรับเชื่อมต่อฐานข้อมูล
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.HOST,           // host ของฐานข้อมูล
    port: dbConfig.DBPORT,         // port ของฐานข้อมูล
    dialect: dbConfig.DIALECT,     // dialect ของฐานข้อมูล
    logging: false,      
    // dialectOptions:{
    //     ssl:{
    //         require:true,
    //         rejectUnauthorized:false,
    //     }
    // }          // ปิด log query
});

// ฟังก์ชันทดสอบการเชื่อมต่อฐานข้อมูล
const testConnection = async () => {
    try{
        await sequelize.authenticate() // ทดสอบเชื่อมต่อ
        console.log("Connection successfully") // ถ้าสำเร็จ
    }catch(error){
        console.log("Unable connect to the database", console.error()); // ถ้าไม่สำเร็จ
    }
}

testConnection(); // เรียกฟังก์ชันทดสอบการเชื่อมต่อ
export default sequelize // ส่งออก instance สำหรับใช้ใน model อื่น