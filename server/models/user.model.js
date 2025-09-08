import {DataTypes} from "sequelize" // import DataTypes สำหรับกำหนดชนิดข้อมูล
import sequelize from "./db.js"     // import instance ของ Sequelize
import bcrypt from "bcryptjs"

// สร้าง model user และกำหนด schema
const User = sequelize.define("user", {
    id:{
        type: DataTypes.INTEGER,      // กำหนดชนิดข้อมูลเป็น string
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
        uniqe: true,
        validate: {
            isEmail: true              // ตรวจสอบรูปแบบ email
    },
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
        
},{
        hook:{
            beforeCreate: async(user) => {
            if(user.password){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt)
            }
        },
            beforeUpdate: async (user) => {
                if(user.changed("password")){
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt)
                }
            }
    }
})// สร้าง schema หรือโครงสร้างของข้อมูล

User.sync({force: true}).then(()=>{
    console.log("Table created or already exists") // log เมื่อสร้าง table สำเร็จ
}).catch((error)=>{
    console.log("Error creating table", error);    // log เมื่อเกิด error
})

User.prototype.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}
export default User // ส่งออก model user