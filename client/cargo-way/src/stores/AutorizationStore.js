import { makeAutoObservable } from "mobx";

class AutorizationStore {

    autorizationFormData = {
        email: "",
        password: ""
    };

    constructor() {
        makeAutoObservable(this);
    }

    setAuthorizationFormData = (name, value) => {
        this.autorizationFormData = { ...this.autorizationFormData, [name]: value }
    }

    reset = () => {
        this.autorizationFormData = {
            email: "",
            password: ""
        }
    }
}

export const autorizationStore = new AutorizationStore();