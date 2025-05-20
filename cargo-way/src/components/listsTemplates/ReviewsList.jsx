import ReviewItem from "./ReviewItem";

const ReviewsList = ({ list = [], typeButton, onClickAll, onClickMy, text, name, onClickDel, onClickEdit }) => {
    return (
        <div className="reviewsList" >
            <h2 className="reviewsList__title">Отзывы</h2>
            <div className="reviewsList__toggle">
                <button className={`reviewsList__toggle-button ${typeButton === 'all' ? 'reviewsList__toggle-button--noactive' : ''}`} onClick={onClickAll}>Все отзывы</button>
                <button className={`reviewsList__toggle-button ${typeButton === 'my' ? 'reviewsList__toggle-button--noactive' : ''}`} onClick={onClickMy}>Мои отзывы</button>
            </div>
            <div className="reviewsList__content">
                {list.length > 0 ? (list.map((item) => (
                    <ReviewItem
                        key={item.id}
                        {...item}
                        name={item.commentator.profileName}
                        date={item.createdAt}
                        hide={name !== item.commentator.profileName}
                        onClickDel={() => onClickDel(item)}
                        onClickEdit={() => onClickEdit(item)}
                    />
                ))) : (
                    <p className="reviewsList__content-text">{text}</p>
                )}
            </div>
        </div >
    )
};

export default ReviewsList;