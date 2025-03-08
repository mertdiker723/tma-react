"use server";

import axios from "axios";

export async function submitForm(prevState: unknown, formData: FormData) {
    const id = formData.get("id") as string | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") === "on";

    try {
        let res;
        if (id) {
            res = await axios.put(`/task/${id}`, {
                title,
                description,
                status
            });
        } else {
            res = await axios.post("/task", {
                title,
                description,
                status: !id ? false : status,
            });
        }
        return { data: res?.data?.data, success: true };
    } catch {
        return { message: "There was an error submitting the form!", data: null, success: false };
    }
}
