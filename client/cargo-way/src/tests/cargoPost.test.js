import { cargoStore } from "../stores/CargoStore";
import { renderWithRouter } from "./helpers/renderWithRouter";
import { render, screen } from "@testing-library/react";
import * as cargoService from "../api/cargoService";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";

jest.mock("../api/cargoService", () => ({
    addCargo: jest.fn()
}));

jest.mock("react-toastify", () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn()
    }
}));

const fillElements = async (readyDate, deliveryDate) => {
    const inputName = await screen.findByPlaceholderText("Укажите груз");
    const inputWeight = await screen.findByPlaceholderText("Вес (т)");
    const inputVolume = await screen.findByPlaceholderText("Объем (куб.м)");
    const inputLength = await screen.findByPlaceholderText("Длина (м)");
    const inputWidth = await screen.findByPlaceholderText("Ширина (м)");
    const inputHeight = await screen.findByPlaceholderText("Высота (м)");
    const inputDesc = await screen.findByPlaceholderText("Опишите груз");
    const inputReady = await screen.findByLabelText("Возможная загрузка");
    const inputDelivery = await screen.findByLabelText("Возможная выгрузка");
    const inputFrom = await screen.findByLabelText("Место загрузки");
    const inputTo = await screen.findByLabelText("Место выгрузки");

    const radios = screen.getAllByRole("radio", { name: "Option 2" });

    const inputPay = await screen.findByPlaceholderText("Укажите ставку");
    const inputPayType = await screen.findByLabelText("Без НДС, безнал");

    await userEvent.type(inputName, "Тестовый груз");
    await userEvent.type(inputWeight, "123");
    await userEvent.type(inputVolume, "123");
    await userEvent.type(inputLength, "123");
    await userEvent.type(inputWidth, "123");
    await userEvent.type(inputHeight, "123");
    await userEvent.type(inputDesc, "fghjuioplkm");
    await userEvent.type(inputReady, readyDate);
    await userEvent.type(inputDelivery, deliveryDate);
    await userEvent.type(inputFrom, "ghjkl;");
    await userEvent.type(inputTo, "ghjkриl;");

    for (const radio of radios) {
        await userEvent.click(radio);
    }

    await userEvent.type(inputPay, "456");
    await userEvent.click(inputPayType);

    const submitButton = await screen.findByRole("button", { name: /создать запись/i });
    await userEvent.click(submitButton);
}

describe("CargoPostPage", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        cargoStore.resetFormData();
    });

    test("Успешное добавление груза", async () => {
        cargoService.addCargo.mockResolvedValue({ id: 123 });

        render(renderWithRouter(null, '/cargo/add'));

        await fillElements("2025-12-03", "2025-12-21");

        expect(cargoService.addCargo).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith("Успешно создано");
    });

    test("Ошибка добавления груза", async () => {
        cargoService.addCargo.mockRejectedValue(new Error("Ошибка добавления"));

        render(renderWithRouter(null, '/cargo/add'));

        await fillElements("2025-04-16", "2025-12-21");

        expect(toast.error).toHaveBeenCalledWith("Дата готовности не может быть в прошлом");
    });
});
