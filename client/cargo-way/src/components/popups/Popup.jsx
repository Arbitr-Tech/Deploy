import ReactDOM from "react-dom";

const Popup = ({ isOpen, text, typePopup, onClose, onConfirm, onRespond }) => {
    if (!isOpen) return null;

    const fieldNames = {
        name: "Название",
        description: "Описание",
        weight: "Вес (кг)",
        volume: "Объём (кв.м)",
        dimensions: "Габариты",
        length: "Длина (м)",
        width: "Ширина (м)",
        height: "Высота (м)",
        route: "Путь",
        from: "Откуда",
        to: "Куда",
        price: "Ставка",
        typePay: "Тип ставки",
        readyDate: "Готов к загрузке",
        deliveryDate: "Готов к выгрузке",
        bodyType: "Тип кузова",
        loadType: "Тип загрузки",
        unloadType: "Тип выгрузки",
        photos: "Фото груза",
        brand: "Марка",
        model: "Модель",
        manufactureYear: "Год выпуска",
        transportNumber: "Номер транспорта",
        trailerDetails: "Детали прицепа",
        trailerNumber: "Номер прицепа",
        liftingCapacity: "Грузоподъемность (т)",
        driver: "Водитель",
        fullName: "ФИО",
        licenseCategory: "Категория ВУ",
        licenseNumber: "Номер ВУ",
        issueDate: "Дата выдачи ВУ",
        expirationDate: "Дата окончания ВУ",
        embeddedTrailer: "Встроенный прицеп",
        trailers: "Полуприцеп",
    };

    const renderText = (data) => {
        if (!data || typeof data !== "object") return null; // Проверяем, что data - объект

        const renderEntries = (obj) => (
            <ul className="popup__text-list">
                {Object.entries(obj || {})
                    .filter(([key]) => key !== 'id')
                    .map(([key, value]) => (
                        <li key={key} className="popup__text-item">
                            <span className="popup__text-title">
                                {fieldNames[key] || key.charAt(0).toUpperCase() + key.slice(1)}:
                            </span>
                            {value && typeof value === "object" ? (value.length === 0 ? 'Отсутсвует' : renderEntries(value)) : (value === null) ? 'Отсутсвует' : ` ${value}`}
                        </li>

                    ))}
            </ul>
        );

        return renderEntries(data);
    };


    return ReactDOM.createPortal(
        <div className={`overlay ${isOpen ? "overlay--show" : ""}`}>
            <div className="popup">
                <div className="popup__icon">
                    <img src="/assets/img/close.svg" alt="close" onClick={onClose} />
                </div>
                <div className="popup__text">
                    {(typePopup === 'details' || typePopup === 'detailsTransport') ? renderText(text) : text}
                </div>
                {(typePopup !== 'details' && typePopup !== 'auth' && typePopup !== 'detailsTransport') && (
                    <div className="popup__buttons">
                        <button className="popup__button" onClick={onConfirm}>Подтвердить</button>
                        <button className="popup__button" onClick={onClose}>Отменить</button>
                    </div>
                )}
                {(typePopup === 'details') && (
                    <div className="popup__buttons">
                        <button className="popup__button" onClick={onRespond}>Откликнуться</button>
                    </div>
                )}
            </div>
        </div>,
        document.getElementById("popup-root")
    );
};

export default Popup;