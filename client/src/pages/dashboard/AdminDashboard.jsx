import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import ComplaintTable from "../../components/Table/ComplaintTable";
import ComplaintDetailsModal from "../../components/Modal/ComplaintDetailsModal";
import EditComplaintModal from "../../components/Modal/EditComplaintModal";

import {
    getDashboardStatistics,
    getAllComplaints,
    assignComplaint,
    getComplaintHistory
} from "../../services/complaintService";

import {
    getFacultyUsers
} from "../../services/userService";

function AdminDashboard() {

    // ==========================================
    // Dashboard Statistics
    // ==========================================
    const [stats, setStats] = useState({
        totalComplaints: 0,
        pending: 0,
        assigned: 0,
        inProgress: 0,
        resolved: 0,
        closed: 0
    });

    // ==========================================
    // Complaints
    // ==========================================
    const [complaints, setComplaints] = useState([]);

    // ==========================================
    // Faculty List
    // ==========================================
    const [facultyList, setFacultyList] = useState([]);

    // ==========================================
    // Selected Faculty
    // ==========================================
    const [selectedFaculty, setSelectedFaculty] = useState("");

    // ==========================================
    // Complaint History
    // ==========================================
    const [complaintHistory, setComplaintHistory] = useState([]);

    // ==========================================
    // Assign Loading
    // ==========================================
    const [assignLoading, setAssignLoading] = useState(false);

    // ==========================================
    // Search
    // ==========================================
    const [search, setSearch] = useState("");

    // ==========================================
    // Filters
    // ==========================================
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");

    // ==========================================
    // View Complaint Modal
    // ==========================================
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ==========================================
    // Edit Complaint Modal
    // ==========================================
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // ==========================================
    // Initial Load
    // ==========================================
    useEffect(() => {

        loadDashboard();
        loadFaculty();

    }, []);

    // ==========================================
    // Load Dashboard
    // ==========================================
    const loadDashboard = async () => {

        try {

            const dashboardResponse = await getDashboardStatistics();

            setStats(dashboardResponse.data);

            const complaintResponse = await getAllComplaints();

            setComplaints(complaintResponse.data);

        }

        catch (error) {

            console.error("Dashboard Error:", error);

        }

    };

    // ==========================================
    // Load Faculty List
    // ==========================================
    const loadFaculty = async () => {

        try {

            const response = await getFacultyUsers();

            setFacultyList(response.data);

        }

        catch (error) {

            console.error("Faculty Load Error:", error);

        }

    };

    // ==========================================
    // Load Complaint History
    // ==========================================
    const loadComplaintHistory = async (complaintId) => {

        try {

            const response = await getComplaintHistory(complaintId);

            setComplaintHistory(response.data);

        }

        catch (error) {

            console.error("History Load Error:", error);

            setComplaintHistory([]);

        }

    };

    // ==========================================
    // Assign Complaint To Faculty
    // ==========================================
    const handleAssignFaculty = async () => {

        if (!selectedFaculty) {

            alert("Please select a faculty.");

            return;

        }

        try {

            setAssignLoading(true);

            const response = await assignComplaint(
                selectedComplaint._id,
                selectedFaculty
            );

            alert(
                response.message ||
                "Faculty Assigned Successfully"
            );

            await loadDashboard();

            setIsModalOpen(false);

            setSelectedComplaint(null);
            setSelectedFaculty("");

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Assignment Failed"
            );

        }

        finally {

            setAssignLoading(false);

        }

    };

    // ==========================================
    // Search + Filter
    // ==========================================
    const filteredComplaints = complaints.filter((complaint) => {

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

        const matchesPriority =

            priorityFilter === "All"
                ? true
                : complaint.priority === priorityFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );

    });

    return (

        <DashboardLayout>

            <div className="modern-dashboard">

                {/* ========================================== */}
                {/* Header */}
                {/* ========================================== */}

                <div className="dashboard-hero">

                    <div>

                        <span className="dashboard-eyebrow">
                            ADMIN CONTROL CENTER
                        </span>

                        <h1>
                            Admin Dashboard
                        </h1>

                        <p>
                            Monitor, manage and assign campus complaints
                            from one centralized workspace.
                        </p>

                    </div>

                    <div className="hero-icon">
                        🛡️
                    </div>

                </div>


                {/* ========================================== */}
                {/* Statistics */}
                {/* ========================================== */}

                <div className="stats-grid">

                    <div className="stat-card-wrapper blue">
                        <DashboardCard
                            title="Total Complaints"
                            value={stats.totalComplaints}
                            color="#2563eb"
                        />
                    </div>

                    <div className="stat-card-wrapper orange">
                        <DashboardCard
                            title="Pending"
                            value={stats.pending}
                            color="#f59e0b"
                        />
                    </div>

                    <div className="stat-card-wrapper purple">
                        <DashboardCard
                            title="Assigned"
                            value={stats.assigned}
                            color="#8b5cf6"
                        />
                    </div>

                    <div className="stat-card-wrapper cyan">
                        <DashboardCard
                            title="In Progress"
                            value={stats.inProgress}
                            color="#06b6d4"
                        />
                    </div>

                    <div className="stat-card-wrapper green">
                        <DashboardCard
                            title="Resolved"
                            value={stats.resolved}
                            color="#10b981"
                        />
                    </div>

                    <div className="stat-card-wrapper red">
                        <DashboardCard
                            title="Closed"
                            value={stats.closed}
                            color="#ef4444"
                        />
                    </div>

                </div>


                {/* ========================================== */}
                {/* Complaints Section */}
                {/* ========================================== */}

                <div className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <span className="section-label">
                                COMPLAINT MANAGEMENT
                            </span>

                            <h2>
                                Recent Complaints
                            </h2>

                            <p>
                                Search, filter and manage submitted campus incidents.
                            </p>

                        </div>

                        <div className="complaint-count">

                            {filteredComplaints.length} Results

                        </div>

                    </div>


                    {/* ========================================== */}
                    {/* Search + Filters */}
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

                            <option value="Pending">
                                Pending
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


                        <select
                            value={priorityFilter}
                            onChange={(e) =>
                                setPriorityFilter(e.target.value)
                            }
                        >

                            <option value="All">
                                All Priority
                            </option>

                            <option value="High">
                                High
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="Low">
                                Low
                            </option>

                        </select>

                    </div>


                    {/* ========================================== */}
                    {/* Complaint Table */}
                    {/* ========================================== */}

                    <div className="table-card">

                        <ComplaintTable

                            complaints={filteredComplaints}

                            onView={async (complaint) => {

                                setSelectedComplaint(complaint);

                                if (complaint.recommendedFaculty?._id) {

                                    setSelectedFaculty(
                                        complaint.recommendedFaculty._id
                                    );

                                }

                                else {

                                    setSelectedFaculty("");

                                }

                                await loadComplaintHistory(
                                    complaint._id
                                );

                                setIsModalOpen(true);

                            }}

                        />

                    </div>

                </div>


                {/* ========================================== */}
                {/* Complaint Details Modal */}
                {/* ========================================== */}

                {

                    selectedComplaint && (

                        <ComplaintDetailsModal

                            complaint={selectedComplaint}

                            isOpen={isModalOpen}

                            onClose={() => {

                                setIsModalOpen(false);

                                setSelectedComplaint(null);

                                setSelectedFaculty("");

                                setComplaintHistory([]);

                            }}

                            facultyList={facultyList}

                            selectedFaculty={selectedFaculty}

                            setSelectedFaculty={setSelectedFaculty}

                            onAssign={handleAssignFaculty}

                            assignLoading={assignLoading}

                            history={complaintHistory}

                        />

                    )

                }


                {/* ========================================== */}
                {/* Edit Complaint Modal */}
                {/* ========================================== */}

                {

                    selectedComplaint && (

                        <EditComplaintModal

                            complaint={selectedComplaint}

                            isOpen={isEditModalOpen}

                            onClose={() => {

                                setIsEditModalOpen(false);

                                setSelectedComplaint(null);

                            }}

                        />

                    )

                }

            </div>

        </DashboardLayout>

    );

}

export default AdminDashboard;