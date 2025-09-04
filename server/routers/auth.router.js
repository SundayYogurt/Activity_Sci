import authController from "../controllers/auth.controller.js" // import controller สำหรับ auth

import express from "express"; // import express
const router = express.Router();    // สร้าง router object

// POST สมัครสมาชิก
router.post("/signup",authController.signUp); // path /api/v1/register/signup

// POST เข้าสู่ระบบ
router.post("/signin",authController.signIn); // path /api/v1/register/signin

export default router; // ส่งออก router