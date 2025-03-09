import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router";

interface ProtectedRouteProps {
    Component: ComponentType;
}

const ProtectedRoute = ({ Component }: ProtectedRouteProps) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [navigate, token]);

    return token ? <Component /> : null;
};

export default ProtectedRoute;
