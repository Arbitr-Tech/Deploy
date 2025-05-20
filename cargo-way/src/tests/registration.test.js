import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { renderWithRouter } from "./helpers/renderWithRouter";
import { registrationStore } from "../stores/RegistrationStore";

jest.mock("react-toastify", () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn()
    }
}));


describe("Регистрация", () => {

    beforeEach(() => {
        jest.restoreAllMocks();
        registrationStore.submitRegistration();
        localStorage.clear();
    });

    const fillElementsSuccess = async () => {
        const inputUserType = screen.getByRole('radio', { name: /юридическое лицо/i });
        const inputUserRole = screen.getByRole('radio', { name: /перевозчик/i });
        const inputUserName = screen.getByPlaceholderText(/логин/i);
        const inputPassword = screen.getByPlaceholderText(/пароль/i);
        const inputEmail = screen.getByPlaceholderText(/почта/i);
        const inputAgreement = screen.getByLabelText(/Соглашаюсь с условиями обработки данных/i);
        const button = screen.getByRole('button', { name: /Зарегистрироваться/i });

        await userEvent.click(inputUserType);
        await userEvent.click(inputUserRole);
        await userEvent.type(inputUserName, 'testuser');
        await userEvent.type(inputPassword, 'password123');
        await userEvent.type(inputEmail, 'test@example.com');
        await userEvent.click(inputAgreement);
        await userEvent.click(button);
    };

    const fillElementsWithoutConsent = async () => {
        const inputUserType = screen.getByRole('radio', { name: /юридическое лицо/i });
        const inputUserRole = screen.getByRole('radio', { name: /перевозчик/i });
        const inputUserName = screen.getByPlaceholderText(/логин/i);
        const inputPassword = screen.getByPlaceholderText(/пароль/i);
        const inputEmail = screen.getByPlaceholderText(/почта/i);
        const button = screen.getByRole('button', { name: /Зарегистрироваться/i });

        await userEvent.click(inputUserType);
        await userEvent.click(inputUserRole);
        await userEvent.type(inputUserName, 'testuser');
        await userEvent.type(inputPassword, 'password123');
        await userEvent.type(inputEmail, 'test@example.com');
        await userEvent.click(button);
    };

    test("Успешная регистрация", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ access_token: "aass" }),
            })
        );

        render(renderWithRouter(null, '/reg'));

        await fillElementsSuccess();

        expect(localStorage.getItem("accessToken")).toBe("aass");
    });

    test("Ошибка регистрации (нет подтверждения согласия на обработку)", async () => {
        render(renderWithRouter(null, '/reg'));

        await fillElementsWithoutConsent();

        expect(localStorage.getItem("accessToken")).toBeNull();
        expect(toast.error).toHaveBeenCalledWith("Необходимо согласиться с условиями обработки данных");
    });

    test("Ошибка регистрации (имя пользователя уже занято)", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: "duplicate key value violates unique constraint 'users_cargoway_username_key'" }),
            })
        );

        render(renderWithRouter(null, '/reg'));

        await fillElementsSuccess();

        expect(localStorage.getItem("accessToken")).toBeNull();
        expect(toast.error).toHaveBeenCalledWith("Имя пользователя уже занято. Выберите другое.");
    });
});
