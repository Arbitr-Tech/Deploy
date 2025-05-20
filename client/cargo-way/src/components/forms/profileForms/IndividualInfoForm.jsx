import React, { useState } from "react";
import FormGroup from "../FormGroup";
import { useMask } from "@react-input/mask";
import { validateIndividaulData } from "../../../validation/validations";
import { toast } from "react-toastify";

const IndividualInfoForm = ({ data, isNull, onClickButton, onNestedChange }) => {

    const [isEdit, setIsEdit] = useState(false);
    const inputPassportNumberMask = useMask({
        mask: '____ ______',
        replacement: { _: /\d/ },
    })

    const inputDepartmentCodeMask = useMask({
        mask: '___-___',
        replacement: { _: /\d/ },
    })

    const handleSubmit = () => {
        const individualData = data.individual || {};
        const errors = validateIndividaulData(individualData, isNull);

        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach(errorMessage => {
                toast.error(errorMessage);
            });
            return false; 
        }

        onClickButton();
        setIsEdit(false);
        return true;
    };

    const handleButtonClick = () => {
        if (!isEdit) {
            setIsEdit(true);
        } else {
            const success = handleSubmit();
            if (!success) return;
        }
    };


    if (data.legalType !== "INDIVIDUAL") return null;


    return (
        <div className="profileForm profileForm--individual">
            <h2 className="profileForm__title profileForm__title--individual">Информация о пользователе</h2>
            <FormGroup label="Полное имя" modification="individual">
                <input className="profileForm__input"
                    type="text"
                    name="individual"
                    value={data.individual?.fullName || ""}
                    data-path="fullName"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Серия и номер паспорта" modification="individual">
                <input className="profileForm__input"
                    type="text"
                    name="individual"
                    value={data.individual?.passportNumber || ""}
                    data-path="passportNumber"
                    disabled={!isEdit}
                    ref={inputPassportNumberMask}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Кем выдан" modification="individual">
                <input className="profileForm__input"
                    type="text"
                    name="individual"
                    value={data.individual?.issuedBy || ""}
                    data-path="issuedBy"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Дата выдачи" modification="individual">
                <input className="profileForm__input"
                    type="date"
                    name="individual"
                    value={data.individual?.issueDate || ""}
                    data-path="issueDate"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Код департамента" modification="individual">
                <input className="profileForm__input"
                    type="text"
                    name="individual"
                    value={data.individual?.departmentCode || ""}
                    data-path="departmentCode"
                    disabled={!isEdit}
                    ref={inputDepartmentCodeMask}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Адрес регистрации" modification="individual">
                <input
                    className="profileForm__input"
                    type="text"
                    name="individual"
                    value={data.individual?.registrationAddress || ""}
                    data-path="registrationAddress"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <button className="profileForm__button profileForm__button--company"
                onClick={handleButtonClick}>
                {!isEdit
                    ? isNull
                        ? 'Заполнить паспортные данные'
                        : 'Редактировать'
                    : 'Отправить новые данные'}
            </button>
        </div >
    )
};

export default IndividualInfoForm;
