import sequelize from "./db.js";
import Sequelize from "sequelize";

import Role from "./role.model.js";
import User from "./user.model.js";
import Activity from "./activity.model.js";
import Teacher from "./teacher.model.js";
import Judge from "./judge.model.js";
import VerificationToken from "./verificationToken.model.js";

const db = {}; // สร้าง object เปล่า สำหรับเก็บ model ต่าง ๆ
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User; // db.User เป็น Type User คือ class User , = User คือ assign ค่า ไปที่ db.User
db.Role = Role;
db.Activity = Activity; // เก็บ model activity
db.Teacher = Teacher; // เก็บ model teacher
db.Judge = Judge; // เก็บ model judge
db.VerificationToken = VerificationToken; //  เก็บ model verificationToken

// ความสัมพันธ์ระหว่างตาราง
db.VerificationToken.belongsTo(db.User, { foreignKey: "userId" });
db.User.belongsTo(db.VerificationToken, { foreignKey: "userId" });

export default db;
