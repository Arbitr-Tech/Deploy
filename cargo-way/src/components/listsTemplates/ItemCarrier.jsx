const ItemCarrier = ({ name, desc, onClickSee, onClickAccept, onClickProfile }) => {
    return (
        <div className="itemCarrier">
            <div className="itemCarrier__text" onClick={onClickProfile}>
                <p className="itemCarrier__text-name">{name}</p>
                <p className="itemCarrier__text-desc">Рейтинг: {desc}</p>
            </div>
            <div className="itemCarrier__btnBox">
                <buttton className="itemCarrier__btnBox-button" onClick={onClickSee}>Посмотреть транспорт</buttton>
                <buttton className="itemCarrier__btnBox-button" onClick={onClickAccept}>Принять</buttton>
            </div>
        </div>
    )
};

export default ItemCarrier;