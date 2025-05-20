import { useEffect } from "react";
import TopBar from "../../TopBar";
import AutoForm from "../../forms/AutoForm";
import { observer } from "mobx-react-lite";
import { autoStore } from "../../../stores/AutoStore";
import { loadFile } from "../../../api/commonService";
import { addAuto, getDetailsTransport, updateAuto } from "../../../api/autoService";
import { toJS } from "mobx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { validateTransportData } from "../../../validation/validations";
import { toast } from "react-toastify";


const AutoPostPage = observer(({ typePage }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const param = useParams();
    const id = param.id;

    useEffect(() => {
        async function getData() {
            const data = await getDetailsTransport(id);
            autoStore.setTransportFormDataFromServer(data);
        };
        if (!location.pathname.startsWith("/auto/edit")) {
            autoStore.resetFormData();
        } else {
            getData();
        };
        loadLists();
    }, [location.pathname]);

    const loadLists = async () => {
        try {
            await autoStore.fetchDriversListForTransport();
            await autoStore.fetchTrailersListForTransport();
        } catch (error) {
            console.log(error);
        };
    };

    const handleInputChange = ({ target: { name, value, type, valueAsNumber } }) => {
        if (type === "number") {
            const valNum = Math.max(0, valueAsNumber || 0);
            autoStore.setFormData(name, valNum);
        } else {
            autoStore.setFormData(name, value);
        }
    };

    const handleNestedInputChange = ({ target: { name, dataset, value, type, valueAsNumber } }) => {
        if (type === "number") {
            const valNum = Math.max(0, valueAsNumber || 0);
            autoStore.setNestedFormData(name, dataset.path, valNum);
        } else {
            autoStore.setNestedFormData(name, dataset.path, value);
        }

    };

    const handleButton = async () => {
        const errors = validateTransportData(autoStore.autoFormData, autoStore.autoEmbeddedTrailer, autoStore.autoAdditionalTrailers);

        if (Object.keys(errors).length > 0) {
            console.log("Ошибки отправки формы:", errors);
            Object.values(errors).forEach(errorMessage => {
                toast.error(errorMessage);
            });
            return;
        }

        try {
            if (typePage === 'add') {
                const data = autoStore.getFormData();
                await addAuto(toJS(data));
                navigate('/auto/list');
                toast.success("Успешно");
            } else {
                const data = autoStore.getUpdatedFields();
                await updateAuto(id, data);
                navigate('/auto/list');
                toast.success("Успешно");
            }
        } catch (error) {
            console.log('Ошибка отправки формы: ', error);
            toast.error("Ошибка, попробуйте позже");
        }
    };

    return (
        <div className="auto">
            <div className="container">
                <TopBar />
                <h2 className="auto__title">{typePage === 'add' ? 'Добавить машину' : 'Изменить машину'}</h2>
                <AutoForm
                    data={autoStore.autoFormData}
                    onChange={handleInputChange}
                    autoEmbeddedTrailer={autoStore.autoEmbeddedTrailer}
                    autoAdditionalTrailer={autoStore.autoAdditionalTrailers}
                    onNestedChange={handleNestedInputChange}
                    onClickButtonEmbeddedTrailer={() => autoStore.toggleAutoEmbeddedTrailer(typePage)}
                    onClickButtonAdditionalTrailer={() => autoStore.toggleAutoAdditionalTrailers(typePage)}
                    onLoadImage={loadFile}
                    onChangeImage={autoStore.setFormData}
                    typePage={typePage}
                    listDrivers={autoStore.driversListForTransport}
                    listTrailers={autoStore.trailersListForTransport}
                />
                <div className="auto__btnBox">
                    <button className="auto__button" onClick={handleButton}>{typePage === 'add' ? 'Создать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
});

export default AutoPostPage;