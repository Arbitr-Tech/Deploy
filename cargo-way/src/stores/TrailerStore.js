import { makeAutoObservable } from "mobx";
import { getTrailerByProfile } from "../api/trailerService";

class TrailerStore {
    trailerFormData = {
        name: "",
        trailerNumber: "",
        liftingCapacity: 0,
        bodyType: "",
        loadType: "",
        unloadType: "",
        length: 0,
        width: 0,
        height: 0,
        volume: 0
    };

    originalTrailerFormData = {};

    trailerList = [];

    page = { current: 1, total: 1 };

    constructor() {
        makeAutoObservable(this)
    };

    setFormData = (name, value) => {
        this.trailerFormData = { ...this.trailerFormData, [name]: value }
    }

    async fetchTrailerList(pageNumber) {
        try {
            const dataTrailers = await getTrailerByProfile(pageNumber);
            this.trailerList = dataTrailers.content;
            this.page = { current: dataTrailers.pageNumber, total: dataTrailers.totalPages };
        } catch (error) {
            console.error("Ошибка при получении списка прицепов:", error);
        }
    }

    getCurrentPage() {
        return this.page?.current ?? 1;
    }

    setCurrentPage(page) {
        this.page = { ...this.page, current: page };
    }

    getTotalPages() {
        return this.page?.total ?? 1;
    }

    setTrailerFormDataFromServer = (data) => {
        this.originalTrailerFormData = data;
        this.trailerFormData = { ...data };
    }

    getUpdatedFields = () => {
        const updatedFields = {};

        for (const key in this.trailerFormData) {
            if (JSON.stringify(this.trailerFormData[key]) !== JSON.stringify(this.originalTrailerFormData[key])) {
                updatedFields[key] = this.trailerFormData[key];
            }
        }

        return updatedFields;
    }

    resetFormData = () => {
        this.trailerFormData = {
            name: "",
            trailerNumber: "",
            liftingCapacity: 0,
            bodyType: "",
            loadType: "",
            unloadType: "",
            length: 0,
            width: 0,
            height: 0,
            volume: 0
        };
    }
}

export const trailerStore = new TrailerStore();