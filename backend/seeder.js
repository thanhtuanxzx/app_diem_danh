import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import connectDB from "./db/connect.js"; // Kết nối MongoDB
import User from "./models/User.js";
import Activity from "./models/Activity.js";
import AttendanceRecord from "./models/AttendanceRecord.js";
import Log from "./models/Log.js";

dotenv.config();
connectDB(); // Kết nối database

const seedData = async () => {
    try {
        // 1️⃣ Xóa toàn bộ dữ liệu cũ
        await User.deleteMany();
        await Activity.deleteMany();
        await AttendanceRecord.deleteMany();
        await Log.deleteMany();
        console.log("🗑️ Đã xóa toàn bộ dữ liệu cũ.");

        // 2️⃣ Tạo Super Admin
        const hashedPassword = await bcrypt.hash("123456", 10);
        const superAdmin = await User.create({
            name: "Super Admin",
            email: "superadmin@example.com",
            password: hashedPassword,
            role: "super_admin",
        });

        console.log("✅ Đã tạo tài khoản Super Admin:", superAdmin.email);

        // 3️⃣ Tạo Admin
        const admin = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: hashedPassword,
            role: "admin",
        });

        console.log("✅ Đã tạo tài khoản Admin:", admin.email);

        // 4️⃣ Tạo Sinh viên mẫu
        const student = await User.create({
            name: "Nguyễn Văn A",
            email: "student@example.com",
            password: hashedPassword,
            role: "student",
        });

        console.log("✅ Đã tạo tài khoản Sinh viên:", student.email);

        // 5️⃣ Tạo Hoạt động mẫu
        const activity = await Activity.create({
            name: "Hoạt động tình nguyện",
            description: "Hoạt động giúp đỡ người nghèo",
            date: new Date(),
            created_by: admin._id, // Admin tạo hoạt động
        });

        console.log("✅ Đã tạo hoạt động:", activity.name);

        // 6️⃣ Tạo bản ghi điểm danh mẫu
        const attendance = await AttendanceRecord.create({
            student_id: student._id,
            activity_id: activity._id,
            status: "present",
            timestamp: new Date(),
        });

        console.log("✅ Đã tạo bản ghi điểm danh cho:", student.name);

        // 7️⃣ Tạo Log hệ thống
        await Log.create([
            { user_id: admin._id, action: "Tạo hoạt động: Hoạt động tình nguyện" },
            { user_id: student._id, action: "Điểm danh thành công" },
        ]);

        console.log("✅ Đã tạo log hoạt động.");

        console.log("🎉 Seeder hoàn thành!");
        process.exit(); // Thoát chương trình sau khi nhập dữ liệu xong
    } catch (error) {
        console.error("❌ Lỗi khi seed dữ liệu:", error);
        process.exit(1);
    }
};

// Chạy function seed
seedData();
