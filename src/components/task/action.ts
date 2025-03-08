"use server";

import axios from "axios";

export async function submitForm(prevState: unknown, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
        const res = await axios.post("/task", {
            title,
            description,
            status: false,
        });

        return { data: res?.data?.data, success: true };
    } catch {
        return { message: "There was an error submitting the form!", data: null, success: false };
    }
}
