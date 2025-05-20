import { makeAutoObservable } from "mobx";

class CargoStore {
    cargoFormData = {
        name: "",
        description: "",
        weight: 0,
        volume: 0,
        dimensions: {
            length: 0,
            width: 0,
            height: 0
        },
        route: {
            from: "",
            to: ""
        },
        price: 0.0,
        typePay: "",
        readyDate: "",
        deliveryDate: "",
        bodyType: "",
        loadType: "",
        unloadType: "",
        // photos: []
    };

    originalCargoFormData = {};

    constructor() {
        makeAutoObservable(this)
    };

    setFormData = (name, value) => {
        this.cargoFormData = { ...this.cargoFormData, [name]: value }
    }


    setNestedFormData = (formName, secondName, newData) => {
        this.cargoFormData = {
            ...this.cargoFormData,
            [formName]: {
                ...this.cargoFormData[formName],
                [secondName]: newData
            }
        };
    }

    setCargoFormDataFromServer = (data) => {
        this.originalCargoFormData = data;
        this.cargoFormData = { ...data };
    }

    getUpdatedFields = () => {
        const updatedFields = {};

        for (const key in this.cargoFormData) {
            if (JSON.stringify(this.cargoFormData[key]) !== JSON.stringify(this.originalCargoFormData[key])) {
                updatedFields[key] = this.cargoFormData[key];
            }
        }

        return updatedFields;
    }

    resetFormData = () => {
        this.cargoFormData = {
            name: "",
            description: "",
            weight: 0,
            volume: 0,
            dimensions: {
                length: 0,
                width: 0,
                height: 0
            },
            route: {
                from: "",
                to: ""
            },
            price: 0.0,
            typePay: "",
            readyDate: "",
            deliveryDate: "",
            bodyType: "",
            loadType: "",
            unloadType: "",
            // photos: []
        };
    }
}

export const cargoStore = new CargoStore();