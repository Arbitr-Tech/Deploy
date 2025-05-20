const GenericItem = ({
    className = '',
    fields,
    buttons = [],
    highlighted = false,
    ...props
}) => {
    return (
        <div className={`genericList__item ${highlighted ? 'generic-item--highlighted' : ''}`}>
            <div className={`genericList__item-text ${className}`}>
                {fields.map((field) => (
                    <p
                        key={field.key}
                        className={`genericList__item-content ${field.hideOnMobile ? 'genericList__item-content--hide' : ''}`}
                    >
                        {field.value}
                    </p>
                ))}
            </div>

            {buttons.length > 0 && (
                <div className="genericList__item-btns">
                    {buttons.map((btn, idx) => (
                        <button
                            key={idx}
                            className="genericList__item-button"
                            onClick={btn.onClick}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenericItem;