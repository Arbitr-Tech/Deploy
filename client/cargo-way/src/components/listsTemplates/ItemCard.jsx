const ItemCard = ({ name, weight, volume, from, to, price, typePay, type, status, buttons = [] }) => {

    const STATUS_LABELS = {
        DRAFT: "Черновик",
        PUBLISHED: "Опубликовано",
        IN_PROGRESS: "В исполнении",
        COMPLETED: "Завершено",
        CANCELED: "Отменено",
        BIDDING: "Торги"
    };
    const HIGHLIGHTED_STATUSES = ["PUBLISHED", "IN_PROGRESS", "COMPLETED"];
    
    const isHighlighted = HIGHLIGHTED_STATUSES.includes(status);
    const statusLabel = STATUS_LABELS[status] || status;

    return (
        <div className={`search__item ${isHighlighted ? 'search__item--yellow' : ''}`}>
            <div className={`search__item-text ${type !== 'main' ? 'search__item-text--mylist' : ''}`}>
                <p className="search__item-content">{name}</p>
                <p className="search__item-content">{weight} т / {volume} кв.м</p>
                <p className="search__item-content search__item-content--hide">{from}</p>
                <p className="search__item-content search__item-content--hide">{to}</p>
                <p className="search__item-content">{price}</p>
                <p className="search__item-content search__item-content--hide">{typePay}</p>
                {type !== 'main' ? <p className="search__item-content search__item-content--status">{statusLabel}</p> : ''}
            </div>
            <div className="search__item-btns">
                {buttons?.map((btn, idx) => (
                    <button key={idx} className="search__item-button" onClick={btn.onClick}>
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    )
};

export default ItemCard;