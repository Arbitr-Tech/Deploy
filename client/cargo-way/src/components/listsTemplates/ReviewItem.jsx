const ReviewItem = ({ hide, name, date, comment, rating, onClickDel, onClickEdit }) => {
    const dateView = new Date(date);

    return (
        <div className="reviewItem">
            <div className="reviewItem__userInfo">
                <div className="reviewItem__userInfo-data">
                    <p className="reviewItem__data-name">{name}</p>
                    <p className="reviewItem__data-date">от: <span>{dateView.toLocaleDateString()}</span></p>
                </div>
                <div className={`reviewItem__userInfo-btnBox ${hide ? 'reviewItem__userInfo-btnBox--hide' : ''} `}>
                    <button className="reviewItem__btnBox-button" onClick={onClickDel}>Удалить</button>
                    <button className="reviewItem__btnBox-button" onClick={onClickEdit}>Отредактировать</button>
                </div>
            </div>
            <div className="reviewItem__rating">
                <p className="reviewItem__rating-content">Рейтинг от пользователя: <span>{rating}</span></p>
            </div>
            <div className="reviewItem__comment">
                <p className="reviewItem__comment-content">{comment}</p>
            </div>
        </div>
    )
};

export default ReviewItem;