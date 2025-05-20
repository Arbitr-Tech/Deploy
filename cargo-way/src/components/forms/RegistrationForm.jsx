import React from "react";
import { Link } from "react-router-dom";

const RegistrationForm = ({ formData, agreement, onChange, onSubmit, onChangeAgreement }) => {
    return (
        <div className='form form--registration'>
            <h1 className='form__title'>Регистрация</h1>
            <div className='form__radio'>
                <label className='form__radio-label'>
                    <input className='form__radio-input'
                        type="radio"
                        name="legalType"
                        value="INDIVIDUAL"
                        checked={formData.legalType === "INDIVIDUAL"}
                        onChange={onChange}
                    />
                    Физическое лицо
                </label>
                <label className='form__radio-label'>
                    <input className='form__radio-input'
                        type="radio"
                        name="legalType"
                        value="COMPANY"
                        checked={formData.legalType === "COMPANY"}
                        onChange={onChange}
                    />
                    Юридическое лицо
                </label>
            </div>
            <div className='form__radio'>
                <label className='form__radio-label'>
                    <input className='form__radio-input'
                        type="radio"
                        name="role"
                        value="CARRIER"
                        checked={formData.role === "CARRIER"}
                        onChange={onChange}
                    />
                    Перевозчик
                </label>
                <label className='form__radio-label'>
                    <input className='form__radio-input'
                        type="radio"
                        name="role"
                        value="CUSTOMER"
                        checked={formData.role === "CUSTOMER"}
                        onChange={onChange}
                    />
                    Заказчик
                </label>
            </div>
            <div className='form__simple'>
                <input className='form__simple-input'
                    type="text"
                    name="username"
                    placeholder="Логин"
                    value={formData.username}
                    onChange={onChange}
                />
                <input className='form__simple-input'
                    type="email"
                    name="email"
                    placeholder="Почта"
                    value={formData.email}
                    onChange={onChange}
                />
                <input className='form__simple-input'
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={onChange}
                />
            </div>
            <label className='form__label'>
                <input className='form__input'
                    type="checkbox"
                    name="agreement"
                    checked={agreement}
                    onChange={onChangeAgreement}
                />
                <a className="form__label-a" href="/docs/user-agreement.docx" target="_blank" rel="noopener noreferrer">Соглашаюсь с условиями обработки данных →</a>
            </label>
            <div className="form__transition">
                <button className='button form__transition-button' onClick={onSubmit}>Зарегистрироваться</button>
                <p className="form__transition-text">Уже зарегистрированы? <Link to='/auth'>Войти</Link></p>
            </div>
        </div>
    )
};

export default RegistrationForm;