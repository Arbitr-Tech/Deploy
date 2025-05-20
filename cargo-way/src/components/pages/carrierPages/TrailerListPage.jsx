import TopBar from "../../TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Pagination from "../../Pagination";
import { toast } from "react-toastify";
import { trailerStore } from "../../../stores/TrailerStore";
import TrailerList from "../../carrierLists/TrailerList";
import { deleteTrailer } from "../../../api/trailerService";
import Popup from "../../popups/Popup";

const TrailerListPage = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [popupData, setPopupData] = useState({ isOpen: false, item: null });

    const loadTrailerList = async (page = trailerStore.getCurrentPage()) => {
        try {
            setIsLoading(true);
            trailerStore.setCurrentPage(page);
            await trailerStore.fetchTrailerList(page);
        } catch (error) {
            console.error("Ошибка загрузки списка прицепов:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openPopup = (item) => {
        setPopupData({ isOpen: true, item });
    };

    const closePopup = () => {
        setPopupData({ isOpen: false, item: null });
    };

    useEffect(() => {
        loadTrailerList();
    }, [location.pathname]);

    const handleDeleteClick = async () => {
        try {
            await deleteTrailer(popupData.item.id);
            closePopup();
            loadTrailerList();
            toast.success('Успешно удалено');
        } catch (error) {
            console.log(error);
            toast.error('Ошибка, попробуйте позже');
        }
    }

    return (
        <div className="trailerPage">
            <div className="container">
                <TopBar />
                <Popup
                    isOpen={popupData.isOpen}
                    text='Вы действительно хотите удалить эту запись?'
                    typePopup='del'
                    onClose={closePopup}
                    onConfirm={handleDeleteClick}
                />
                <h2 className="trailerPage__title">Ваши прицепы</h2>
                {isLoading ? (
                    <div className="trailerPage__empty">
                        <p className="trailerPage__subtitle">Загрузка списка...</p>
                    </div>
                ) : trailerStore.trailerList.length > 0 ? (
                    <div className="trailerPage__content">
                        <TrailerList
                            list={trailerStore.trailerList}
                            onClickEdit={(item) => {navigate(`/trailer/edit/${item.id}`)}}
                            onClickDelete={openPopup}
                        />
                        <Pagination
                            currentPage={trailerStore.getCurrentPage()}
                            totalPages={trailerStore.getTotalPages()}
                            onPageChange={(page) => loadTrailerList(page)}
                        />
                    </div>
                ) : (
                    <div className="trailerPage__empty">
                        <p className="trailerPage__empty-subtitle">У вас нет созданных прицепов.</p>
                        <button className="trailerPage__empty-button" onClick={() => navigate("/trailer/add")}>Перейти к созданию</button>
                    </div>

                )}
            </div>
        </div>
    )
});

export default TrailerListPage; 