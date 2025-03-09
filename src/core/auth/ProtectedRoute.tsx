import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
    Component: ComponentType;
}

const ProtectedRoute = ({ Component }: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || '';

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken && decodedToken.exp && decodedToken.exp < currentTime) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } catch {
                localStorage.removeItem("token");
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }, [navigate, token]);

    return token ? <Component /> : null;
};

export default ProtectedRoute;
