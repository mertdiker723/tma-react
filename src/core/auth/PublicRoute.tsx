import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router";

interface PublicRouteProps {
    Component: ComponentType;
}

const PublicRoute = ({ Component }: PublicRouteProps) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, [navigate, token]);

    return !token ? <Component /> : null;
};

export default PublicRoute;
