import { createMemoryHistory } from "history";
import { autorizationStore } from "../stores/AutorizationStore";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { renderWithRouter } from "./helpers/renderWithRouter";

jest.mock("react-toastify", () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn()
    }
}));

describe("Авторизация", () => {
    let history;

    beforeEach(() => {
        jest.restoreAllMocks();
        autorizationStore.reset();
        localStorage.clear();
        history = createMemoryHistory();
    });

    const fillElements = async (email, password) => {
        const inputEmail = screen.getByPlaceholderText(/почта/i);
        const inputPassword = screen.getByPlaceholderText(/пароль/i);
        const button = screen.getByRole("button", { name: /войти/i });

        await userEvent.type(inputEmail, email);
        await userEvent.type(inputPassword, password);
        await userEvent.click(button);
    };

    test("Успешная авторизация", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ access_token: "aass" }),
            })
        );

        render(renderWithRouter(null, '/auth')); // Рендерим компонент

        await fillElements("user@example.com", "SecurePass123");

        expect(localStorage.getItem("accessToken")).toBe("aass");
        expect(history.location.pathname).toBe('/');
    });

    test("Ошибка авторизации (неверные данные)", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: "Неверный логин или пароль" }),
            })
        );

        render(renderWithRouter(null, '/auth'));

        await fillElements("wrongUser@example.com", "wrongPass");

        expect(localStorage.getItem("accessToken")).toBeNull();
        expect(toast.error).toHaveBeenCalledWith("Неверный логин или пароль");
    });
});
