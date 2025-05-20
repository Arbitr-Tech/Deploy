import React from "react";
import { Link } from "react-router-dom";

const AuthorizationForm = ({ formData, onChange, onNext, onClickLink }) => {
    return (
        <div className='form'>
            <h1 className='form__title'>Авторизация</h1>
            <div className='form__simple'>
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
            <div className="form__transition">
                <button className='button form__transition-button' onClick={onNext}>Войти</button>
                <div className="form__transition-textBox">
                    <p className="form__transition-text">Еще не зарегистрированы? <Link to='/reg'>Зарегистрироваться</Link></p>
                    <p className="form__transition-text">Забыли пароль? <a onClick={onClickLink}>Восстановить</a></p>
                </div>
            </div>
        </div>
    )
};

export default AuthorizationForm;