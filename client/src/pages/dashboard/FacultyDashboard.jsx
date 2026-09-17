import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import ComplaintTable from "../../components/Table/ComplaintTable";
import FacultyComplaintDetailsModal from "../../components/Modal/FacultyComplaintDetailsModal";

import {
    getAssignedComplaints,
    getComplaintHistory
} from "../../services/complaintService";

function FacultyDashboard() {

    // ==========================================
    // Assigned Complaints
    // ==========================================
    const [complaints, setComplaints] = useState([]);

    // ==========================================
    // Loading
    // ==========================================
    const [loading, setLoading] = useState(true);

    // ==========================================
    // Search
    // ==========================================
    const [search, setSearch] = useState("");

    // ==========================================
    // Filter
    // ==========================================
    const [statusFilter, setStatusFilter] = useState("All");

    // ==========================================
    // View Modal
    // ==========================================
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // ==========================================
    // Complaint History
    // ==========================================
    const [complaintHistory, setComplaintHistory] = useState([]);

    // ==========================================
    // Load Assigned Complaints
    // ==========================================
    useEffect(() => {

        loadComplaints();

    }, []);

    // ==========================================
    // Load Complaints
    // ==========================================
    const loadComplaints = async () => {

        try {

            setLoading(true);

            const response = await getAssignedComplaints();

            setComplaints(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Load Complaint History
    // ==========================================
    const loadComplaintHistory = async (complaintId) => {

        try {

            const response = await getComplaintHistory(
                complaintId
            );

            setComplaintHistory(response.data);

        }

        catch (error) {

            console.error(
                "History Load Error:",
                error
            );

            setComplaintHistory([]);

        }

    };

    // ==========================================
    // Search + Filter
    // ==========================================
    const filteredComplaints = complaints.filter(
        (complaint) => {

            const matchesSearch =

                complaint.title
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                complaint.student.fullName
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                complaint.category
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =

                statusFilter === "All"

                    ? true

                    : complaint.status === statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );

        }
    );

    return (

        <DashboardLayout>

            <div className="modern-dashboard">

                {/* ========================================== */}
                {/* Header */}
                {/* ========================================== */}

                <div className="dashboard-hero faculty-hero">

                    <div>

                        <span className="dashboard-eyebrow">
                            FACULTY WORKSPACE
                        </span>

                        <h1>
                            Faculty Dashboard
                        </h1>

                        <p>
                            Manage and track complaints assigned to you.
                        </p>

                    </div>

                    <div className="hero-icon">
                        👨‍🏫
                    </div>

                </div>


                {/* ========================================== */}
                {/* Statistics */}
                {/* ========================================== */}

                <div className="stats-grid faculty-stats">

                    <div className="stat-card-wrapper blue">

                        <DashboardCard
                            title="Assigned Complaints"
                            value={complaints.length}
                            color="#2563eb"
                        />

                    </div>

                    <div className="stat-card-wrapper orange">

                        <DashboardCard
                            title="Pending"
                            value={
                                complaints.filter(
                                    c => c.status === "Pending"
                                ).length
                            }
                            color="#f59e0b"
                        />

                    </div>

                    <div className="stat-card-wrapper cyan">

                        <DashboardCard
                            title="In Progress"
                            value={
                                complaints.filter(
                                    c => c.status === "In Progress"
                                ).length
                            }
                            color="#06b6d4"
                        />

                    </div>

                    <div className="stat-card-wrapper green">

                        <DashboardCard
                            title="Resolved"
                            value={
                                complaints.filter(
                                    c => c.status === "Resolved"
                                ).length
                            }
                            color="#10b981"
                        />

                    </div>

                </div>


                {/* ========================================== */}
                {/* Complaint Section */}
                {/* ========================================== */}

                <div className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <span className="section-label">
                                ASSIGNED WORK
                            </span>

                            <h2>
                                My Complaints
                            </h2>

                            <p>
                                Review and update complaints assigned to you.
                            </p>

                        </div>

                        <div className="complaint-count">

                            {filteredComplaints.length} Results

                        </div>

                    </div>


                    {/* ========================================== */}
                    {/* Search + Filter */}
                    {/* ========================================== */}

                    <div className="filter-panel">

                        <div className="search-box">

                            <span>
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder="Search complaints, students or categories..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>


                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                        >

                            <option value="All">
                                All Status
                            </option>

                            <option value="Assigned">
                                Assigned
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Resolved">
                                Resolved
                            </option>

                            <option value="Closed">
                                Closed
                            </option>

                        </select>

                    </div>


                    {/* ========================================== */}
                    {/* Complaint Table */}
                    {/* ========================================== */}

                    <div className="table-card">

                        {

                            loading

                                ?

                                <div className="loading-state">

                                    <div className="loading-spinner"></div>

                                    <p>
                                        Loading assigned complaints...
                                    </p>

                                </div>

                                :

                                <ComplaintTable

                                    complaints={
                                        filteredComplaints
                                    }

                                    onView={async (complaint) => {

                                        setSelectedComplaint(
                                            complaint
                                        );

                                        await loadComplaintHistory(
                                            complaint._id
                                        );

                                        setIsModalOpen(true);

                                    }}

                                />

                        }

                    </div>

                </div>


                {/* ========================================== */}
                {/* Complaint Details Modal */}
                {/* ========================================== */}

                {

                    selectedComplaint && (

                        <FacultyComplaintDetailsModal

                            complaint={
                                selectedComplaint
                            }

                            isOpen={
                                isModalOpen
                            }

                            history={
                                complaintHistory
                            }

                            onClose={() => {

                                setIsModalOpen(false);

                                setSelectedComplaint(null);

                                setComplaintHistory([]);

                            }}

                            onStatusUpdated={async () => {

                                await loadComplaints();

                                if (
                                    selectedComplaint
                                ) {

                                    await loadComplaintHistory(
                                        selectedComplaint._id
                                    );

                                }

                            }}

                        />

                    )

                }

            </div>

        </DashboardLayout>

    );

}

export default FacultyDashboard;