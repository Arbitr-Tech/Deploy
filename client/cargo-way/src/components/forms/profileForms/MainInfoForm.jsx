import React, { useState } from "react";
import FormGroup from "../FormGroup";

const MainInfoForm = ({ data, onClickButton, onChange, onNestedChange }) => {

    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className="profileForm">
            <h2 className="profileForm__title">Основная информация</h2>
            <div className="profileForm__rating">
                <p className="profileForm__rating-users">Рейтинг от пользователей: <span>{data.userRating}</span></p>
                <p className="profileForm__rating-system">Рейтинг системы: <span>{data.systemRating}</span></p>
            </div>
            <FormGroup label="Имя пользователя">
                <input className="profileForm__input"
                    type="text"
                    name="userData"
                    value={data.userData.username}
                    data-path="username"
                    onChange={onNestedChange}
                    disabled={!isEdit}
                />
            </FormGroup>
            <FormGroup label="Почта">
                <input className="profileForm__input"
                    type="email"
                    name="userData"
                    value={data.userData.email}
                    data-path="email"
                    onChange={onNestedChange}
                    disabled={!isEdit}
                />
            </FormGroup>
            <FormGroup label="Роль">
                <div className='profileForm__radio'>
                    <label className='profileForm__radio-label'>
                        <input className='profileForm__radio-input'
                            type="radio"
                            name="userData"
                            value="CARRIER"
                            checked={data.userData.role === "CARRIER"}
                            data-path="role"
                            onChange={onNestedChange}
                            disabled={!isEdit}
                        />
                        Перевозчик
                    </label>
                    <label className='profileForm__radio-label'>
                        <input className='profileForm__radio-input'
                            type="radio"
                            name="userData"
                            value="CUSTOMER"
                            checked={data.userData.role === "CUSTOMER"}
                            data-path="role"
                            onChange={onNestedChange}
                            disabled={!isEdit}
                        />
                        Заказчик
                    </label>
                </div>
            </FormGroup>
            <button
                className="profileForm__button"
                onClick={() => {
                    if (!isEdit) return setIsEdit(true);
                    onClickButton();
                    setIsEdit(false);
                }}>
                {!isEdit ? 'Редактировать' : 'Отправить новые данные'}
            </button>
        </div>
    )
};

export default MainInfoForm;
