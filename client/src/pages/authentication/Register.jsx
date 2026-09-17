import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {

    const navigate = useNavigate();

    const { register } = useAuth();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        fullName: "",

        email: "",

        phone: "",

        department: "",

        enrollmentNo: "",

        password: "",

        confirmPassword: ""

    });

    // =====================================
    // Handle Input
    // =====================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    // =====================================
    // Register
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        setLoading(true);

        const payload = {

            fullName: formData.fullName,

            email: formData.email,

            phone: formData.phone,

            department: formData.department,

            enrollmentNo: formData.enrollmentNo,

            password: formData.password,

            role: "student"

        };

        const result = await register(payload);

        setLoading(false);

        if (!result.success) {

            alert(result.message);

            return;

        }

        switch (result.user.role) {

    case "student":
        navigate("/student/dashboard");
        break;

    case "faculty":
        navigate("/faculty/dashboard");
        break;

    case "admin":
        navigate("/admin/dashboard");
        break;

    default:
        navigate("/login");

}

    };

    return (

        <div

            style={{

                width: "450px",

                margin: "40px auto",

                padding: "30px",

                background: "#fff",

                borderRadius: "10px",

                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"

            }}

        >

            <h2

                style={{

                    textAlign: "center",

                    marginBottom: "25px"

                }}

            >

                Student Registration

            </h2>

            <form onSubmit={handleSubmit}>

                <input

                    type="text"

                    name="fullName"

                    placeholder="Full Name"

                    value={formData.fullName}

                    onChange={handleChange}

                    required

                    style={inputStyle}

                />

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={formData.email}

                    onChange={handleChange}

                    required

                    style={inputStyle}

                />

                <input

                    type="text"

                    name="phone"

                    placeholder="Phone Number"

                    value={formData.phone}

                    onChange={handleChange}

                    required

                    style={inputStyle}

                />

                <select

                    name="department"

                    value={formData.department}

                    onChange={handleChange}

                    required

                    style={inputStyle}

                >

                    <option value="">Select Department</option>

                    <option value="Computer Engineering">Computer Engineering</option>

                    <option value="Information Technology">Information Technology</option>

                    <option value="Civil Engineering">Civil Engineering</option>

                    <option value="Mechanical Engineering">Mechanical Engineering</option>

                    <option value="Electrical Engineering">Electrical Engineering</option>

                    <option value="Electronics & Communication">Electronics & Communication</option>

                </select>

                <input

                    type="text"

                    name="enrollmentNo"

                    placeholder="Enrollment Number"

                    value={formData.enrollmentNo}

                    onChange={handleChange}

                    required

                    style={inputStyle}

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    value={formData.password}

                    onChange={handleChange}

                    required

                    style={inputStyle}

                />

                <input

                    type="password"

                    name="confirmPassword"

                    placeholder="Confirm Password"

                    value={formData.confirmPassword}

                    onChange={handleChange}

                    required

                    style={inputStyle}

                />

                <button

                    type="submit"

                    disabled={loading}

                    style={buttonStyle}

                >

                    {

                        loading

                            ? "Registering..."

                            : "Register"

                    }

                </button>

            </form>

            <p

                style={{

                    textAlign: "center",

                    marginTop: "20px"

                }}

            >

                Already have an account?

                {" "}

                <Link to="/login">

                    Login

                </Link>

            </p>

        </div>

    );

}

const inputStyle = {

    width: "100%",

    padding: "12px",

    marginBottom: "15px",

    borderRadius: "6px",

    border: "1px solid #ccc",

    fontSize: "15px"

};

const buttonStyle = {

    width: "100%",

    padding: "12px",

    background: "#2563eb",

    color: "#fff",

    border: "none",

    borderRadius: "6px",

    fontSize: "16px",

    fontWeight: "bold",

    cursor: "pointer"

};

export default Register;