import { fetchWithAuth } from './commonService';

export const addCargo = async (formData) => {
    try {
        const data = await fetchWithAuth("/api/v1/cargos/", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка создания груза:", error.message);
        throw error;
    }
};


export const getDetailsCargo = async (cargoId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/${cargoId}/`, { method: "GET" });
        return data;
    } catch (error) {
        console.log("Ошибка получения деталей груза: ", error);
        throw error;
    }
};

export const updateCargo = async (cargoId, updatedData) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/${cargoId}/`, {
            method: "PATCH",
            body: JSON.stringify(updatedData)
        })
        return data;
    } catch (error) {
        console.log("Ошибка обновления груза: ", error);
        throw error;
    }
};

export const publishCargo = async (cargoId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/${cargoId}/publish/`, {
            method: "PATCH"
        });
        return data;
    } catch (error) {
        console.log("Ошибка обновления статуса груза: ", error);
        throw error;
    }
};

export const unpublishCargo = async (cargoId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/${cargoId}/draft/`, {
            method: "PATCH"
        });
        return data;
    } catch (error) {
        console.log("Ошибка обновления статуса груза: ", error);
        throw error;
    }
};

export const deleteCargo = async (cargoId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/${cargoId}/`, {
            method: "DELETE"
        })
        return data;
    } catch (error) {
        console.log("Ошибка удаления груза: ", error);
        throw error;
    }
};

export const getCargoByFiltres = async (formData, pageNumber) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/search/?pageNumber=${pageNumber}&pageSize=5`, {
            method: "POST",
            body: JSON.stringify(formData)
        })
        return data;
    } catch (error) {
        console.log("Ошибка получения списка по фильтрам: ", error);
        throw error;
    }
};

export const getCargoByCategory = async (category, pageNumber) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/general/?cargoCategory=${category}&pageNumber=${pageNumber}&pageSize=5`, {
            method: "GET"
        })
        return data;
    } catch (error) {
        console.log("Ошибка получения общего списка: ", error);
        throw error;
    }
};

export const createResponse = async (cargoId, transportId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/${cargoId}/transport/${transportId}/response/`, {
            method: "POST"
        })
        return data;
    } catch (error) {
        console.log("Ошибка создания отклика: ", error);
        throw error;
    }
};

export const getCargoFromCarrier = async (category, pageNumber) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/carrier/general/?cargoCategory=${category}&pageNumber=${pageNumber}&pageSize=5`, {
            method: "GET"
        })
        return data;
    } catch (error) {
        console.log("Ошибка получения списка грузов для перевозчика: ", error);
        throw error;
    }
};

export const cancelResponseByCarrier = async (cargoId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/${cargoId}/response/cancel/`, {
            method: "POST"
        })
        return data;
    } catch (error) {
        console.log("Ошибка отмены отклика: ", error);
        throw error;
    }
};

export const cancelOrder = async (cargoId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/${cargoId}/cancel/`, {
            method: "POST"
        })
        return data;
    } catch (error) {
        console.log("Ошибка отмены заказа: ", error);
        throw error;
    }
};

export const choiceCarrier = async (cargoId, responseId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/${cargoId}/response/${responseId}/accept/`, {
            method: "POST"
        })
        return data;
    } catch (error) {
        console.log("Ошибка принятия отклика: ", error);
        throw error;
    }
};

export const endResponseByCarrier = async (cargoId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/${cargoId}/endExecution/`, {
            method: "POST"
        })
        return data;
    } catch (error) {
        console.log("Ошибка завершения отклика: ", error);
        throw error;
    }
};

export const endResponseByCustomer = async (cargoId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/${cargoId}/endExecution/confirm/`, {
            method: "POST"
        })
        return data;
    } catch (error) {
        console.log("Ошибка завершения отклика: ", error);
        throw error;
    }
};