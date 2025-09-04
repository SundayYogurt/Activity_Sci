import {DataTypes} from "sequelize" // import DataTypes สำหรับกำหนดชนิดข้อมูล
import sequelize from "./db.js"     // import instance ของ Sequelize

// สร้าง model user และกำหนด schema
const User = sequelize.define("user", {
    username:{
        type: DataTypes.STRING,      // กำหนดชนิดข้อมูลเป็น string
        primaryKey: true,            // กำหนดเป็น primary key
        allowNull: false             // ห้ามเป็น null
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})// สร้าง schema หรือโครงสร้างของข้อมูล

User.sync({force: true}).then(()=>{
    console.log("Table created or already exists") // log เมื่อสร้าง table สำเร็จ
}).catch((error)=>{
    console.log("Error creating table", error);    // log เมื่อเกิด error
})

export default User // ส่งออก model user