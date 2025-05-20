import ItemCard from "./ItemCard";

const ListItems = ({ list, type, buttons = [], getButtons }) => {
    return (
        < div className="search__result" >
            <div className={`search__result-header ${type !== 'main' ? 'search__result-header--mylist' : ''}`}>
                <p className="search__result-title">Груз</p>
                <p className="search__result-title">Вес, т / Объем, кв.м</p>
                <p className="search__result-title search__result-title--hide">Откуда</p>
                <p className="search__result-title search__result-title--hide">Куда</p>
                <p className="search__result-title">Ставка</p>
                <p className="search__result-title search__result-title--hide">Тип ставки</p>
                {type !== 'main' ? <p className="search__result-title">Статус</p> : ''}
            </div>
            <div className={`search__result-list ${type !== 'main' ? 'search__result-list--mylist' : ''}`}>
                {list.map((item) => (
                    <ItemCard key={item.id}
                        {...item.cargo}
                        from={item.cargo.route.from}
                        to={item.cargo.route.to}
                        status={item.visibilityStatus}
                        type={type}
                        buttons={getButtons ? getButtons(item) : buttons.map(btn => ({
                            ...btn,
                            onClick: () => btn.onClick(item)
                        }))}
                    />
                ))}
            </div>
        </div >
    )
};

export default ListItems;