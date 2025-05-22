import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { listStore } from "../../../stores/ListStore";
import { deleteCargo, getDetailsCargo, publishCargo, unpublishCargo } from "../../../api/cargoService";
import { cargoStore } from "../../../stores/CargoStore";
import Pagination from "../../Pagination";
import { toast } from "react-toastify";
import ListItems from "../../listsTemplates/ListItems";
import Popup from "../../popups/Popup";

const GeneralListPage = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const [popupData, setPopupData] = useState({ isOpen: false, text: "", type: "", item: null });
    const [isLoading, setIsLoading] = useState(true);

    const loadCargoList = async (page = listStore.getCurrentPage("INTERNAL")) => {
        try {
            setIsLoading(true);
            listStore.setCurrentPage("INTERNAL", page);
            await listStore.fetchCargoList("INTERNAL", page);
        } catch (error) {
            console.error("Ошибка загрузки списка грузов:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCargoList();
    }, [location.pathname]);

    const getButtonsByStatus = (item) => {
        if (item.visibilityStatus === "PUBLISHED") {
            return [
                {
                    label: "Удалить",
                    onClick: () =>
                        openPopup("Перед удалением необходимо снять запись с публикации", "auth", null),
                },
                {
                    label: "Снять с публикации",
                    onClick: () =>
                        openPopup("Вы действительно хотите снять с публикации?", "change", item),
                },
                {
                    label: "Редактировать",
                    onClick: () =>
                        openPopup("Перед редактированием запись будет снята с публикации автоматически. Продолжить?", "edit", item),
                },
            ];
        } else {
            return [
                {
                    label: "Удалить",
                    onClick: () =>
                        openPopup("Вы действительно хотите удалить эту запись?", "del", item),
                },
                {
                    label: "Опубликовать",
                    onClick: () =>
                        openPopup("Вы действительно хотите опубликовать эту запись?", "change", item),
                },
                {
                    label: "Редактировать",
                    onClick: () => handleEditClick(item)
                },
            ];
        }
    };


    const openPopup = (text, type, item) => {
        setPopupData({ isOpen: true, text, type, item });
    };

    const closePopup = () => {
        setPopupData({ isOpen: false, text: "", type: "", item: null });
    };

    const handleEditClick = async (item) => {
        try {
            if (popupData.item && popupData.item.visibilityStatus === "PUBLISHED"){
                item = popupData.item;
                await unpublishCargo(popupData.item.id);
                closePopup();
            };
            navigate(`/cargo/edit/${item.id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteClick = async () => {
        if (!popupData.item) return;
        try {
            await deleteCargo(popupData.item.id);
            closePopup();
            toast.success("Успешно удалено")
            await loadCargoList();
        } catch (error) {
            console.error("Ошибка при удалении груза:", error);
        }
    };

    const handlePublishClick = async () => {
        if (!popupData.item) return;
        try {
            if (popupData.item.visibilityStatus === "DRAFT") {
                await publishCargo(popupData.item.id);
            } else {
                await unpublishCargo(popupData.item.id);
            };
            closePopup();
            await loadCargoList();
        } catch (error) {
            console.error("Ошибка при изменении статуса груза:", error);
        }
    };

    return (
        <div className="cargoList" id="main">
            <Popup
                isOpen={popupData.isOpen}
                text={popupData.text}
                typePopup={popupData.type}
                onClose={closePopup}
                onConfirm={popupData.type === "del"
                    ? handleDeleteClick
                    : popupData.type === "edit"
                        ? handleEditClick
                        : handlePublishClick
                }
            />
            <h2 className="cargoList__title">Общие записи</h2>
            {isLoading ? (
                <div className="cargoList__empty">
                    <p className="cargoList__subtitle">Загрузка списка...</p>
                </div>
            ) : listStore.cargoLists.INTERNAL.length > 0 ? (
                <div className="cargoList__content">
                    <ListItems
                        list={listStore.cargoLists.INTERNAL}
                        type="myListCargo"
                        getButtons={getButtonsByStatus}
                    />
                    <Pagination
                        currentPage={listStore.getCurrentPage("INTERNAL")}
                        totalPages={listStore.getTotalPages("INTERNAL")}
                        onPageChange={(page) => loadCargoList(page)}
                    />
                </div>
            ) : (
                <div className="cargoList__empty">
                    <p className="cargoList__empty-subtitle">У вас нет грузов без откликов</p>
                    <button className="cargoList__empty-button" onClick={() => navigate('/cargo/add')}>Перейти к созданию</button>
                </div>

            )}
        </div>
    );
});

export default GeneralListPage;
