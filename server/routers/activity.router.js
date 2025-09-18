import express from "express"; // import express
const router = express.Router(); // สร้าง router object
import activityController from "../controllers/activity.controller.js"; // import controller สำหรับ activity
import authJwt from "../middleware/authJwt.js"; // import middleware สำหรับตรวจสอบ JWT

// POST สร้างกิจกรรมใหม่ (เฉพาะ admin และ manager)
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isManager],
  activityController.create
); // path /api/v1/activities

// // GET ดึงข้อมูลกิจกรรมทั้งหมด (ทุกคนเข้าถึงได้)
// router.get("/", activityController.getAll); // path /api/v1/activities

// // GET ดึงข้อมูลกิจกรรมตาม id (ทุกคนเข้าถึงได้)
// router.get("/:id", activityController.getActivityById); // path /api/v1/activities/:id

// // PUT อัปเดตกิจกรรมตาม id (เฉพาะ admin และ manager)
// router.put("/:id", [authJwt.verifyToken, authJwt.isAdminOrManager], activityController.updateById); // path /api/v1/activities/:id

// // DELETE ลบกิจกรรมตาม id (เฉพาะ admin)
// router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], activityController.deleteById); // path /api/v1/activities/:id

export default router; // ส่งออก router
