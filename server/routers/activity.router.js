import express from"express";
const router = express.Router();

import activityController from "../controllers/activity.controller.js";

import authJwt from "../middleware/authJwt.js"

router.post("/", authJwt.verifyToken,authJwt.isAdmin ,activityController.create);
router.get("/search", activityController.searchActivities);
router.get("/:id", activityController.getActivityById);
router.get("/", activityController.getAll);
router.delete("/:id",authJwt.verifyToken,authJwt.isAdmin, activityController.deleteById);
router.put("/:id", authJwt.verifyToken,authJwt.isAdmin, activityController.updateById);

export default router