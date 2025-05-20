import { fetchWithAuth } from './commonService';

export const addRewiew = async (profileId, formData) => {
    try {
        const data = await fetchWithAuth(`/api/v1/reviews/profile/${profileId}/`, {
            method: "POST",
            body: JSON.stringify(formData),
        });

        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка создания отзыва:", error.message);
        throw error;
    }
};

export const getReviews = async (profileId, reviewType, pageNumber) => {
    try {
        const data = await fetchWithAuth(`/api/v1/reviews/profile/${profileId}/?reviewType=${reviewType}&pageNumber=${pageNumber}&pageSize=5`, { method: "GET" });
        return data;
    } catch (error) {
        console.error("Ошибка полученя отзывов:", error);
        throw error;
    }
};

export const getReviewById = async (reviewId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/reviews/${reviewId}/`, { method: "GET" });
        return data;
    } catch (error) {
        console.error("Ошибка получения деталей отзыва:", error);
        throw error;
    }
};

export const editReview = async (reviewId, formData) => {
    try {
        const data = await fetchWithAuth(`/api/v1/reviews/${reviewId}/`,
            {
                method: "PATCH",
                body: JSON.stringify(formData),
            });
        return data;
    } catch (error) {
        console.error("Ошибка отправки изменений отзыва:", error);
        throw error;
    }
};


export const delReview = async (reviewId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/reviews/${reviewId}/`, { method: "DELETE" });
        return data;
    } catch (error) {
        console.error("Ошибка удаления отзыва:", error);
        throw error;
    }
};