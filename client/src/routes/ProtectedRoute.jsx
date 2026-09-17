import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {

    const { user, loading } = useAuth();

    // Show loading while checking authentication
    if (loading) {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px"
                }}
            >
                Loading...
            </div>
        );
    }

    // User not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User role not allowed
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;