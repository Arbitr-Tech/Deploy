import { makeAutoObservable } from "mobx";
import { getCargoByCategory, getCargoByFiltres, getCargoFromCarrier } from "../api/cargoService";
import { getCargoListOfLatest } from "../api/commonService";

class ListStore {
    cargoLists = {
        INTERNAL: [],
        EXTERNAL: [],
        HISTORY: [],
        FILTERS: [],
        LATEST: [],
        ACTIVE: [],
        WAITING: []
    };

    pages = {
        INTERNAL: { current: 1, total: 1 },
        EXTERNAL: { current: 1, total: 1 },
        HISTORY: { current: 1, total: 1 },
        FILTERS: { current: 1, total: 1 },
        ACTIVE: { current: 1, total: 1 },
        WAITING: { current: 1, total: 1 }
    };

    constructor() {
        makeAutoObservable(this);
    }

    async fetchCargoList(category, pageNumber) {
        try {
            const dataCargo = await getCargoByCategory(category, pageNumber);
            this.cargoLists[category] = dataCargo.content;
            this.pages[category] = {
                current: dataCargo.pageNumber,
                total: dataCargo.totalPages,
            };
        } catch (error) {
            console.error("Ошибка при получении списка грузов:", error);
        }
    }

    async fetchCargoListFromCarrier(category, pageNumber) {
        try {
            const dataCargo = await getCargoFromCarrier(category, pageNumber);
            this.cargoLists[category] = dataCargo.content;
            this.pages[category] = {
                current: dataCargo.pageNumber,
                total: dataCargo.totalPages,
            };
        } catch (error) {
            console.error("Ошибка при получении списка грузов:", error);
        }
    };

    async fetchCargoListByFilters(formData, pageNumber) {
        try {
            const dataCargo = await getCargoByFiltres(formData, pageNumber);
            this.cargoLists['FILTERS'] = dataCargo.content;
            this.pages['FILTERS'] = {
                current: dataCargo.pageNumber,
                total: dataCargo.totalPages,
            };
        } catch (error) {
            console.error("Ошибка при получении списка грузов:", error);
        }
    }

    async fetchCargoListOfLatest() {
        try {
            const dataCargo = await getCargoListOfLatest();
            this.cargoLists['LATEST'] = dataCargo;
        } catch (error) {
            console.error("Ошибка при получении списка грузов:", error);
        }
    }

    resetLatestCargo() {
        this.cargoLists = {
            INTERNAL: [],
            EXTERNAL: [],
            HISTORY: [],
            FILTERS: [],
            LATEST: [],
            ACTIVE: [],
            WAITING: []
        };

        this.pages = {
            INTERNAL: { current: 1, total: 1 },
            EXTERNAL: { current: 1, total: 1 },
            HISTORY: { current: 1, total: 1 },
            FILTERS: { current: 1, total: 1 },
            ACTIVE: { current: 1, total: 1 },
            WAITING: { current: 1, total: 1 }
        };
    }

    getCurrentPage(category) {
        return this.pages[category]?.current ?? 1;
    }

    setCurrentPage(category, page) {
        this.pages[category] = { ...this.pages[category], current: page };
    }

    getTotalPages(category) {
        return this.pages[category]?.total ?? 1;
    }
}

export const listStore = new ListStore();
