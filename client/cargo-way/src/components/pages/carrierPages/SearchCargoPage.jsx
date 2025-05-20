import { observer } from "mobx-react-lite";
import SearchForm from "../../forms/SearchForm";
import { motion } from "framer-motion";
import { searchStore } from "../../../stores/SearchStore";
import { listStore } from "../../../stores/ListStore";
import { useEffect, useState } from "react";
import { toJS } from "mobx";
import Pagination from "../../Pagination";
import Popup from "../../popups/Popup";
import { toast } from "react-toastify";
import ListItems from "../../listsTemplates/ListItems";
import { createResponse, getDetailsCargo } from "../../../api/cargoService";
import { autoStore } from "../../../stores/AutoStore";
import PopupWithChoice from "../../popups/PopupWithChange";
import { userStore } from "../../../stores/UserStore";

const SearchCargoPage = observer(() => {
    const [isLoading, setIsLoading] = useState(false);
    const role = userStore.role;
    const [popupData, setPopupData] = useState({ isOpen: false, text: "", type: "" });
    const [cargoId, setCargoId] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [popupChoice, setPopupChoice] = useState(false);

    useEffect(() => {
        return () => {
            searchStore.reset();
        };
    }, [searchStore]);

    useEffect(() => {
        if (!hasSearched) {
            const loadInitialData = async () => {
                try {
                    setIsLoading(true);
                    await listStore.fetchCargoListOfLatest();
                } catch (error) {
                    toast.error("Ошибка загрузки данных");
                    console.error("Ошибка:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            loadInitialData();
        }
    }, [hasSearched]);


    const handleInputChange = ({ target: { name, value, valueAsNumber, type } }) => {
        if (type === 'number') {
            const val = Math.max(0, valueAsNumber || 0);
            searchStore.setFormData(name, val);
        } else {
            searchStore.setFormData(name, value);
        }
    };

    const handleNestedInputChange = ({ target: { name, dataset, value } }) => {
        searchStore.setNestedFormData(name, dataset.path, value);
    };

    const handleSearchClick = () => {
        if (role === null) {
            openPopup("Для использования поиска необходимо авторизоваться", "auth");
            return;
        }
        handleSearch(1);
    };

    const handleDetailsClick = async (item) => {
        if (role === null) {
            openPopup("Необходимо авторизоваться, чтобы узнать детали заказа", "auth");
            return;
        }

        try {
            const data = await getDetailsCargo(item.id);
            openPopup(data.cargo, 'details');
            setCargoId(item.id);
        } catch (error) {
            toast.error("Ошибка, попробуйте позже");
            console.log(error);
        }
    };

    const handleSearch = async (page) => {
        try {
            setIsLoading(true);
            const data = toJS(searchStore.getFilledData());
            listStore.setCurrentPage("FILTERS", page);
            await listStore.fetchCargoListByFilters(data, page);
            setHasSearched(true);
        } catch (error) {
            toast.error("Ошибка поиска, попробуйте позже")
            console.error("Ошибка:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openPopup = (text, type) => {
        setPopupData({ isOpen: true, text, type });
    };

    const closePopup = () => {
        setPopupData({ isOpen: false, text: "", type: "" });
    };

    const loadTransportList = async (page = autoStore.getCurrentPage()) => {
        try {
            autoStore.setCurrentPage(page);
            await autoStore.fetchTransportList(page);
        } catch (error) {
            console.error("Ошибка загрузки списка транспорта:", error);
        };
    };

    const handleClickRespond = () => {
        loadTransportList();
        closePopup();
        setPopupChoice(true);
    };

    const handleClickChoice = async (item) => {
        try {
            console.log(cargoId);
            await createResponse(cargoId, item.id);
            setPopupChoice(false);
            toast.success('Отклик успешно отправлен');
            setCargoId('');
        } catch (error) {
            console.error("Ошибка отклика:", error);
            setPopupChoice(false);
            setCargoId('');
            if (error.message.includes("Запрос для данного заказа от текущего профиля был сделан")) {
                toast.error('Вы уже откликнулись на этот заказ');
            } else {
                toast.error("Ошибка. Попробуйте еще раз позже.");
            }
        };
    };

    const showSearchResults = hasSearched && listStore.cargoLists.FILTERS.length > 0;
    const showInitialList = !hasSearched && listStore.cargoLists.LATEST.length > 0;
    const showEmptyState = !isLoading && !showSearchResults && !showInitialList;


    return (
        <div className="searchPage">
            <Popup
                isOpen={popupData.isOpen}
                text={popupData.text}
                typePopup={popupData.type}
                onClose={closePopup}
                onRespond={handleClickRespond}
            />
            <PopupWithChoice
                isOpen={popupChoice}
                onClose={() => setPopupChoice(false)}
                onClickChoice={(item) => handleClickChoice(item)}
                list={autoStore.transportList}
                onClickCurrentPage={autoStore.getCurrentPage()}
                onClickTotalPages={autoStore.getTotalPages()}
                onPageChange={(page) => loadTransportList(page)}
            />
            <motion.div className="searchPage__formBox"
                initial={
                    {
                        scale: 0
                    }
                }
                whileInView={
                    {
                        scale: 1
                    }
                }
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <div className="searchPage__formBox-form">
                    <SearchForm
                        data={searchStore.formData}
                        onChange={handleInputChange}
                        onNestedChange={handleNestedInputChange}
                        onReset={() => {
                            searchStore.reset();
                            setHasSearched(false);
                        }}
                        onSearch={handleSearchClick}
                    />
                </div>
            </motion.div>
            {isLoading ? (
                <div className="searchPage__empty">
                    <p className="searchPage__subtitle">Загрузка списка...</p>
                </div>
            ) : showSearchResults ? (
                <div className="searchPage__list">
                    <h2 className="searchPage__list-title">Результаты поиска</h2>
                    <ListItems type="main" list={listStore.cargoLists.FILTERS} buttons={[{ label: "Узнать подробности", onClick: (item) => handleDetailsClick(item) }]} />
                    <Pagination
                        currentPage={listStore.getCurrentPage("FILTERS")}
                        totalPages={listStore.getTotalPages("FILTERS")}
                        onPageChange={(page) => handleSearch(page)}
                    />
                </div>
            ) : showInitialList ? (
                <div className="searchPage__list">
                    <h2 className="searchPage__list-title">Последние заказы от грузоотправителей</h2>
                    <ListItems
                        type="main"
                        list={listStore.cargoLists.LATEST}
                        buttons={[{ label: "Узнать подробности", onClick: handleDetailsClick }]}
                    />
                </div>
            ) : showEmptyState ? (
                <div className="searchPage__empty">
                    <p className="searchPage__subtitle">Ничего не найдено</p>
                </div>
            ) : null
            }
        </div >
    )
});

export default SearchCargoPage;