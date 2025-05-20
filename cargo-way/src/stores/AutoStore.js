import { makeAutoObservable } from "mobx";
import { getTrailerByProfile, getTrailerForTransport } from "../api/trailerService";
import { getTransportsByProfile } from "../api/autoService";
import { getDriversForTransport } from "../api/driverService";

class AutoStore {

    autoEmbeddedTrailer = false;
    autoAdditionalTrailers = false;

    autoFormData = {
        driverId: "",
        brand: "",
        model: "",
        manufactureYear: 0,
        transportNumber: "",
        embeddedTrailerDetails: {
            liftingCapacity: 0,
            bodyType: "",
            loadType: "",
            unloadType: "",
            length: 0,
            width: 0,
            height: 0,
            volume: 0
        },
        trailersIds: [],
        // photos: []
    };

    transportList = [];
    page = { current: 1, total: 1 };

    originalTransportFormData = {};

    driversListForTransport = [];
    trailersListForTransport = [];

    constructor() {
        makeAutoObservable(this)
    };

    setFormData = (name, value) => {
        this.autoFormData = { ...this.autoFormData, [name]: value }
    }

    setNestedFormData = (formName, secondName, newData) => {
        this.autoFormData = {
            ...this.autoFormData,
            [formName]: {
                ...this.autoFormData[formName],
                [secondName]: newData
            }
        };
    };

    toggleAutoEmbeddedTrailer = (typePage) => {
        if (typePage === 'add') {
            this.autoEmbeddedTrailer = !this.autoEmbeddedTrailer;
        } else {
            if(this.autoEmbeddedTrailer) {
                this.autoFormData.embeddedTrailerDetails = {...this.originalTransportFormData.embeddedTrailerDetails};
                this.autoEmbeddedTrailer = false;
            } else {
                this.autoEmbeddedTrailer = true;
            };
        };
    };

    toggleAutoAdditionalTrailers = (typePage) => {
        if (typePage === 'add') {
            this.autoAdditionalTrailers = !this.autoAdditionalTrailers
        } else {
            if(this.autoAdditionalTrailers) {
                this.autoFormData.trailersIds = this.originalTransportFormData.trailersIds;
                this.autoAdditionalTrailers = false;
                console.log(this.autoFormData.trailersIds)
            } else {
                this.autoAdditionalTrailers = true;
            };
        };
    };

    getFormData = () => {
        let clonedForm = { ...this.autoFormData };
        if (!this.autoEmbeddedTrailer) {
            delete clonedForm['embeddedTrailerDetails'];
        }
        if (!this.autoAdditionalTrailers) {
            delete clonedForm['trailersIds'];
        }
        return clonedForm;
    };

    async fetchTransportList(pageNumber) {
        try {
            const dataTransport = await getTransportsByProfile(pageNumber);
            console.log(dataTransport.content);
            this.transportList = dataTransport.content;
            this.page = { current: dataTransport.pageNumber, total: dataTransport.totalPages };
        } catch (error) {
            console.error("Ошибка при получении списка грузов:", error);
        }
    };

    async fetchDriversListForTransport() {
        try {
            const dataDrivers = await getDriversForTransport();
            console.log(dataDrivers);
            this.driversListForTransport = dataDrivers;
        } catch (error) {
            console.error("Ошибка при получении списка водителей для транспорта:", error);
        }
    };

    async fetchTrailersListForTransport() {
        try {
            const dataTrailers = await getTrailerForTransport();
            console.log(dataTrailers);
            this.trailersListForTransport = dataTrailers;
        } catch (error) {
            console.error("Ошибка при получении списка прицепов для транспорта:", error);
        }
    };

    getCurrentPage() {
        return this.page?.current ?? 1;
    }

    setCurrentPage(page) {
        this.page = { ...this.page, current: page };
    }

    getTotalPages() {
        return this.page?.total ?? 1;
    }

    transformServerToClientData = (serverData) => {
        if (serverData.trailers?.length !== 0) {
            this.autoAdditionalTrailers = true;
        }
        if (serverData.embeddedTrailer && Object.keys(serverData.embeddedTrailer)?.length !== 0) {
            this.autoEmbeddedTrailer = true;
        }

        return {
            driverId: serverData.driver?.id || "",
            brand: serverData.brand || "",
            model: serverData.model || "",
            manufactureYear: serverData.manufactureYear || 0,
            transportNumber: serverData.transportNumber || "",
            embeddedTrailerDetails: {
                liftingCapacity: serverData.embeddedTrailer?.liftingCapacity || 0,
                bodyType: serverData.embeddedTrailer?.bodyType || "",
                loadType: serverData.embeddedTrailer?.loadType || "",
                unloadType: serverData.embeddedTrailer?.unloadType || "",
                length: serverData.embeddedTrailer?.length || 0,
                width: serverData.embeddedTrailer?.width || 0,
                height: serverData.embeddedTrailer?.height || 0,
                volume: serverData.embeddedTrailer?.volume || 0
            },
            trailersIds: serverData.trailers?.map(trailer => trailer.id) || [],
            // photos: serverData.photos || []
        };
    };

    setTransportFormDataFromServer = (data) => {
        this.autoFormData = this.transformServerToClientData(data);
        this.originalTransportFormData = this.autoFormData;
    }

    getUpdatedFields = () => {
        const updatedFields = {};

        for (const key in this.autoFormData) {
            if (JSON.stringify(this.autoFormData[key]) !== JSON.stringify(this.originalTransportFormData[key])) {
                updatedFields[key] = this.autoFormData[key];
            }
        }

        return updatedFields;
    }


    resetFormData = () => {
        this.autoFormData = {
            driverId: '',
            brand: "",
            model: "",
            manufactureYear: 0,
            transportNumber: "",
            embeddedTrailerDetails: {
                liftingCapacity: 0,
                bodyType: "",
                loadType: "",
                unloadType: "",
                length: 0,
                width: 0,
                height: 0,
                volume: 0
            },
            trailersIds: []
            // photos: []
        };
        this.autoEmbeddedTrailer = false;
        this.autoAdditionalTrailers = false;
    }
};

export const autoStore = new AutoStore();