import { useEffect, useState } from "react";

import {
    getProfile,
    updateProfile
} from "../../services/profileService";

function EditProfile() {

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [preview, setPreview] = useState("");

    const [formData, setFormData] = useState({

        fullName: "",

        phone: "",

        department: "",

        enrollmentNo: "",

        profileImage: null

    });

    useEffect(() => {

        loadProfile();

    }, []);

    // =====================================
    // Load Profile
    // =====================================

    const loadProfile = async () => {

        try {

            const response = await getProfile();

            const user = response.data;

            setFormData({

                fullName: user.fullName || "",

                phone: user.phone || "",

                department: user.department || "",

                enrollmentNo: user.enrollmentNo || "",

                profileImage: null

            });

            if (user.profileImage) {

                setPreview(

                    `${import.meta.env.VITE_API_URL}/uploads/${user.profileImage}`

                );

            }

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    // =====================================
    // Handle Text Input
    // =====================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    // =====================================
    // Handle Image
    // =====================================

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData({

            ...formData,

            profileImage: file

        });

        setPreview(URL.createObjectURL(file));

    };

    // =====================================
    // Save Profile
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            const data = new FormData();

            data.append("fullName", formData.fullName);

            data.append("phone", formData.phone);

            data.append("department", formData.department);

            data.append("enrollmentNo", formData.enrollmentNo);

            if (formData.profileImage) {

                data.append(

                    "profileImage",

                    formData.profileImage

                );

            }

            const response = await updateProfile(data);

alert(response.message);

await loadProfile();

        }

        catch (error) {

    console.log("========== ERROR ==========");

    console.log(error);

    console.log(error.response);

    console.log(error.response?.data);

    console.log(error.response?.status);

    alert("Profile Update Failed");

}

        finally {

            setSaving(false);

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div
            style={{
                maxWidth: "600px",
                margin: "30px auto",
                background: "#fff",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
            }}
        >

            <h2
                style={{
                    marginBottom: "25px"
                }}
            >
                Edit Profile
            </h2>

            <form onSubmit={handleSubmit}>

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "25px"
                    }}
                >

                    <img

                        src={
                            preview ||
                            "https://via.placeholder.com/150"
                        }

                        alt="Profile"

                        style={{
                            width: "140px",
                            height: "140px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "3px solid #2563eb"
                        }}

                    />

                    <br /><br />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                    />

                </div>

                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Department"
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="enrollmentNo"
                    value={formData.enrollmentNo}
                    onChange={handleChange}
                    placeholder="Enrollment Number"
                    style={inputStyle}
                />

                <button
                    type="submit"
                    disabled={saving}
                    style={buttonStyle}
                >
                    {
                        saving
                            ? "Saving..."
                            : "Save Changes"
                    }
                </button>

            </form>

        </div>

    );

}

const inputStyle = {

    width: "100%",

    padding: "12px",

    marginBottom: "15px",

    borderRadius: "8px",

    border: "1px solid #ccc",

    fontSize: "15px"

};

const buttonStyle = {

    width: "100%",

    padding: "12px",

    background: "#2563eb",

    color: "#fff",

    border: "none",

    borderRadius: "8px",

    fontSize: "16px",

    fontWeight: "bold",

    cursor: "pointer"

};

export default EditProfile;