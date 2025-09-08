import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();                   // โหลดค่าตัวแปรจากไฟล์ .env เข้าสู่ process.env
import {getVerificationEmailTemplate} from '../utils/email.js'
