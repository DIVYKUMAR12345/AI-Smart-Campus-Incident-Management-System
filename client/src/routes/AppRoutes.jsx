import { Routes, Route, Navigate } from "react-router-dom";

import EditProfile from "../pages/profile/EditProfile";

import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";

import StudentDashboard from "../pages/dashboard/StudentDashboard";
import FacultyDashboard from "../pages/dashboard/FacultyDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

import MyProfile from "../pages/profile/MyProfile";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>

            {/* ================= Authentication ================= */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* ================= Student ================= */}

            <Route
                path="/student/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["student"]}>
                        <StudentDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
    path="/student/profile"
    element={
        <ProtectedRoute allowedRoles={["student"]}>
            <MyProfile />
        </ProtectedRoute>
    }
/>

<Route
    path="/student/profile/edit"
    element={
        <ProtectedRoute allowedRoles={["student"]}>
            <EditProfile />
        </ProtectedRoute>
    }
/>

            {/* ================= Faculty ================= */}

            <Route
                path="/faculty/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["faculty"]}>
                        <FacultyDashboard />
                    </ProtectedRoute>
                }
            />

            {/* ================= Admin ================= */}

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            {/* ================= Default ================= */}

            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

        </Routes>
    );
}

export default AppRoutes;