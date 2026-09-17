import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
    FaHome,
    FaClipboardList,
    FaPlusCircle,
    FaUsers,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
    FaUserCircle,
    FaKey
} from "react-icons/fa";

function Sidebar() {

    const { user, logout } = useAuth();

    const location = useLocation();

    // ==========================
    // Debug Logs
    // ==========================
    console.log("========== SIDEBAR ==========");
    console.log("USER :", user);
    console.log("ROLE :", user?.role);
    console.log("CURRENT PATH :", location.pathname);
    console.log("=============================");

    const role = user?.role;

    let menu = [];

    // ==========================
    // ADMIN MENU
    // ==========================
    if (role === "admin") {

        menu = [
            {
                name: "Dashboard",
                path: "/admin/dashboard",
                icon: <FaHome />
            },
            {
                name: "Complaints",
                path: "/admin/complaints",
                icon: <FaClipboardList />
            },
            {
                name: "Users",
                path: "/admin/users",
                icon: <FaUsers />
            },
            {
                name: "Reports",
                path: "/admin/reports",
                icon: <FaChartBar />
            },
            {
                name: "Settings",
                path: "/admin/settings",
                icon: <FaCog />
            }
        ];

    }

    // ==========================
    // FACULTY MENU
    // ==========================
    else if (role === "faculty") {

        menu = [
            {
                name: "Dashboard",
                path: "/faculty/dashboard",
                icon: <FaHome />
            },
            {
                name: "Assigned Complaints",
                path: "/faculty/complaints",
                icon: <FaClipboardList />
            },
            {
                name: "Settings",
                path: "/faculty/settings",
                icon: <FaCog />
            }
        ];

    }

    // ==========================
    // STUDENT MENU
    // ==========================
    else {

        menu = [
            {
                name: "Dashboard",
                path: "/student/dashboard",
                icon: <FaHome />
            },
            {
                name: "Create Complaint",
                path: "/student/create",
                icon: <FaPlusCircle />
            },
            {
                name: "My Complaints",
                path: "/student/complaints",
                icon: <FaClipboardList />
            },
            {
                name: "My Profile",
                path: "/student/profile",
                icon: <FaUserCircle />
            },
            {
                name: "Change Password",
                path: "/student/change-password",
                icon: <FaKey />
            },
            {
                name: "Settings",
                path: "/student/settings",
                icon: <FaCog />
            }
        ];

    }

    return (

        <div className="sidebar">

            <div className="logo">

                <h2>SCIMS</h2>

            </div>

            <ul>

                {menu.map((item) => (

                    <li
                        key={item.path}
                        className={
                            location.pathname === item.path
                                ? "active"
                                : ""
                        }
                    >

                        <Link to={item.path}>

                            {item.icon}

                            <span>{item.name}</span>

                        </Link>

                    </li>

                ))}

            </ul>

            <button
                className="logout-btn"
                onClick={logout}
            >

                <FaSignOutAlt />

                <span>Logout</span>

            </button>

        </div>

    );

}

export default Sidebar;