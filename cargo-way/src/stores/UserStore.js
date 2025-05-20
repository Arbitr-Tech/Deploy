import { makeAutoObservable } from "mobx";
import { getProfileData } from "../api/profileService";

class UserStore {
    role = localStorage.getItem('role') || '';
    userFormData = {
        userData: {
            username: "",
            email: "",
            role: ""
        },
        company: null,
        individual: null,
        contactData: null,
    };
    id = '';

    originalUserFormData = {};

    constructor() {
        makeAutoObservable(this);
    }

    setRole(newRole) {
        if (newRole === '') {
            localStorage.removeItem('role');
        } else {
            localStorage.setItem('role', newRole);
        }
        this.role = newRole;
    };

    setUserFormData(data) {
        this.originalUserFormData = data;
        this.userFormData = { ...data };
        this.setRole(this.originalUserFormData.userData.role);
    };

    getUpdatedFields = () => {
        const updatedFields = {};

        Object.entries(this.userFormData).forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                const changes = Object.entries(value).reduce((acc, [subKey, subValue]) => {
                    if (!this.originalUserFormData[key] ||
                        JSON.stringify(subValue) !== JSON.stringify(this.originalUserFormData[key][subKey])) {
                        acc[subKey] = subValue;
                    }
                    return acc;
                }, {});

                if (Object.keys(changes).length > 0) {
                    updatedFields[key] = changes;
                }
            } else if (value !== this.originalUserFormData[key]) {
                updatedFields[key] = value;
            }
        });

        return updatedFields;
    };

    setFieldsData = (name, value) => {
        this.userFormData = { ...this.userFormData, [name]: value }
    };


    setNestedFieldsData = (formName, secondName, newData) => {
        this.userFormData = {
            ...this.userFormData,
            [formName]: {
                ...this.userFormData[formName],
                [secondName]: newData
            }
        };
    };

    // fetchId = async() => {
    //     try {
    //         const data = await getProfileData();
    //         this.id = data.id;
    //     } catch (error) {
    //         console.error("Ошибка при получении id:", error);
    //     };
    // };

    reset = () => {
        this.userFormData = { ...this.originalUserFormData }
    };

}

export const userStore = new UserStore();