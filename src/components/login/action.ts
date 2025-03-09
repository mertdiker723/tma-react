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

        return { message: res?.data?.message, data: res?.data?.data, token: res?.data.token, success: true };
    } catch {
        return { message: "There was an error submitting the form!", token: null, data: null, success: false };
    }
}
