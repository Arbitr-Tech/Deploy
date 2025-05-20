import { fetchWithAuth } from './commonService';

export const getProfileData = async () => {
    try {
        const data = await fetchWithAuth("/api/v1/profile/", { method: "GET" });
        return data;
    } catch (error) {
        console.error("Ошибка полученя данных:", error);
        throw error;
    }
};

export const updateProfileData = async (updatedData) => {
    try {
        const data = await fetchWithAuth("/api/v1/profile/", {
            method: "PATCH",
            body: JSON.stringify(updatedData)
        })
        return data;
    } catch (error) {
        console.log("Ошибка обновления груза: ", error);
        throw error;
    }
};


export const getOtherProfileData = async (profileId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/profile/${profileId}/`, { method: "GET" });
        return data;
    } catch (error) {
        console.error("Ошибка полученя данных:", error);
        throw error;
    }
};
