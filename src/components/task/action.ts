"use server";

import axios from "axios";

export async function submitForm(_prevState: unknown, formData: FormData) {

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
        const { task } = res?.data || {};
        return { data: task, success: true };
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
