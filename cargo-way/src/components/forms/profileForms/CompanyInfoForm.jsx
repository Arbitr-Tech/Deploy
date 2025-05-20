import React, { useState } from "react";
import FormGroup from "../FormGroup";
import { useMask } from "@react-input/mask";
import { validateCompanyData } from "../../../validation/validations";
import { toast } from "react-toastify";

const CompanyInfoForm = ({ data, isNull, onClickButton, onNestedChange }) => {

    const [isEdit, setIsEdit] = useState(false);

    const inputInnMask = useMask({
        mask: '__________',
        replacement: { _: /\d/ },
    })

    const inputOgrnMask = useMask({
        mask: '_____________',
        replacement: { _: /\d/ },
    })

    const inputBicMask = useMask({
        mask: '_________',
        replacement: { _: /\d/ },
    })
    
    const inputCorrespondentAccountMask = useMask({
        mask: '____________________',
        replacement: { _: /\d/ },
    })

    const handleSubmit = () => {
        const companyData = data.company || {};
        const errors = validateCompanyData(companyData, isNull);

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

    if (data.legalType === "INDIVIDUAL") return null;

    return (
        <div className="profileForm profileForm--company">
            <h2 className="profileForm__title profileForm__title--company">Информация о компании</h2>
            <FormGroup label="Название компании" modification="company">
                <input className="profileForm__input"
                    type="text"
                    name="company"
                    value={data.company?.name || ""}
                    data-path="name"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="ИНН" modification="company">
                <input className="profileForm__input"
                    type="text"
                    name="company"
                    value={data.company?.inn || ""}
                    data-path="inn"
                    disabled={!isEdit}
                    ref={inputInnMask}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="ОГРН" modification="company">
                <input className="profileForm__input"
                    type="text"
                    name="company"
                    value={data.company?.ogrn || ""}
                    data-path="ogrn"
                    disabled={!isEdit}
                    ref={inputOgrnMask}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="БИК" modification="company">
                <input className="profileForm__input"
                    type="text"
                    name="company"
                    value={data.company?.bic || ""}
                    data-path="bic"
                    disabled={!isEdit}
                    ref={inputBicMask}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Корреспондентский счет" modification="company">
                <input className="profileForm__input"
                    type="text"
                    name="company"
                    value={data.company?.correspondentAccount || ""}
                    data-path="correspondentAccount"
                    disabled={!isEdit}
                    ref={inputCorrespondentAccountMask}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Дата регистрации компании" modification="company">
                <input
                    className="profileForm__input"
                    type="date"
                    name="company"
                    value={data.company?.registrationDate || ""}
                    data-path="registrationDate"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <button className={`profileForm__button profileForm__button--company ${isEdit ? 'profileForm__button--yellow' : ''}`} 
                onClick={handleButtonClick}>
                {!isEdit ? isNull ? 'Заполнить данные компании' : 'Редактировать' : 'Отправить новые данные'}
            </button>
        </div >
    )
};

export default CompanyInfoForm;
