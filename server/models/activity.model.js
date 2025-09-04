import {Datatype} from "sequelize"
import sequelize from "../config/db.config"

const Activity = sequelize.define("activity", {

    id:{
        type: Datatype.INTEGER,     // กำหนดชนิดข้อมูลเป็น integer
        primaryKey: true,            // กำหนดเป็น primary key
        autoIncrement: true,         // เพิ่มค่าอัตโนมัติ
    },
    name:{
        type: Datatype.STRING,
        allowNull: false,
    },
    description:{
        type: Datatype.STRING,
        allowNull: false
    },
    type:{
        type: Datatype.STRING,
        allowNull: false
    },
    level:{
        type: Datatype.STRING,
        allowNull: false
    },
    team_size: {
        type: Datatype.INTEGER,
        allowNull: false
    },
    date:{
        type: Datatype.DATE,
        allowNull: false
    },
    location:{
        type: Datatype.INTEGER,
        allowNull: false
    },
    reg_open:{
        type: Datatype.DATE,
        allowNull: false
    },
    reg_close:{
        type: Datatype.DATE,
        allowNull: false
    },
    contact_name: {
        type: Datatype.STRING,
        allowNull: false
    },
    contact_phone: {
        type: Datatype.STRING,
        allowNull: false
    },
    contact_email: {
        type: Datatype.STRING,
        allowNull: false
    },
    status: {
        type: Datatype.STRING,
        allowNull: false
    }

})

Restaurant.sync({force: false}).then(()=>{
    console.log("Table created or already exists") // log เมื่อสร้าง table สำเร็จ
}).catch((error)=>{
    console.log("Error creating table", error);    // log เมื่อเกิด error
})


export default Activity