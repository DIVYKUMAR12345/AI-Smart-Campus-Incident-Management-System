import { useEffect, useState } from "react";

console.log("🔥 STUDENT DASHBOARD LOADED");

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import ComplaintForm from "../../components/complaint/ComplaintForm";

import {
    getMyComplaints
} from "../../services/complaintService";

import "../../styles/dashboard.css";

function StudentDashboard() {

    // ============================
    // Complaints
    // ============================
    const [complaints, setComplaints] = useState([]);

    // ============================
    // Complaint Form
    // ============================
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {

        loadComplaints();

    }, []);

    const loadComplaints = async () => {

        try {

            const response = await getMyComplaints();

            setComplaints(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    // ============================
    // Complaint Statistics
    // ============================

    const total = complaints.length;

    const pending = complaints.filter(
        c => c.status === "Pending"
    ).length;

    const resolved = complaints.filter(
        c => c.status === "Resolved"
    ).length;

    const closed = complaints.filter(
        c => c.status === "Closed"
    ).length;

    return (

        <DashboardLayout>

            <div className="student-dashboard">

                {/* ============================
                    Dashboard Header
                ============================ */}

                <div className="dashboard-header">

                    <div>

                        <h1 className="dashboard-title">
                            🎓 Student Dashboard
                        </h1>

                        <p className="dashboard-subtitle">
                            Welcome to Smart Campus Incident Management System
                        </p>

                    </div>

                    <div className="dashboard-status">

                        <span className="status-dot"></span>

                        System Online

                    </div>

                </div>


                {/* ============================
                    Statistics Cards
                ============================ */}

                <div className="dashboard-stats">

                    <div className="dashboard-card-wrapper total-card">

                        <DashboardCard
                            title="Total Complaints"
                            value={total}
                            color="#2563eb"
                        />

                    </div>


                    <div className="dashboard-card-wrapper pending-card">

                        <DashboardCard
                            title="Pending"
                            value={pending}
                            color="#f59e0b"
                        />

                    </div>


                    <div className="dashboard-card-wrapper resolved-card">

                        <DashboardCard
                            title="Resolved"
                            value={resolved}
                            color="#10b981"
                        />

                    </div>


                    <div className="dashboard-card-wrapper closed-card">

                        <DashboardCard
                            title="Closed"
                            value={closed}
                            color="#ef4444"
                        />

                    </div>

                </div>


                {/* ============================
                    Quick Action Section
                ============================ */}

                <div className="quick-action-section">

                    <div>

                        <h2>
                            Report a Campus Issue
                        </h2>

                        <p>
                            Submit a new complaint and let the system
                            intelligently process your incident.
                        </p>

                    </div>


                    <button
                        className={`create-complaint-btn ${
                            showForm ? "close-btn" : ""
                        }`}
                        onClick={() =>
                            setShowForm(!showForm)
                        }
                    >

                        <span className="button-icon">

                            {showForm ? "✕" : "＋"}

                        </span>

                        {showForm
                            ? "Close Complaint Form"
                            : "Create Complaint"}

                    </button>

                </div>


                {/* ============================
                    Complaint Form
                ============================ */}

                <div
                    className={`complaint-form-container ${
                        showForm ? "form-visible" : ""
                    }`}
                >

                    {showForm && (

                        <ComplaintForm />

                    )}

                </div>


                {/* ============================
                    Dashboard Footer Message
                ============================ */}

                <div className="dashboard-info">

                    <div className="info-icon">
                        🤖
                    </div>

                    <div>

                        <strong>
                            AI-Powered Incident Management
                        </strong>

                        <p>
                            Your complaints can be automatically analyzed,
                            categorized, prioritized, and routed to the
                            appropriate faculty member.
                        </p>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default StudentDashboard;