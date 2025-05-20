import { React, useEffect } from "react";
import { userStore } from "../../stores/UserStore";
import CompanyInfoForm from "../forms/profileForms/CompanyInfoForm";
import ContactInfoForm from "../forms/profileForms/ContactInfoForm";
import TopBar from "../TopBar";
import { observer } from "mobx-react-lite";
import { getProfileData, updateProfileData } from "../../api/profileService";
import { toJS } from "mobx";
import { toast } from "react-toastify";
import IndividualInfoForm from "../forms/profileForms/IndividualInfoForm";

const ProfilePage = observer(() => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfileData();
                console.log(data);
                userStore.setUserFormData(data);
                console.log("UF: ", userStore.userFormData);
            } catch (error) {
                console.log(error);
                toast.error('Произошла ошибка, попробуйте позже');
            }

        };

        fetchData();
    }, []);

    const handleNestedInputChange = ({ target: { name, dataset, value } }) => {
        userStore.setNestedFieldsData(name, dataset.path, value);
    };

    const handleClickMainInfoButton = async () => {
        try {
            const updatedData = userStore.getUpdatedFields();
            console.log(updatedData);
            const newData = await updateProfileData(toJS(updatedData));
            userStore.setUserFormData(newData);
            toast.success("Успешно")
        } catch (error) {
            console.log('Ошибка отправки изменений: ', error);
            userStore.reset();
            toast.error('Произошла ошибка, попробуйте позже');
        }
    }

    const getRoleName = (role) => {
        switch (role) {
            case 'CARRIER': return 'Перевозчик';
            case 'CUSTOMER': return 'Заказчик';
            default: return '';
        }
    };

    return (
        <div className="profile">
            <div className="container">
                <TopBar />
                <div className="profile__inner">
                    <div className="profile__userInfo">
                        <div className="profile__userInfo-main">
                            <h2 className="profile__main-title">Основная информация</h2>
                            <div className="profile__main-rating">
                                <p className="profile__rating-item">Рейтинг от пользователей: <span>{userStore.originalUserFormData?.userRating}</span></p>
                                <p className="profile__rating-item">Рейтинг системы: <span>{userStore.originalUserFormData?.systemRating}</span></p>
                            </div>
                            <div className="profile__main-data">
                                <p className="profile__data-item">Имя пользователя: <span>{userStore.originalUserFormData.userData?.username || ''}</span></p>
                                <p className="profile__data-item">Почта: <span>{userStore.originalUserFormData.userData?.email || ''}</span></p>
                                <p className="profile__data-item">
                                    Роль: <span>{getRoleName(userStore.originalUserFormData.userData?.role)}</span>
                                </p>
                            </div>
                        </div>
                        <div className="profile__userInfo-contact">
                            <ContactInfoForm
                                data={userStore.userFormData}
                                isNull={userStore.originalUserFormData.contactData === null}
                                onClickButton={handleClickMainInfoButton}
                                onNestedChange={handleNestedInputChange}
                            />
                        </div>
                    </div>
                    <div className="profile__companyInfo">
                        <CompanyInfoForm
                            data={userStore.userFormData}
                            isNull={userStore.originalUserFormData.company === null}
                            onClickButton={handleClickMainInfoButton}
                            onNestedChange={handleNestedInputChange}
                        />
                        <IndividualInfoForm
                            data={userStore.userFormData}
                            isNull={userStore.originalUserFormData.individual === null}
                            onClickButton={handleClickMainInfoButton}
                            onNestedChange={handleNestedInputChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
});

export default ProfilePage;