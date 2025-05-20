import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { userStore } from "../../stores/UserStore";
import { listStore } from "../../stores/ListStore";
import ListItems from "../listsTemplates/ListItems";
import Pagination from "../Pagination";
import TopBar from "../TopBar";

const HistoryListPage = observer(() => {
    const navigate = useNavigate();
    const role = userStore.role;
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    const loadCargoList = async (page = listStore.getCurrentPage("HISTORY")) => {
        try {
            setIsLoading(true);
            listStore.setCurrentPage("HISTORY", page);
            await (role === "CUSTOMER"
                ? listStore.fetchCargoList("HISTORY", page)
                : listStore.fetchCargoListFromCarrier("HISTORY", page));
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
        if (role === "CUSTOMER") {
            return [{ label: "Подробности", onClick: () => navigate(`/customer/info/history/${item.id}`) }];
        } else {
            return [{ label: "Подробности", onClick: () => navigate(`/carrier/info/history/${item.id}`) }];
        }

    };

    return (
        <div className="cargoList">
            <div className="container">
                <TopBar />
                <h2 className="cargoList__title">Архив</h2>
                {isLoading ? (
                    <div className="cargoList__empty">
                        <p className="cargoList__subtitle">Загрузка списка...</p>
                    </div>
                ) : listStore.cargoLists.HISTORY.length > 0 ? (
                    <div className="cargoList__content">
                        <ListItems
                            list={listStore.cargoLists.HISTORY}
                            type='myCargoList'
                            getButtons={getButtonsByStatus}
                        />
                        <Pagination
                            currentPage={listStore.getCurrentPage("HISTORY")}
                            totalPages={listStore.getTotalPages("HISTORY")}
                            onPageChange={(page) => { loadCargoList(page) }}
                        />
                    </div>
                ) : (
                    <div className="cargoList__empty">
                        <p className="cargoList__empty-subtitle">Список пуст</p>
                    </div>
                )}
            </div>
        </div>
    );
});

export default HistoryListPage;
