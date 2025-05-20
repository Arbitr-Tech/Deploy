import { fetchWithAuth } from './commonService';

export const addAuto = async (formData) => {
    try {
        const data = await fetchWithAuth("/api/v1/transports/", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка создания транспорта:", error.message);
        throw error; 
    }
};

export const getTransportsByProfile = async (pageNumber) => {
    try {
        const data = await fetchWithAuth(`/api/v1/transports/?pageNumber=${pageNumber}&pageSize=5`, {
            method: "GET"
        })
        return data;
    } catch (error) {
        console.log("Ошибка получения грузов: ", error);
        throw error;
    }
};

export const getDetailsTransport = async (transportId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/transports/${transportId}/`, {
            method: "GET"
        })
        return data;
    } catch (error) {
        console.log("Ошибка получения деталей груза: ", error);
        throw error;
    }
};

export const updateAuto = async (transportId, formData) => {
    try {
        const data = await fetchWithAuth(`/api/v1/transports/${transportId}/`, {
            method: "PATCH",
            body: JSON.stringify(formData),
        });

        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка обновления транспорта:", error.message);
        throw error; 
    }
};


export const deleteTransport = async (transportId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/transports/${transportId}`, {
            method: "DELETE"
        })
        return data;
    } catch (error) {
        console.log("Ошибка получения деталей груза: ", error);
        throw error;
    }
};