import React from "react";

const PasswordRecoveryForm = ({ formData, onChange, onSend }) => {
    return (
        <div className='form'>
            <h1 className='form__title'>Восстановление пароля</h1>
            <div className='form__simple'>
                <input className='form__simple-input'
                    type="password"
                    name="newPassword"
                    placeholder="Новый пароль"
                    value={formData.newPassword}
                    onChange={onChange}
                />
                <input className='form__simple-input'
                    type="password"
                    name="newPasswordRepeat"
                    placeholder="Повторите пароль"
                    value={formData.newPasswordRepeat}
                    onChange={onChange}
                />
            </div>
            <div className="form__transition">
                <button className='button form__transition-button' onClick={onSend}>Отправить</button>
            </div>
        </div>
    )
};

export default PasswordRecoveryForm;