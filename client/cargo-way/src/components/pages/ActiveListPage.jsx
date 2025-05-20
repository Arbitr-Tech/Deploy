import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import TopBar from "../TopBar";
import ListItems from "../listsTemplates/ListItems";
import { userStore } from "../../stores/UserStore";
import { listStore } from "../../stores/ListStore";
import Pagination from "../Pagination";

const ActiveListPage = observer(({ typePage = "active" }) => {
    const navigate = useNavigate();
    const role = userStore.role;
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    const getListType = () => {
        if (role === "CUSTOMER") return "EXTERNAL";
        return typePage === "active" ? "ACTIVE" : "WAITING";
    };

    const loadCargoList = async (page = listStore.getCurrentPage(getListType())) => {
        try {
            setIsLoading(true);

            const listType = getListType();

            listStore.setCurrentPage(listType, page);

            await (role === "CUSTOMER"
                ? listStore.fetchCargoList(listType, page)
                : listStore.fetchCargoListFromCarrier(listType, page));

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
        if (item.visibilityStatus === "IN_PROGRESS") {
            if (role === "CUSTOMER") {
                return [{ label: "Перейти", onClick: () => navigate(`/customer/info/active/${item.id}`) }];
            } else {
                return [{ label: "Перейти", onClick: () => navigate(`/carrier/info/active/${item.id}`) }];
            }
        } else {
            if (role === "CUSTOMER") {
                return [{ label: "Перейти", onClick: () => navigate(`/respond/${item.id}`) }];
            } else {
                return [{ label: "Перейти", onClick: () => navigate(`/carrier/info/respond/${item.id}`) }];
            }
        }
    };

    return (
        <div className="cargoList">
            <div className="container">
                <TopBar />
                <h2 className="cargoList__title">{`${typePage === "active" ? "Активные" : "Ждут ответа"}`}</h2>
                {isLoading ? (
                    <div className="cargoList__empty">
                        <p className="cargoList__subtitle">Загрузка списка...</p>
                    </div>
                ) : listStore.cargoLists[getListType()].length > 0 ? (
                    <div className="cargoList__content">
                        {typePage === "active" ?
                            <ListItems
                                list={role === "CUSTOMER" ? listStore.cargoLists.EXTERNAL : listStore.cargoLists.ACTIVE}
                                type={role === "CUSTOMER" ? "myListCargo" : "main"}
                                getButtons={getButtonsByStatus}
                            />
                            :
                            <ListItems
                                list={listStore.cargoLists[getListType()]}
                                type="main"
                                getButtons={getButtonsByStatus}
                            />
                        }
                        <Pagination
                            currentPage={listStore.getCurrentPage(getListType())}
                            totalPages={listStore.getTotalPages(getListType())}
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

export default ActiveListPage;
