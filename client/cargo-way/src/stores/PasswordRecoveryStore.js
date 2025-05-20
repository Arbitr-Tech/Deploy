import { makeAutoObservable } from "mobx";

class PasswordRecoveryStore {

    passwordFormData = {
        newPassword: "",
        newPasswordRepeat: ""
    };

    constructor() {
        makeAutoObservable(this);
    }

    setPasswordFormData = (name, value) => {
        this.passwordFormData = { ...this.passwordFormData, [name]: value }
    }

    reset = () => {
        this.passwordFormData = {
            newPassword: "",
            newPasswordRecovery: ""
        }
    }
}

export const passwordRecoveryStore = new PasswordRecoveryStore();