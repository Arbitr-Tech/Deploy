import React, { useState } from "react";
import FormGroup from "../FormGroup";
import { validateContactData } from "../../../validation/validations";
import { toast } from "react-toastify";

const ContactInfoForm = ({ data, isNull, onClickButton, onNestedChange }) => {
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmit = () => {
        const contactData = data.contactData || {};
        const errors = validateContactData(contactData, isNull);

        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach(errorMessage => {
                toast.error(errorMessage);
            });
            return false; // валидация не прошла
        }

        onClickButton();
        setIsEdit(false); // валидация прошла
        return true;
    };

    const handleButtonClick = () => {
        if (!isEdit) {
            setIsEdit(true);
        } else {
            const success = handleSubmit();
            if (!success) return; // не валидно — не трогаем кнопку
        }
    };

    return (
        <div className="profileForm profileForm--contact">
            <h2 className="profileForm__title">Контактная информация</h2>
            <FormGroup label="Telegram" modification="contact">
                <input className="profileForm__input"
                    type="text"
                    name="contactData"
                    value={data.contactData?.telegramLink || ""}
                    data-path="telegramLink"
                    onChange={onNestedChange}
                    disabled={!isEdit}
                />
            </FormGroup>
            <FormGroup label="WatsApp" modification="contact">
                <input className="profileForm__input"
                    type="text"
                    name="contactData"
                    value={data.contactData?.whatsappLink || ""}
                    data-path="whatsappLink"
                    onChange={onNestedChange}
                    disabled={!isEdit}
                />
            </FormGroup>
            <FormGroup label="Номер телефона" modification="contact">
                <input className="profileForm__input"
                    type="tel"
                    name="contactData"
                    value={data.contactData?.phoneNumber || ""}
                    data-path="phoneNumber"
                    onChange={onNestedChange}
                    disabled={!isEdit}
                />
            </FormGroup>
            <button className={`profileForm__button ${isEdit ? 'profileForm__button--yellow' : ''}`} onClick={handleButtonClick}>
                {!isEdit
                    ? isNull
                        ? 'Заполнить контактные данные'
                        : 'Редактировать'
                    : 'Отправить новые данные'}
            </button>
        </div>
    );
};

export default ContactInfoForm;
