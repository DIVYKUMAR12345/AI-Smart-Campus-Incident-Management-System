import { createContext, useContext, useEffect, useState } from "react";
import {

    loginUser,

    registerUser,

    getProfile

} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // =====================================
    // Load Logged In User
    // =====================================
    useEffect(() => {

        const loadUser = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await getProfile();

                setUser(response.data);

            } catch (error) {

                console.error(error);

                localStorage.removeItem("token");
                setUser(null);

            }

            setLoading(false);

        };

        loadUser();

    }, []);

    // =====================================
// Login
// =====================================
const login = async (credentials) => {

    try {

        // Login API
        const loginResponse = await loginUser(credentials);

        // Save JWT Token
        localStorage.setItem("token", loginResponse.token);

        // Fetch Logged-in User
        const profileResponse = await getProfile();

        setUser(profileResponse.data);

        return {
            success: true,
            user: profileResponse.data
        };

    } catch (error) {

        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Login Failed"
        };

    }

};

    // =====================================
// Register
// =====================================

const register = async (userData) => {

    try {

        const response = await registerUser(userData);

        // Save JWT Token
        localStorage.setItem("token", response.token);

        // Save Logged-in User
        setUser(response.user);

        return {

            success: true,

            user: response.user,

            message: response.message

        };

    }

    catch (error) {

        return {

            success: false,

            message:

                error.response?.data?.message ||

                "Registration Failed"

        };

    }

};

    // =====================================
    // Logout
    // =====================================
    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

    };

    return (

        <AuthContext.Provider

    value={{

        user,

        loading,

        login,

        register,

        logout,

        isAuthenticated: !!user

    }}

>

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);