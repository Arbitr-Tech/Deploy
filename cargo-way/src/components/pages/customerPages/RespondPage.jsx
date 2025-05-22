import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { choiceCarrier, deleteCargo, getDetailsCargo, unpublishCargo } from "../../../api/cargoService";
import TopBar from "../../TopBar";
import { cargoStore } from "../../../stores/CargoStore";
import InfoAboutOrder from "../../InfoAboutOrder";
import ListCarrier from "../../listsTemplates/ListCarrier";
import Popup from "../../popups/Popup";
import { getDetailsTransport } from "../../../api/autoService";
import { toast } from "react-toastify";
import { responseStore } from "../../../stores/ResponseStore";

const RespondPage = observer(() => {
    const location = useLocation();
    const param = useParams();
    const id = param.id;
    const navigate = useNavigate();
    const [popupData, setPopupData] = useState({ isOpen: false, text: "", type: "", item: null });

    useEffect(() => {
        async function getData() {
            const data = await getDetailsCargo(id);
            cargoStore.setCargoFormDataFromServer(data.cargo);
            delete data.cargo;
            responseStore.setResponseFormDataFromServer(data);
        };
        getData();
    }, [location.pathname]);

    useEffect(() => {
        return () => {
            cargoStore.resetFormData();
            responseStore.resetFormData();
        };
    }, []);

    const openPopup = ({ text = '', type, item }) => {
        setPopupData({ isOpen: true, text, type, item });
    };

    const closePopup = () => {
        setPopupData({ isOpen: false, text: "", type: "", item: null });
    };

    const handleClickSee = async (item) => {
        try {
            const data = await getDetailsTransport(item.transportDetails.id);
            openPopup({type: 'detailsTransport', item: data});
        } catch (error) {
            console.log(error);
        };
    };

    const handleClickChoice = async (item) => {
        try {
            await choiceCarrier(id, item.id);
            toast.success("Перевозчик принят");
            navigate("/cargo/list/active");
        } catch (error) {
            toast.error("Ошибка, попробуйте позже");
            console.log(error);
        };
    };

    const handleClickDraft = async () => {
        try {
            await unpublishCargo(id);
            toast.success("Успешно снято");
            navigate('/customer/list/active');
        } catch (error) {
            toast.error("Ошибка, попробуйте позже");
            console.log(error);
        }
    };

    const handleClickDel = async () => {
        try {
            await deleteCargo(id);
            toast.success("Успешно удалено");
            navigate('/customer/list/active');
        } catch (error) {
            toast.error("Ошибка, попробуйте позже");
            console.log(error);
        }
    };

    return (
        <div className="respondPage">
            <div className="container">
                <Popup
                    isOpen={popupData.isOpen}
                    text={popupData.text !== '' ? popupData.text : popupData.item}
                    typePopup={popupData.type}
                    onClose={closePopup}
                    onConfirm={ handleClickDel }
                />
                <TopBar />
                <div className="respondPage__inner">
                    <InfoAboutOrder
                        {...cargoStore.cargoFormData}
                        typePage='customer_biddings'
                        from={cargoStore.cargoFormData.route.from}
                        to={cargoStore.cargoFormData.route.to}
                        length={cargoStore.cargoFormData.dimensions['length']}
                        width={cargoStore.cargoFormData.dimensions.width}
                        height={cargoStore.cargoFormData.dimensions.height}
                        onClickCancel={ handleClickDraft }
                        onClickEnd={() => openPopup({text: 'Вы действительно хотите удалить заказ?', type: 'del', item: null})}
                    />
                    <ListCarrier
                        listCarrier={responseStore.response.responses}
                        onClickSee={(item) => handleClickSee(item)}
                        onClickAccept={(item) => handleClickChoice(item)}
                        onClickProfile={(item) => navigate(`/userProfile/${item.responderDetails.id}`)}
                    />
                </div>
            </div>
        </div>
    );
});

export default RespondPage;
