import { useEffect } from 'react';
import { Rating } from 'react-simple-star-rating'
import { popupStore } from '../../stores/PopupStore';

const PopupWithRating = ({ isOpen, onClose, onSend, data, onChange, onClickRating, texetType = 'add' }) => {

    useEffect(() => {
        return () => {
            popupStore.reset();
        };
    }, []);

    if (!isOpen) return null;

    return (
        <div className={`overlay ${isOpen ? "overlay--show" : ""}`}>
            <div className="popupWithRating">
                <div className="popupWithRating__icon">
                    <img src="/assets/img/close.svg" alt="close" onClick={onClose} />
                </div>
                <div className="popupWithRating__text">
                    {texetType === 'add' ?
                        'Перед завершением поделитесь впечатлением о работе партнера' :
                        'Отредактируйте отзыв'
                    }
                </div>
                <div className="popupWithRating__raitngBox">
                    <p className="popupWithRating__raitngBox-text">Оставьте оценку:</p>
                    <Rating
                        onClick={onClickRating}
                        size={30}
                        fillColor="#E9C17D"
                        initialValue={data.rating || 0}
                        fillStyle={{ transition: 'all 0.2s' }}
                    />
                </div>
                <div className="popupWithRating__inputBox">
                    <p className="popupWithRating__inputBox-text">Оставьте отзыв:</p>
                    <textarea className="popupWithRating__inputBox-textarea"
                        type="text"
                        name="comment"
                        value={data.comment || ''}
                        onChange={onChange}
                    />
                </div>
                <div className="popupWithRating__buttons">
                    <button className="popupWithRating__button" onClick={onClose}>Отменить</button>
                    <button className="popupWithRating__button" onClick={onSend}>Отправить</button>
                </div>
            </div>
        </div>
    );
};

export default PopupWithRating;