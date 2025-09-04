import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import db from "../models/index.js";
const User = db.User;

// ตรวจสอบ token
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    console.log("✅ Token decoded:", decoded); // debug
    req.username = decoded.username; // เก็บ username จาก token
    next();
  });
};

// ตรวจสอบว่า user เป็น admin
const isAdmin = async (req, res, next) => {
  try {
    // ใช้ findOne เผื่อ username ไม่ใช่ PK
    const user = await User.findOne({ where: { username: req.username } });

    if (!user) {
      console.log("❌ User not found for username:", req.username);
      return res.status(404).json({ message: "User not found!" });
    }

    const roles = await user.getRoles();
    if (roles.some((role) => role.name === "admin")) {
      return next();
    }

    return res.status(401).json({
      message: "Unauthorized access, require admin role!",
    });
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ตรวจสอบว่า user เป็น admin หรือ moderator
const isAdminOrManager = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.username } });

    if (!user) {
      console.log("❌ User not found for username:", req.username);
      return res.status(404).json({ message: "User not found!" });
    }

    const roles = await user.getRoles();
    if (roles.some((role) => role.name === "admin" || role.name === "manager")) {
      return next();
    }

    return res.status(401).json({
      message: "Unauthorized access, require admin or manager role!",
    });
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const isManager = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.username } }); // ใช้ findOne เผื่อ username ไม่ใช่ PK

    if (!user) {
      console.log("❌ User not found for username:", req.username);
      return res.status(404).json({ message: "User not found!" });
    }
    const roles = await user.getRoles();
    if (roles.some((role) => role.name === "manager")) {
      return next();
    } 
    return res.status(401).json({
      message: "Unauthorized access, require manager role!",
    });
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const authJwt = { verifyToken, isAdmin, isAdminOrManager, isManager };
export default authJwt;
