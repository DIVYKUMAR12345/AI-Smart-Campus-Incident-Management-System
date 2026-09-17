import NotificationBell from "../Notification/NotificationBell";

import Sidebar from "./Sidebar";

console.log("DashboardLayout Loaded");

import Navbar from "./Navbar";
import Footer from "./Footer";

function DashboardLayout({ children }) {

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-main">

                <Navbar />

                <div className="dashboard-content">
                    {children}
                </div>

                <Footer />

            </div>

        </div>

    );

}

export default DashboardLayout;