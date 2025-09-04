import db from "../models/index.js" // import models
const User = db.User;                    // ดึง model user
const Role = db.Role;                    // ดึง model role
import bcrypt from "bcryptjs";      // import bcrypt สำหรับ hash password
import jwt from "jsonwebtoken";     // import jwt สำหรับสร้าง token
import { Op } from "sequelize";     // import Op สำหรับ query เงื่อนไข
import config from "../config/auth.config.js" // import JWT secret
const authController = {}                // สร้าง object สำหรับ controller

// ฟังก์ชันสมัครสมาชิก
authController.signUp = async (req, res) => {
    const { username, name, email, password } = req.body; // รับข้อมูลจาก body
    if (!username || !name || !email || !password) {      // ตรวจสอบข้อมูลครบหรือไม่
        res.status(400).send({ message: "Please provide all required fields" })
        return
    }
    await User.findOne({ where: { username } })           // ตรวจสอบว่ามี username นี้หรือยัง
        .then((user) => {
            if (user) {
                res.status(400).send({ message: "Username is already existed" })
                return
            }
            const newUser = {
                username,
                name,
                email,
                password: bcrypt.hashSync(password, 8)    // hash password ก่อนบันทึก
            }
            User.create(newUser).then((user) => {

                let role = req.body.roles
                // ถ้ามี roles ส่งมาใน body
                if (req.body.roles) {
                    // ค้นหา role ที่ตรงกับชื่อใน body fillter
                    Role.findAll({
                        where: {
                            name: { [Op.or]: req.body.roles }
                        }
                    }).then((roles) => {
                        if (roles?.length === 0) { //เช็คส่า role มีกี่ role ที่ส่งมา
                            user.setRoles([3]).then(() => {
                                res.send({ message: "User registered successfully as teacher" })
                            })
                        } else {
                            user.setRoles(roles).then(() => {
                                res.send({ message: "User registered successfully as " + role})
                            })
                        }
                    })
                } else {
                    user.setRoles([3]).then(() => { // ถ้าไม่มี roles ให้เป็น user
                        res.send({ message: "User registered successfully as teacher" })
                    })
                }
            }).catch((error) => {
                res.status(500).send({ message: error.message || "Something error while registering a new user" })
            })
        })
}

// ฟังก์ชันเข้าสู่ระบบ
authController.signIn = async (req, res) => {
    const { username, password } = req.body; // รับข้อมูลจาก body

    //validate
    if (!username || !password) {
        res.status(400).send({ message: "Username or password are missing!" })
        return
    }

    await User.findOne({
        where: { username: username }
    }).then((user) => {
        if (!user) {
            res.status(404).send({ message: "User not found" })
            return
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password) // ตรวจสอบ password
        if (!passwordIsValid) {
            res.status(401).send({ message: "Invalid password" })
        }
        //Valid user
        const token = jwt.sign({ username: user.username }, config.secret, { // สร้าง JWT token
            expiresIn: 86400, // 24 ชั่วโมง
        })
        const authorities = [];
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLES_" + roles[i].name.toUpperCase()) // สร้าง array ของ role
            }
            res.send({
                token: token,                // ส่ง token กลับ
                authorities: authorities,    // ส่ง role กลับ
                userInfo: {                  // ส่งข้อมูล user กลับ
                    name: user.name,
                    email: user.email,
                    username: user.username
                }
            })
        })
    }).catch((error) => {
        res.status(500).send({ message: error.message || "Something error while signin" })
    })

}

export default authController // ส่งออก controller