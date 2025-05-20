import TopBar from "../../TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AutoList from "../../carrierLists/AutoList";
import { autoStore } from "../../../stores/AutoStore";
import { useEffect, useState } from "react";
import Pagination from "../../Pagination";
import { deleteTransport, getDetailsTransport } from "../../../api/autoService";
import { toast } from "react-toastify";
import Popup from "../../popups/Popup";

const AutoListPage = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [popupData, setPopupData] = useState({ isOpen: false, item: null });

    const loadTransportList = async (page = autoStore.getCurrentPage()) => {
        try {
            setIsLoading(true);
            autoStore.setCurrentPage(page);
            await autoStore.fetchTransportList(page);
        } catch (error) {
            console.error("Ошибка загрузки списка транспорта:", error);
        } finally {
            setIsLoading(false);
        };
    };

    useEffect(() => {
        loadTransportList();
    }, [location.pathname]);

    const openPopup = (item) => {
        setPopupData({ isOpen: true, item });
    };

    const closePopup = () => {
        setPopupData({ isOpen: false, item: null });
    };

    const handleDeleteClick = async () => {
        try {
            await deleteTransport(popupData.item.id);
            closePopup();
            loadTransportList();
            toast.success('Успешно удалено');
        } catch (error) {
            console.log(error);
            toast.error('Ошибка, попробуйте позже');
        }
    }


    return (
        <div className="autoList">
            <div className="container">
                <Popup
                    isOpen={popupData.isOpen}
                    text='Вы действительно хоите удалить эту запись?'
                    typePopup='del'
                    onClose={closePopup}
                    onConfirm={handleDeleteClick}
                />
                <TopBar />
                <h2 className="autoList__title">Ваши машины</h2>
                {isLoading ? (
                    <div className="autoList__empty">
                        <p className="autoList__subtitle">Загрузка списка...</p>
                    </div>
                ) : autoStore.transportList.length > 0 ? (
                    <div className="autoList__content">
                        <AutoList
                            list={autoStore.transportList}
                            onClickEdit={(item) => navigate(`/auto/edit/${item.id}`)}
                            onClickDelete={ openPopup }
                        />
                        <Pagination
                            currentPage={autoStore.getCurrentPage()}
                            totalPages={autoStore.getTotalPages()}
                            onPageChange={(page) => loadTransportList(page)}
                        />
                    </div>
                ) : (
                    <div className="autoList__empty">
                        <p className="autoList__empty-subtitle">У вас нет созданного транспорта.</p>
                        <button className="autoList__empty-button" onClick={() => navigate('/auto/add')}>Перейти к созданию</button>
                    </div>
                )}
            </div>
        </div>
    )
});

export default AutoListPage; 