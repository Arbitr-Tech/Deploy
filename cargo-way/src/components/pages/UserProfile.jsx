import { observer } from "mobx-react-lite";
import TopBar from "../TopBar";
import ReviewsList from "../listsTemplates/ReviewsList";
import Pagination from "../Pagination";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileData } from "../../api/profileService";
import { otherProfileStore } from "../../stores/OtherProfileStore";
import { userStore } from "../../stores/UserStore";
import PopupWithRating from "../popups/PopupWithRating";
import { popupStore } from "../../stores/PopupStore";
import { delReview, editReview } from "../../api/reviewService";
import { toast } from "react-toastify";
import { toJS } from "mobx";
import Popup from "../popups/Popup";

const UserProfile = observer(() => {

    const param = useParams();
    const id = param.id;
    const location = useLocation();
    const [typeList, setTypeList] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [popupWithRating, setPopupWithRating] = useState({ isOpen: false, itemId: '' });
    const [popup, setPopup] = useState({ isOpen: false, itemId: '' });

    useEffect(() => {
        async function loadAllData() {
            try {
                setIsLoading(true);
                await otherProfileStore.fetchProfileData(id);
                const userData = await getProfileData();
                userStore.setUserFormData(userData);
                await loadReviewsList();
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
                toast.error("Не удалось загрузить данные");
            } finally {
                setIsLoading(false);
            }
        };
        loadAllData();
    }, [id, location.pathname]);

    useEffect(() => {
        loadReviewsList(1); // или другая логика
    }, [typeList]);

    const getListType = () => {
        return typeList === "all" ? "ALL" : "MINE";
    };

    const openPopup = (id, type) => {
        if (type === 'rating') {
            setPopupWithRating({ isOpen: true, itemId: id });
        } else {
            setPopup({isOpen: true, itemId: id})
        }
    };

    const closePopup = (type) => {
        if (type === 'rating') {
            setPopupWithRating({ isOpen: false, itemId: '' });
        } else {
            setPopup({isOpen: false, itemId: '' })
        }
    };

    const loadReviewsList = async (page = otherProfileStore.getCurrentPage(getListType())) => {
        try {
            setIsLoading(true);
            const listType = getListType();
            otherProfileStore.setCurrentPage(listType, page);
            await otherProfileStore.fetchReviewsList(id, listType, page);
        } catch (error) {
            console.error("Ошибка загрузки списка грузов:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClickEdit = (item) => {
        try {
            popupStore.setReviewFromServer(item);
            openPopup(item.id, 'rating');
        } catch (error) {
            toast.error("Ошибка, попробуйте позже");
            console.log(error);
        }
    };

    const handleReview = ({ target: { name, value } }) => {
        popupStore.setReviewField(name, value);
    };

    const handleClickEditSend = async () => {
        try {
            const data = popupStore.getUpdatedFields();
            await editReview(popupWithRating.itemId, toJS(data));
            toast.success("Успешно!");
            closePopup('rating');
            loadReviewsList();
        } catch (error) {
            toast.error("Ошибка, попробуйте позже");
            console.log(error);
        }
    };

    const handleDelete = async() => {
        try {
            await delReview(popup.itemId);
            toast.success("Успешно удалено");
            closePopup('del');
            loadReviewsList();
        } catch (error) {
            toast.error("Ошибка, попробуйте позже");
            console.log(error);
        }
    };

    return (
        <div className="userProfile">
            <div className="container">
                <Popup
                    isOpen={popup.isOpen}
                    text='Вы действительно хотите удалить этот отзыв?'
                    typePopup='del'
                    onClose={() => closePopup('del')}
                    onConfirm={handleDelete}
                />
                <PopupWithRating
                    isOpen={popupWithRating.isOpen}
                    data={popupStore.review}
                    onChange={handleReview}
                    onSend={handleClickEditSend}
                    onClickRating={(value) => handleReview(
                        { target: { name: 'rating', value } }
                    )}
                    onClose={() => closePopup('rating')}
                />
                <TopBar />
                <div className="userProfile__inner">
                    <div className="userProfile__inner-info">
                        <h2 className="userProfile__info-title">Профиль пользователя</h2>
                        <div className="userProfile__info-data">
                            <p className="userProfile__info-item">Имя пользователя: <span>{otherProfileStore.profileData.username}</span></p>
                            <p className="userProfile__info-item">Правовая форма: <span>{otherProfileStore.profileData.legalType === "INDIVIDUAL" ? "Физическое лицо" : "Юридическое лицо"}</span></p>
                            <p className="userProfile__info-item">Системный рейтинг: <span>{otherProfileStore.profileData.systemRating}</span></p>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="userProfile__empty">
                            <p className="userProfile__subtitle">Загрузка отзывов...</p>
                        </div>
                    ) : (
                        <div className="userProfile__inner-reviews">
                            <ReviewsList
                                list={otherProfileStore.comment[getListType()]}
                                onClickAll={() => setTypeList('all')}
                                onClickMy={() => setTypeList('my')}
                                typeButton={typeList}
                                name={userStore.userFormData.individual ? userStore.userFormData.individual.fullName : userStore.userFormData.company?.name}
                                text='Отзывов нет'
                                onClickEdit={(item) => handleClickEdit(item)}
                                onClickDel={(item) => openPopup(item.id, 'del')}
                            />
                            <Pagination
                                currentPage={otherProfileStore.getCurrentPage(getListType())}
                                totalPages={otherProfileStore.getTotalPages(getListType())}
                                onPageChange={(page) => { loadReviewsList(page) }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
});

export default UserProfile;