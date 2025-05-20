import AutoList from "../carrierLists/AutoList";
import Pagination from "../Pagination";

const PopupWithChoice = ({ isOpen, onClose, list, onClickChoice, onClickCurrentPage, onClickTotalPages, onPageChange }) => {

    if (!isOpen) return null;

    return (
        <div className={`overlay ${isOpen ? "overlay--show" : ""}`}>
            <div className="popupWithChoice">
                <div className="popupWithChoice__icon">
                    <img src="/assets/img/close.svg" alt="close" onClick={onClose} />
                </div>
                <div className="popupWithChoice__label">
                    Выберите транспорт
                </div>
                <div className="popupWithChoice__content">
                    <AutoList list={list} choice={true} onClickChoice={(item) => onClickChoice(item)} listClassName="genericList__result--popup"/>
                    <Pagination
                        currentPage={ onClickCurrentPage }
                        totalPages={onClickTotalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default PopupWithChoice;