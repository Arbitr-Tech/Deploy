import { fetchWithAuth } from './commonService';
import { API_URL } from './config';

export const login = async (formData) => {
    const response = await fetch(`${API_URL}/api/v1/auth/login/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message)
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access_token);
    console.log(data)
    return data;
};

export const logout = async () => {
    try {
        const data = await fetchWithAuth("/api/v1/auth/logout/", {
            method: "POST"
        });
        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка отправки письма:", error);
        throw error;
    }
};

export const passwordReset = async (formData) => {
    try {
        const data = await fetchWithAuth("/api/v1/auth/password-recovery/", {
            method: "POST",
            body: JSON.stringify(formData),
        });
        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка отправки письма:", error);
        throw error;
    }
};

export const passwordRecovery = async (token, formData) => {
    try {
        const data = await fetchWithAuth(`/api/v1/auth/reset-password/?token=${token}`, {
            method: "POST",
            body: JSON.stringify(formData),
        });
        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка отправки письма:", error);
        throw error;
    }
};
