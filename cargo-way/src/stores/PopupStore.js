import { makeAutoObservable } from "mobx";

class PopupStore {
    email = '';
    review = {
        comment: "",
        rating: 0
    };

    originalReview = {};

    constructor() {
        makeAutoObservable(this);
    };

    setReviewFromServer = (data) => {
        this.originalReview = data;
        this.review = { ...data };
    };

    getUpdatedFields = () => {
        const updatedFields = {};

        for (const key in this.review) {
            if (JSON.stringify(this.review[key]) !== JSON.stringify(this.originalReview[key])) {
                updatedFields[key] = this.review[key];
            }
        }

        return updatedFields;
    };

    setEmail = (email) => {
        this.email = email;
    };

    setReviewField = (name, value) => {
        this.review = { ...this.review, [name]: value };
    };


    reset = () => {
        this.email = '';
        this.review = {
            comment: "",
            rating: 0
        };
    }
}

export const popupStore = new PopupStore();