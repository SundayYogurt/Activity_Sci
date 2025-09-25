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
    console.log("req.userId:", req.userId);
    req.userId = decoded.id; // เก็บ username จาก token
    
    next();
  });
};

// ตรวจสอบว่า user เป็น admin
const isAdmin = async (req, res, next) => {
  
  try {
    User.findByPk(req.userId).then((user) => {
      console.log(user)
      if(!user){
        return res.status(404).json({ message: "User not found!" });
      }
      if(user.type === "admin"){
        return next();
      }
      return res.send(401).send({message: "Unauthorize access. require admin role!"})
    })
  } catch (error) {
    res.status(500).send({ message : error.message})
  }
};
const isTeacherOrJudge = async (req, res, next) => {
  try {
   User.findByPk(req.userId).then((user) => {
      if(!user){
        return res.status(404).json({ message: "User not found!" });
      }
      if(user.type === "teacher" || user.type === "judge") {
        return next();
      }
      return res.send(401).send({message: "Unauthorize access. require teacher or judge role!"})
    })
  } catch (error) {
    res.status(500).send({ message : error.message})
  }
};

const isJudge = async (req, res, next) => {
  try {
     User.findByPk(req.userId).then((user) => {
      if(!user){
        return res.status(404).json({ message: "User not found!" });
      }
      if(user.type === "judge"){
        return next();
      }
      return res.send(401).send({message: "Unauthorize access. require judge role!"})
    })
  } catch (error) {
    res.status(500).send({ message : error.message})
  }
};

const isTeacher = async (req, res, next) => {
  try {
     User.findByPk(req.userId).then((user) => {
      console.log(user)
      if(!user){
        return res.status(404).json({ message: "User not found!" });
      }
      if(user.type === "teacher"){
        return next();
      }
      return res.send(401).send({message: "Unauthorize access. require teacher role!"})
    })
  } catch (error) {
    res.status(500).send({ message : error.message})
  }
};

const authJwt = { verifyToken, isAdmin, isTeacherOrJudge, isJudge, isTeacher };
export default authJwt;
