import API from "../api/axios";

// ======================================
// Dashboard Statistics (Admin)
// ======================================
export const getDashboardStatistics = async () => {

    const response = await API.get("/complaints/dashboard");

    return response.data;

};

// ======================================
// Get All Complaints (Admin)
// ======================================
export const getAllComplaints = async () => {

    const response = await API.get("/complaints");

    return response.data;

};

// ======================================
// Create Complaint (Student)
// ======================================
export const createComplaint = async (formData) => {

    const response = await API.post(
        "/complaints/create",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;

};

// ======================================
// Get My Complaints (Student)
// ======================================
export const getMyComplaints = async () => {

    const response = await API.get("/complaints/my");

    return response.data;

};

// ======================================
// Get Complaint By ID (Student)
// ======================================
export const getComplaintById = async (id) => {

    const response = await API.get(`/complaints/${id}`);

    return response.data;

};

// ======================================
// Update Complaint (Student)
// ======================================
export const updateComplaint = async (id, formData) => {

    const response = await API.put(
        `/complaints/${id}`,
        formData
    );

    return response.data;

};

// ======================================
// Delete Complaint (Student)
// ======================================
export const deleteComplaint = async (id) => {

    const response = await API.delete(
        `/complaints/${id}`
    );

    return response.data;

};

// ======================================
// Assign Complaint To Faculty (Admin)
// ======================================
export const assignComplaint = async (complaintId, facultyId) => {

    const response = await API.patch(
        `/complaints/${complaintId}/assign`,
        {
            facultyId
        }
    );

    return response.data;

};

// ======================================
// Get Assigned Complaints (Faculty)
// ======================================
export const getAssignedComplaints = async () => {

    const response = await API.get(
        "/complaints/assigned"
    );

    return response.data;

};

// ======================================
// Get Complaint History
// ======================================
export const getComplaintHistory = async (complaintId) => {

    const response = await API.get(
        `/complaints/${complaintId}/history`
    );

    return response.data;

};

// ======================================
// Update Complaint Progress (Faculty)
// ======================================
export const updateComplaintProgress = async (
    complaintId,
    status
) => {

    const response = await API.patch(

        `/complaints/${complaintId}/progress`,

        {
            status
        }

    );

    return response.data;

};