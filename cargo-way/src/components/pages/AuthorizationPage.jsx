import React, { useEffect } from "react";
import AuthorizationForm from "../forms/AuthorizationForm";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { autorizationStore } from "../../stores/AutorizationStore";
import { login, passwordReset } from "../../api/authService";
import { data, useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore";
import { toast } from "react-toastify";
import { useState } from "react";
import { popupStore } from "../../stores/PopupStore";
import { getProfileData } from "../../api/profileService";
import PopupWithInput from "../popups/PopupWithInput";

const AuthorizationPage = observer(() => {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        return () => {
            autorizationStore.reset(); // Очистка формы при размонтировании
        };
    }, []);

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        autorizationStore.setAuthorizationFormData(name, value);
    };

    const handleNext = async () => {

        try {
            await login(toJS(autorizationStore.autorizationFormData));
            const data = await getProfileData();
            userStore.setUserFormData(data);
            navigate('/');
            autorizationStore.reset();
        } catch (error) {
            console.error("Ошибка входа:", error);
            if (!error.message.startsWith('Неверный') && !error.message.startsWith('Участник')) {
                toast.error('Ошибка входа')
            } else {
                toast.error(error.message)
            }
        }
    };

    const handlePasswordReset = async () => {
        if (!popupStore.email) {
            toast.error('Заполните поле ввода почты');
            return;
        };
        try {
            await passwordReset({ "email": popupStore.email });
            popupStore.reset();
            setIsPopupOpen(false);
        } catch (error) {
            if (error.message.includes("не был найден!")) {
                toast.error("Участник с такой почтой не был найден");
            } else {
                toast.error("Произошла ошибка. Попробуйте позже");
            };
            return;
        };
        toast.success('Письмо направлено на вашу почту');
    }

    return (
        <div className="authorization">
            <PopupWithInput
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSend={handlePasswordReset}
                email={popupStore.email}
                onChangeEmail={popupStore.setEmail}
            />
            <div className="container">
                <AuthorizationForm formData={autorizationStore.autorizationFormData} onChange={handleOnChange} onNext={handleNext} onClickLink={() => setIsPopupOpen(true)} />
            </div>
        </div>
    )
});

export default AuthorizationPage;