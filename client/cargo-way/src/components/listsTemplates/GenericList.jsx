import GenericItem from "./GenericItem";

const GenericList = ({
    list,
    columns,
    headerClassName = '',
    itemClassName = '',
    listClassName = '',
    getItemProps = (item) => item,
    ...listProps }) => {
    return (
        <div className={`genericList__result ${listClassName}`}>
            <div className={`genericList__result-header ${headerClassName}`}>
                {columns.map((col) => (
                    <p
                        key={col.key}
                        className={`genericList__result-title ${col.hideOnMobile ? 'genericList__result-title--hide' : ''}`}
                    >
                        {col.title}
                    </p>
                ))}
            </div>

            <div className="genericList__result-list">
                {list.map((item) => (
                    <GenericItem
                        key={item.id}
                        className={itemClassName}
                        {...getItemProps(item)}
                        {...listProps}
                    />
                ))}
            </div>
        </div>
    );
};

export default GenericList;