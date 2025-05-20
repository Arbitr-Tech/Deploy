import { fetchWithAuth } from './commonService';

export const addTrailer = async (formData) => {
    try {
        const data = await fetchWithAuth("/api/v1/trailers/", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка создания прицепа:", error.message);
        throw error;
    }
};

export const getTrailerByProfile = async (pageNumber) => {
    try {
        const data = await fetchWithAuth(`/api/v1/trailers/?pageNumber=${pageNumber}&pageSize=5`, {
            method: "GET"
        });

        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка получения прицепов:", error.message);
        throw error;
    }
};

export const getDetailsTrailer = async (trailerId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/trailers/${trailerId}/`, {
            method: "GET"
        });

        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка получения деталей прицепа:", error.message);
        throw error;
    }
};

export const updateTrailer = async (trailerId, formData) => {
    try {
        const data = await fetchWithAuth(`/api/v1/trailers/${trailerId}/`, {
            method: "PATCH",
            body: JSON.stringify(formData),
        });

        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка обновления прицепа:", error.message);
        throw error;
    }
};

export const deleteTrailer = async (trailerId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/trailers/${trailerId}/`, {
            method: "DELETE"
        });

        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка удаления прицепа:", error.message);
        throw error;
    }
};

export const getTrailerForTransport = async () => {
    try {
        const data = await fetchWithAuth("/api/v1/trailers/list/", {
            method: "GET"
        });

        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка получения прицепов для транспорта:", error.message);
        throw error;
    }
};
