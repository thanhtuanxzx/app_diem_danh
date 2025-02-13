import express from "express";
import { authenticateUser, authorizeRoles } from "../middleware/authMiddleware.js";
import {
    createAdmin, deleteAdmin, getAllAdmins,
    createStudent, deleteStudent, getAllStudents,
    createActivity, deleteActivity, getAllActivities,
    getAttendanceRecords, getSystemLogs
} from "../controllers/superAdminController.js";

const router = express.Router();

// Quản lý Admin
router.post("/admin", authenticateUser, authorizeRoles("super_admin"), createAdmin);
router.delete("/admin/:adminId", authenticateUser, authorizeRoles("super_admin"),deleteAdmin);
router.get("/admins",authenticateUser, authorizeRoles("super_admin"), getAllAdmins);

// Quản lý Sinh viên
router.post("/student", authenticateUser, authorizeRoles("super_admin"),createStudent);
router.delete("/student/:studentId", authenticateUser, authorizeRoles("super_admin"),deleteStudent);
router.get("/students",authenticateUser, authorizeRoles("super_admin"), getAllStudents);

// Quản lý Hoạt động
router.post("/activity", authenticateUser, authorizeRoles("super_admin","admin"),createActivity);
router.delete("/activity/:activityId",  authenticateUser, authorizeRoles("super_admin","admin"),deleteActivity);
// router.get("/activities",  authenticateUser, authorizeRoles("super_admin","admin"),getAllActivities);
router.get("/activities",  getAllActivities);

// Quản lý Điểm danh & Logs
router.get("/attendance",  getAttendanceRecords);
router.get("/logs", authenticateUser, authorizeRoles("super_admin","admin"), getSystemLogs);

export default router;
