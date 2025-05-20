import { makeAutoObservable } from "mobx";
import { getDetailsCargo } from "../api/cargoService";

class ResponseStore {
    response = {
        endExecution: "",
        executor: {},
        id: "",
        orderCreatedAt: "",
        orderUpdatedAt: "",
        owner: {},
        responses: [],
        startExecution: "",
        visibilityStatus: ""
    };

    constructor() {
        makeAutoObservable(this)
    };

    setResponseFormDataFromServer = async (data) => {
        this.response = { ...data };
    }

    resetFormData = () => {
        this.response = {
            endExecution: "",
            executor: {},
            id: "",
            orderCreatedAt: "",
            orderUpdatedAt: "",
            owner: {},
            responses: [],
            startExecution: "",
            visibilityStatus: ""
        };
    }
}

export const responseStore = new ResponseStore();