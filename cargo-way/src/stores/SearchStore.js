import { makeAutoObservable } from "mobx";

class SearchStore {
    formData = {
        weightFrom: "",
        weightTo: "",
        volumeFrom: "",
        volumeTo: "",
        loadType: "",
        unloadType: "",
        priceFrom: "",
        priceTo: "",
        bodyType: "",
        readyDate: "",
        route: {
            from: "",
            to: ""
        },
        dimensions: {
            length: "",
            width: "",
            height: ""
        }
    };

    constructor() {
        makeAutoObservable(this);
    };

    setFormData = (name, value) => {
        this.formData = { ...this.formData, [name]: value }
    }

    setNestedFormData = (formName, secondName, newData) => {
        this.formData = {
            ...this.formData,
            [formName]: {
                ...this.formData[formName],
                [secondName]: newData
            }
        };
    }

    reset = () => {
        this.formData = {
            weightFrom: "",
            weightTo: "",
            volumeFrom: "",
            volumeTo: "",
            loadType: "",
            unloadType: "",
            priceFrom: "",
            priceTo: "",
            bodyType: "",
            readyDate: "",
            route: {
                from: "",
                to: ""
            },
            dimensions: {
                length: "",
                width: "",
                height: ""
            }
        }
    }

    getFilledData = () => {
        const processNested = (obj) => {
            const result = {};

            for (const key in obj) {
                const value = obj[key];

                if (typeof value === "object" && !Array.isArray(value)) {
                    const nested = processNested(value);
                    if (Object.keys(nested).length > 0) {
                        result[key] = nested;
                    }
                }
                else if (value !== "" && value !== null && value !== undefined) {
                    result[key] = value;
                }
            }

            return result;
        };

        return processNested(this.formData);
    }
}

export const searchStore = new SearchStore();