import { jwtDecode } from "jwt-decode";

export const getToken = () => {
    const token = localStorage.getItem('token') || '';
    if (!token) return { token: null, id: null }

    try {
        const { id }: { id: string } = jwtDecode(token);
        return { token, id }
    } catch {
        return { token: null, id: null }
    }
}