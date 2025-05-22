import React from "react";
import { validateRegistration } from "../../validation/validations"
import { observer } from "mobx-react-lite";
import { registrationStore } from "../../stores/RegistrationStore";
import { toJS } from "mobx";
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RegistrationForm from "../forms/RegistrationForm";
import { registration } from "../../api/regService";
import { getProfileData } from "../../api/profileService";

const RegistrationPage = observer(() => {
    const navigate = useNavigate();
    const errorMessages = {
        "users_cargoway_username_key": "Имя пользователя уже занято. Выберите другое.",
        "users_cargoway_email_key": "Этот email уже зарегистрирован. Попробуйте войти или используйте другой email."
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        registrationStore.setRegistrationFormData(name, value);
    }

    const handleSubmit = async () => {
        const errors = validateRegistration(registrationStore.registrationFormData, registrationStore.agreement);

        if (Object.keys(errors).length > 0) {
            console.log("Ошибки валидации:", errors);
            Object.values(errors).forEach(errorMessage => {
                toast.error(errorMessage);
            });
            return;
        }

        try {
            await registration(toJS(registrationStore.registrationFormData));
            const data = await getProfileData();
            userStore.setUserFormData(data);
            navigate('/');
            registrationStore.submitRegistration();
        } catch (error) {
            console.error("Ошибка входа:", error.message);
            if (error.message.includes("duplicate key value violates unique constraint")) {
                const foundKey = Object.keys(errorMessages).find(key => error.message.includes(key));
                if (foundKey) {
                    toast.error(errorMessages[foundKey]);
                }
            } else {
                toast.error("Ошибка регистрации. Попробуйте еще раз позже.");
            }
        }
    };

    return (
        <div className="registration">
            <div className="container">
                <RegistrationForm
                    formData={registrationStore.registrationFormData}
                    agreement={registrationStore.agreement}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    onChangeAgreement={registrationStore.switchAgreement}
                />
            </div>
        </div >
    )

});

export default RegistrationPage;