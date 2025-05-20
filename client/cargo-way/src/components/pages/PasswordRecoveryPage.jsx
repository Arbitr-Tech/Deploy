import { observer } from "mobx-react-lite";
import PasswordRecoveryForm from "../forms/PasswordRecoveryForm";
import { passwordRecoveryStore } from "../../stores/PasswordRecoveryStore";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { passwordRecovery } from "../../api/authService";

const PasswordRecoveryPage = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        passwordRecoveryStore.setPasswordFormData(name, value)
    };

    const handleOnSend = async () => {
        if (passwordRecoveryStore.passwordFormData.newPassword.length < 8) {
            toast.error('Пароль не должен быть менее 8 символов');
            return;
        };
        if (passwordRecoveryStore.passwordFormData.newPassword !== passwordRecoveryStore.passwordFormData.newPasswordRepeat) {
            toast.error('Пароли не совпадают');
            return;
        };

        const token = new URLSearchParams(location.search).get('token');
        try {
            await passwordRecovery(token, { "newPassword": passwordRecoveryStore.passwordFormData.newPassword });
            toast.success("Пароль успешно изменён");
            passwordRecoveryStore.reset();
            navigate("/auth");
        } catch (error) {
            if (error.message.includes("Недействительная ссылка!")) {
                toast.error("Недействительная ссылка! Запросите новую ссылку.");
            } else {
                toast.error("Произошла ошибка. Попробуйте позже");
            };
            return;
        }
    };

    return (
        <div className="passwordRecovery">
            <div className="container">
                <PasswordRecoveryForm formData={passwordRecoveryStore.passwordFormData} onChange={handleOnChange} onSend={handleOnSend} />
            </div>
        </div>
    )
});

export default PasswordRecoveryPage;