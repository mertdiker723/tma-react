import { jwtDecode } from "jwt-decode";

export const getToken = () => {
    const token = localStorage.getItem('token') || '';
    if (!token) return { token: null, id: null, isAdmin: false, email: null }

    try {
        const { id, isAdmin, email }: { id: string, isAdmin: boolean, email: string } = jwtDecode(token);
        return { token, id, isAdmin, email }
    } catch {
        return { token: null, id: null, isAdmin: false, email: null }
    }
}