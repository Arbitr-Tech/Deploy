const PopupWithInput = ({ isOpen, onClose, onSend, email, onChangeEmail }) => {

    if (!isOpen) return null;

    return (
        <div className={`overlay ${isOpen ? "overlay--show" : ""}`}>
            <div className="popupWithInput">
                <div className="popupWithInput__icon">
                    <img src="/assets/img/close.svg" alt="close" onClick={onClose} />
                </div>
                <div className="popupWithInput__text">
                    Введите адрес электронной почты, привязанной к аккаунту, и мы отправим вам ссылку для восстановления пароля
                </div>
                <div className="popupWithInput__inputBox">
                    <input className='popupWithInput__inputBox-input'
                        type="email"
                        name="email"
                        placeholder="Почта"
                        value={email}
                        onChange={(event) => onChangeEmail(event.target.value)}
                    />
                </div>
                <div className="popupWithInput__buttons">
                    <button className="popupWithInput__button" onClick={onSend}>Отправить</button>
                </div>
            </div>
        </div>
    );
};

export default PopupWithInput;