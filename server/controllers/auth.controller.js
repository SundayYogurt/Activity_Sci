import db from "../models/index.js";
import crypto from "crypto"; // สำหรับสร้าง token แบบสุ่ม
import { sendVerificationEmail } from "../utils/email.js";
import authConfig from "../config/auth.config.js"
import path from "path";
import jwt from 'jsonwebtoken'


const User = db.User;

// register
const signUp = async (req, res) => {
  const { email, password, type, name } = req.body;

  try {
    // validation request check
    if (!email || !password || !type || !name) {
      return res
        .status(400)
        .send({ message: "Please provide all required fields!" });
    }
    // check user type is valid
    const allowedTypes = ["admin", "teacher", "judge"]; // กำหนดประเภทที่อนุญาต ถ้าทำเป็น enum ก็ได้ แต่ จะ error
    if (!allowedTypes.includes(type)) {
      return res.status(400).send({ message: "Invalid user type!" });
    }

    // check additional fields for teacher type
    const { school, phone } = req.body; // ดึงข้อมูล school และ phone จาก request body
    if (type === "teacher" && (!school || !phone)) {
      // ถ้า type เป็น teacher ต้องมี school และ phone ด้วย
      return res
        .status(400)
        .send({ message: "Please provide school and phone for teacher type!" });
    }

    // check email already exists
    const existingUser = await User.findOne({ where: { email: email } }); // หา user ที่มี email ตรงกับที่ส่งมา
    // ไม่ใช้ then เพราะมี await
    if (existingUser) {
      return res.status(400).send({ message: "Email is already in use!" });
    }

    //Create user object
    const userData = { email, password, type, name, isVerified: false }; // สร้าง object userData จากข้อมูลที่ได้รับมา
    if (type === "teacher") {
      userData.school = school;
      userData.phone = phone;
    }

    // create new user
    const user = await User.create(userData);

    //if user is a teacher , create and sent verification email
    if (type === "teacher") {
      try {
        //create verification token
        const token = crypto.randomBytes(32).toString("hex"); // สร้าง token แบบสุ่ม 32 bytes แล้วแปลงเป็น hex string ฐาน 16
        const verification = await db.VerificationToken.create({
          token,
          userId: user.id,
          expiredAt: new Date(Date.now() + 24 * 60 * 60 ), // หมดอายุใน 24 ชั่วโมง  = 24h
        });
        console.log("verification token created ", verification);

        //send verification email
        //TODO Send verification email
        await sendVerificationEmail(user.email, token, user.name);
        console.log("Verfication email sent successfully");
      } catch (error) {
        console.log("Error sending verifycation email", error);
      }
    }

    res.status(201).send({
      message:
        user.type === "teacher"
          ? "Registration successfully! Please check your email to verify your account"
          : "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        ...(user.type === "teacher" && { isVerified: user.isVerified }), // เพิ่ม isVerified ถ้า type เป็น teacher

        //ที่ต้องใช้ object นี้เพราะ เดี๋ยวใช้ user password จะหลุดออกไปด้วย
      },
    }); // 201 successfully created
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating the user.",
    });
  }
};

const signIn = async (req, res) => {
  try {
      const {email, password} = req.body

  if(!email || !password){
    return res.status(400).send({message: "Email and Password are required!"})
  }

  const user = await User.findOne({where: {email}}) 

  if(!user){
    return res.status(404).send({message: "User not found"})
  }

  const passwordIsValid = await user.comparePassword(password)

  if(!passwordIsValid) {
    return res.status(401).send({message: "Invalid password"})
  }

  if(user.type === "teacher" && !user.isVerified){
    return res.status(403).send({message: "Please verify your email to activate your account!"})
  }

const token = jwt.sign({id: user.id}, authConfig.secret, { 
  expiresIn: 24 * 60 *60 * 1000
}) 

return res.status(200).send({message: "Login successfully!", 
  user:{
  id:user.id,
  name: user.name,
  email: user.email,
  type: user.type,
  ...(user.type === 'teacher' && {
    isVerified: user.isVerified,
    phone: user.phone,
    school: user.school
  })
    },
    accessToken: token,
  })
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while login.",
    });
  }

}
const verifyEmail = async (req, res) => {
  console.log("verifyEmail");
  const { token } = req.params;

  if (!token) {
    res.status(400).send({ message: "Token is missing!" });
  }

  try {
    const VerificationToken = await db.VerificationToken.findOne({
      where: { token },
    });
    if (!VerificationToken) {
      return res.status(404).send({ message: "invalid valification token" });
    }
    //Check if token is expired
    if (new Date() > VerificationToken.expiredAt) {
      await VerificationToken.destroy();
      return res
        .status(400)
        .send({ message: "Verification token has expired!" });
    }
    //protect theift

    const user = await User.findByPk(VerificationToken.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await user.update({ isVerified: true });
    await VerificationToken.destroy();

    //return web view
    const htmlPath = path.join(
      // join คือเชื่อม ต่อๆกัน
      process.cwd(), // cwd corrent working directory
      "views",
      "verification-success.html"
    );
    console.log(htmlPath);
    res.sendFile(htmlPath);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the user.",
    });
  }
};
const authController = { signUp, verifyEmail , signIn};

export default authController;
