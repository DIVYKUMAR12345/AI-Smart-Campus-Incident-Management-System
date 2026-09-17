import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProfile } from "../../services/profileService";

function MyProfile() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await getProfile();

            setProfile(response.data);

        }

        catch (error) {

            console.error("Profile Load Error:", error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2 style={{ padding: "30px" }}>Loading Profile...</h2>;

    }

    if (!profile) {

        return <h2 style={{ padding: "30px" }}>Profile Not Found</h2>;

    }

    return (

        <div
            style={{
                maxWidth: "800px",
                margin: "30px auto",
                background: "#fff",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
        >

            <h2 style={{ marginBottom: "25px" }}>
                My Profile
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "30px",
                    alignItems: "center",
                    marginBottom: "30px"
                }}
            >

                <img

                    src={
                        profile.profileImage
                            ? `http://localhost:5000/uploads/${profile.profileImage}`
                            : "https://via.placeholder.com/150"
                    }

                    alt="Profile"

                    style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "3px solid #2563eb"
                    }}

                />

                <div>

                    <h2>{profile.fullName}</h2>

                    <p>{profile.email}</p>

                    <p>{profile.role}</p>

                </div>

            </div>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <tbody>

                    <tr>
                        <td><strong>Phone</strong></td>
                        <td>{profile.phone}</td>
                    </tr>

                    <tr>
                        <td><strong>Department</strong></td>
                        <td>{profile.department}</td>
                    </tr>

                    <tr>
                        <td><strong>Enrollment Number</strong></td>
                        <td>{profile.enrollmentNo}</td>
                    </tr>

                    <tr>
                        <td><strong>Role</strong></td>
                        <td>{profile.role}</td>
                    </tr>

                </tbody>

            </table>

            <div
                style={{
                    marginTop: "30px",
                    display: "flex",
                    gap: "15px"
                }}
            >

                <Link to="/student/profile/edit">

                    <button>

                        Edit Profile

                    </button>

                </Link>

                <Link to="/student/change-password">

                    <button>

                        Change Password

                    </button>

                </Link>

            </div>

        </div>

    );

}

export default MyProfile;