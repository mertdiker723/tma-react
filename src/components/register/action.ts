"use server";

import axios from "axios";

export async function submitForm(_prevState: unknown, formData: FormData) {
    const userName = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const status = formData.get("status") === "on";

    try {
        const res = await axios.post("/user/register", {
            userName,
            email,
            password,
            isAdmin: status
        });

        const { user, token, message } = res?.data || {};

        return { message, data: user, token: token, success: true };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { data } = error?.response || {};
            const { message } = data || {};
            return { message: message, token: null, data: null, success: false };
        } else {
            return { message: "An error happened!", token: null, data: null, success: false };
        }
    }
}
