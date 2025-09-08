import {DataTypes} from "sequelize" // import DataTypes สำหรับกำหนดชนิดข้อมูล
import sequelize from "./db.js"     // import instance ของ Sequelize

// ที่ไม่ได้ import User เพราะ ไม่ได้เป็น สืบทอดความสัมพันธ์

const VerificationToken = sequelize.define("verification_token", {
    id: {
        type: DataTypes.INTEGER,      // กำหนดชนิดข้อมูลเป็น string
        primaryKey: true,            // กำหนดเป็น primary key
        allowNull: false,            // ห้ามเป็น null
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    userId: { // foreign key อ้างอิงไปยัง user
        type: DataTypes.INTEGER,
        allowNull: false,
        Reference: {
            model: "users", // ชื่อตาราง user ในฐานข้อมูล
            key: "id"
        },
        expiresAt: {
            type: DataTypes.DATE , // กำหนดชนิดข้อมูลเป็น date
            allowNull: false,
        }
    }
})

export default VerificationToken // ส่งออก model verificationToken