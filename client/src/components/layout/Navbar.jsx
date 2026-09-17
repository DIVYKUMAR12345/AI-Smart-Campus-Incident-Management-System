import { useAuth } from "../../context/AuthContext";
import NotificationBell from "../Notification/NotificationBell";

function Navbar() {

    const { user } = useAuth();

    return (

        <div
            className="navbar"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 25px"
            }}
        >

            {/* ===========================
                Project Title
            =========================== */}

            <h2
                style={{
                    margin: 0
                }}
            >
                AI Smart Campus Incident Management System
            </h2>

            {/* ===========================
                Right Section
            =========================== */}

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "25px"
                }}
            >

                {/* Notification Bell */}

                <NotificationBell />

                {/* Welcome User */}

                <div>

                    Welcome,

                    <strong>
                        {" "}
                        {user?.fullName}
                    </strong>

                </div>

            </div>

        </div>

    );

}

export default Navbar;