"use server";

import axios from "axios";

export async function submitForm(_prevState: unknown, formData: FormData) {
    const userName = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const res = await axios.post("/user", {
            userName,
            email,
            password
        });

        return { message: "User created", data: res?.data?.data, success: true };
    } catch {
        return { message: "There was an error submitting the form!", data: null, success: false };
    }
}
