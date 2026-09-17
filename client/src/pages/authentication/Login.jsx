import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    // =====================================
    // Handle Input Change
    // =====================================
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // =====================================
    // Handle Login
    // =====================================
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        const result = await login(formData);

        setLoading(false);

        if (!result.success) {
            alert(result.message);
            return;
        }

        const role = result.user.role;

        if (role === "student") {
            navigate("/student/dashboard");
        }

        else if (role === "faculty") {
            navigate("/faculty/dashboard");
        }

        else if (role === "admin") {
            navigate("/admin/dashboard");
        }

    };

    return (

        <div
            style={{
                width: "400px",
                margin: "80px auto",
                padding: "30px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                background: "#ffffff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
        >

            <h2
                style={{
                    textAlign: "center",
                    marginBottom: "25px"
                }}
            >
                SCIMS Login
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        borderRadius: "6px",
                        border: "1px solid #ccc"
                    }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "20px",
                        borderRadius: "6px",
                        border: "1px solid #ccc"
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "bold"
                    }}
                >
                    {loading ? "Logging In..." : "Login"}
                </button>

            </form>

        </div>

    );

}

export default Login;