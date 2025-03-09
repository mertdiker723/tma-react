"use server";

import axios from "axios";

export async function submitForm(_prevState: unknown, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const res = await axios.post("/user/login", {
            email,
            password
        });
        const { user, token, message } = res?.data || {};

        return { message: message, data: user, token, success: true };
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
