import { observer } from "mobx-react-lite";
import TopBar from "../TopBar";
import { cargoStore } from "../../stores/CargoStore";
import InfoAboutOrder from "../InfoAboutOrder";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { cancelOrder, cancelResponseByCarrier, endResponseByCarrier, endResponseByCustomer, getDetailsCargo } from "../../api/cargoService";
import Popup from "../popups/Popup";
import { responseStore } from "../../stores/ResponseStore";
import { toast } from "react-toastify";
import PopupWithRating from "../popups/PopupWithRating";
import { popupStore } from "../../stores/PopupStore";
import { addRewiew } from "../../api/reviewService";
import { toJS } from "mobx";
import { getDetailsTransport } from "../../api/autoService";
import { validatePopupWithRating } from "../../validation/validations";

const InfoOrderPage = observer(({ typePage }) => {
    const param = useParams();
    const id = param.id;
    const location = useLocation();
    const navigate = useNavigate();
    const [popupData, setPopupData] = useState({ isOpen: false, text: "", type: "" });
    const [popupWithRating, setPopupWithRating] = useState(false);

    useEffect(() => {
        async function getData() {
            const data = await getDetailsCargo(id);
            cargoStore.setCargoFormDataFromServer(data.cargo);
            delete data.cargo;
            responseStore.setResponseFormDataFromServer(data);
            console.log(responseStore.response)
        };
        getData();
    }, [location.pathname]);

    useEffect(() => {
        return () => {
            cargoStore.resetFormData();
        };
    }, []);

    const handleClickCancel = () => {
        const text = typePage === 'carrier_biddings' ?
            'Вы действительно хотите отменить отклик?' :
            'Вы действительно хотите отменить заказ?';
        openPopup(text, 'del');
    };

    const handleClickCancelByCarrier = async () => {
        try {
            await cancelResponseByCarrier(id);
            toast.success("Успешно отменено");
            navigate('/carrier/list/active');
        } catch (error) {
            toast.error("Ошибка, попробуйте позже");
            console.log(error);
        }
    };

    const handleClickCancelOrder = async () => {
        try {
            await cancelOrder(id);
            toast.success("Успешно отменено");
            navigate('/customer/list/active');
        } catch (error) {
            toast.error("Ошибка, попробуйте позже");
            console.log(error);
        }
    };

    const handleClickEndByCarrier = async () => {
        const errors = validatePopupWithRating(popupStore.review);

        if (Object.keys(errors).length > 0) {
            console.log("Ошибки отправки отзыва:", errors);
            Object.values(errors).forEach(errorMessage => {
                toast.error(errorMessage);
            });
            return;
        }

        try {
            await endResponseByCarrier(id);
            await addRewiew(responseStore.response.owner.id, toJS(popupStore.review));
            toast.success("Успешно завершено. Ждем подтверждения от заказчика");
            navigate('/carrier/list/history');
        } catch (error) {
            toast.error("Ошибка, попробуйте позже");
            console.log(error);
        }
    };

    const handleClickEndByCustomer = async () => {
        const errors = validatePopupWithRating(popupStore.review);

        if (Object.keys(errors).length > 0) {
            console.log("Ошибки отправки отзыва:", errors);
            Object.values(errors).forEach(errorMessage => {
                toast.error(errorMessage);
            });
            return;
        }

        try {
            await endResponseByCustomer(id);
            await addRewiew(responseStore.response.executor.id, toJS(popupStore.review));
            toast.success("Успешно завершено");
            navigate('/cargo/list/history');
        } catch (error) {
            toast.error("Ошибка, попробуйте позже");
            console.log(error);
        }
    };

    const openPopup = (text, type) => {
        setPopupData({ isOpen: true, text, type });
    };

    const closePopup = () => {
        setPopupData({ isOpen: false, text: null, type: "" });
    };

    const handleConfirm = () => {
        if (typePage === 'carrier_biddings') return handleClickCancelByCarrier();
        if (typePage === 'customer_active' || typePage === 'carrier_active') return handleClickCancelOrder();
    }

    const handleEnd = () => {
        if (typePage === 'carrier_active') return handleClickEndByCarrier();
        if (typePage === 'customer_active') return handleClickEndByCustomer();
    }

    const handleReview = ({ target: { name, value } }) => {
        popupStore.setReviewField(name, value);
    };

    const handleClickSee = async () => {
        try {
            const data = await getDetailsTransport(responseStore.response.executorTransport.id);
            openPopup(data, 'detailsTransport');
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div className="cargoList">
            <div className="container">
                <Popup
                    isOpen={popupData.isOpen}
                    text={popupData.text}
                    typePopup={popupData.type}
                    onClose={closePopup}
                    onConfirm={handleConfirm}
                />
                <PopupWithRating
                    isOpen={popupWithRating}
                    data={popupStore.review}
                    onChange={handleReview}
                    onSend={handleEnd}
                    onClickRating={(value) => handleReview(
                        { target: { name: 'rating', value } }
                    )}
                    onClose={ () => setPopupWithRating(false) }
                />
                <TopBar />
                <h2 className="cargoList__title">Информация о заказе</h2>
                <InfoAboutOrder
                    {...cargoStore.cargoFormData}
                    from={cargoStore.cargoFormData.route.from}
                    to={cargoStore.cargoFormData.route.to}
                    length={cargoStore.cargoFormData.dimensions['length']}
                    width={cargoStore.cargoFormData.dimensions.width}
                    height={cargoStore.cargoFormData.dimensions.height}
                    onClickCancel={handleClickCancel}
                    onClickEnd={() => setPopupWithRating(true)}
                    customer={responseStore.response.owner ? responseStore.response.owner.profileName : ''}
                    carrier={responseStore.response.executor ? responseStore.response.executor.profileName : ''}
                    transport={responseStore.response.executorTransport ? `${responseStore.response.executorTransport.brand} ${responseStore.response.executorTransport.model}` : ''}
                    disabled={responseStore.response.endExecution === null}
                    disabledFromCarrier={responseStore.response.endExecution !== null}
                    idCarrier={responseStore.response.executor ? responseStore.response.executor.id : ''}
                    idCustomer={responseStore.response.owner ? responseStore.response.owner.id : ''}
                    onClickAuto={handleClickSee}
                    typePage={typePage} />
            </div>
        </div>
    );
});

export default InfoOrderPage;
