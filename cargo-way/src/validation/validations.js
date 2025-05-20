const validateRegistration = (data, agreement) => {
    const errors = {};
    if (!data.legalType) errors.legalType = "Тип пользователя обязателен";
    if (!data.role) errors.role = "Выберите одну из ролей";
    if (!data.username || !/^.{5,50}$/.test(data.username)) errors.username = "Логин должен состоять от 5 до 50 символов";
    if (!data.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) errors.email = "Введите корректный email";
    if (!data.password || data.password.length < 8) errors.password = "Пароль должен быть не менее 8 символов";
    if (!agreement) errors.agreement = "Необходимо согласиться с условиями обработки данных";

    return errors;
};

const validateContactData = (data, isFirstTime = false) => {
    const errors = {};
    const { telegramLink, whatsappLink, phoneNumber } = data;

    if (isFirstTime) {
        if (!telegramLink) errors.telegramLink = "Ссылка на Telegram обязательна";
        if (!whatsappLink) errors.whatsappLink = "Ссылка на WhatsApp обязательна";
        if (!phoneNumber) errors.phoneNumber = "Номер телефона обязателен";
    }

    if (!/^(https?:\/\/)?(t\.me\/|@)[a-zA-Z0-9_]{5,}$/.test(telegramLink)) {
        errors.telegramLink = "Некорректная ссылка Telegram. Пример: @username или https://t.me/username";
    }

    if (whatsappLink && !/^(\+?\d{10,15})$/.test(whatsappLink)) {
        errors.whatsappLink = "Некорректная ссылка WhatsApp. Пример: 89991234567";
    }

    if (phoneNumber && !/^(\+?\d{10,15})$/.test(phoneNumber)) {
        errors.phoneNumber = "Введите номер телефона в формате 89991234567";
    }

    return errors;
}

const validateIndividaulData = (data, isFirstTime = false) => {
    const errors = {};
    const { fullName, passportNumber, issuedBy, issueDate, departmentCode, registrationAddress } = data;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isFirstTime) {
        if (!fullName) errors.fullName = "ФИО обязательно для заполнения";
        if (!passportNumber) errors.passportNumber = "Серия и номер паспорта обязательны для заполнения";
        if (!issuedBy) errors.issuedBy = "Укажите, кем выдан паспорт";
        if (!issueDate) errors.issueDate = "Укажите, когда был выдан паспорт";
        if (!departmentCode) errors.departmentCode = "Код подразделения обязателен дл заполнения";
        if (!registrationAddress) errors.registrationAddress = "Адрес регистрации обязателен для заполнения";
    }

    const cleanValuePassportNum = passportNumber.replace(/\s/g, '');

    if (!/^\d{10}$/.test(cleanValuePassportNum)) {
        errors.passportNum = "Серия и номер паспорта должны быть в формате: 1234 567891";
    }

    if (!/^\d{3}-\d{3}$/.test(departmentCode)) {
        errors.departmentCode = "Код подразделения должен быть в формате '000-000'";
    }

    const inputDate = new Date(issueDate);
    inputDate.setHours(0, 0, 0, 0);
    if (inputDate > today) errors.issueDate = "Дата выдачи паспорта не может быть позднее текущей даты";

    return errors;
}

const validateCompanyData = (data, isFirstTime = false) => {
    const errors = {};
    const { name, inn, ogrn, bic, correspondentAccount, registrationDate } = data;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Убираем время для точного сравнения дат

    if (isFirstTime) {
        if (!name) errors.name = "Название компании обязательно для заполнения";
        if (!inn) errors.inn = "ИНН обязателен для заполнения";
        if (!ogrn) errors.ogrn = "ОГРН обязателен для заполнения";
        if (!bic) errors.bic = "БИК обязателен для заполнения";
        if (!correspondentAccount) errors.correspondentAccount = "Корреспондентский счет обязателен для заполнения";
        if (!registrationDate) errors.registrationDate = "Укажите дату регистрации компании";
    }

    if (!/^\d{10}$/.test(inn)) {
        errors.inn = "ИНН должен содержать 10 цифр";
    }
    if (!/^\d{13}$/.test(ogrn)) {
        errors.ogrn = "ОГРН должен содержать 13 цифр";
    }
    if (!/^\d{9}$/.test(bic)) {
        errors.bic = "БИК должен содержать 9 цифр";
    }
    if (!/^\d{20}$/.test(correspondentAccount)) {
        errors.correspondentAccount = "Корреспондентский счет должен содержать 20 цифр";
    }

    const inputDate = new Date(registrationDate);
    inputDate.setHours(0, 0, 0, 0);
    if (inputDate > today) errors.registrationDate = "Дата регистрации не может быть позднее текущей даты";

    return errors;
}

const validateCargo = (data) => {
    const errors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!data.name) errors.name = "Название груза обязательно";
    if (!data.description) errors.description = "Описание обязательно";
    if (data.weight <= 0) errors.weight = "Вес должен быть положительным";
    if (data.volume <= 0) errors.volume = "Объем должен быть положительным";
    if (data.price <= 0) errors.price = "Цена должна быть положительной";
    if (!data.typePay) errors.typePay = "Укажите тип оплаты";
    if (!data.bodyType) errors.bodyType = "Выберите тип кузова";
    if (!data.loadType) errors.loadType = "Укажите тип загрузки";
    if (!data.unloadType) errors.unloadType = "Укажите тип выгрузки";

    if (!data.readyDate) {
        errors.readyDate = "Укажите дату готовности";
    } else {
        const readyDate = new Date(data.readyDate);
        readyDate.setHours(0, 0, 0, 0);
        if (readyDate < today) errors.readyDate = "Дата готовности не может быть в прошлом";
    }

    if (!data.deliveryDate) {
        errors.deliveryDate = "Укажите дату доставки";
    } else {
        const deliveryDate = new Date(data.deliveryDate);
        deliveryDate.setHours(0, 0, 0, 0);
        if (data.readyDate && deliveryDate < new Date(data.readyDate)) {
            errors.deliveryDate = "Дата доставки не может быть раньше даты готовности";
        }
    }

    if (!data.route.from) errors['route.from'] = "Укажите пункт отправления";
    if (!data.route.to) errors['route.to'] = "Укажите пункт назначения";
    if (data.route.from && data.route.to && data.route.from === data.route.to) {
        errors['route.to'] = "Пункты отправления и назначения не должны совпадать";
    }

    if (!data.dimensions.length) errors['dimensions.length'] = "Длина обязательна и должна быть положительной";
    if (!data.dimensions.width) errors['dimensions.width'] = "Ширина обязательна и должна быть положительной";
    if (!data.dimensions.height) errors['dimensions.height'] = "Высота обязательна и должна быть положительной";

    return errors;
};


const validateDriverData = (data) => {
    const errors = {};
    const { licenseCategory, licenseNumber, issueDate, expirationDate } = data;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Убираем время для точного сравнения дат

    if (!licenseCategory) errors.licenseCategory = "Категория прав обязательная для ввода";
    if (!licenseNumber || !/^\d{4} \d{6}$/.test(licenseNumber)) errors.licenseNumber = "Номер водительских прав содержать иметь 10 символов";
    // if (!licenseNumber || !/^[a-zA-Z0-9]{4} [a-zA-Z0-9]{6}$/.test(licenseNumber)) errors.licenseNumber = "Номер водительских прав содержать иметь 10 символов";

    if (!issueDate) {
        errors.issueDate = "Укажите дату выдачи";
    } else {
        const issue = new Date(issueDate);
        issue.setHours(0, 0, 0, 0);
        if (issue > today) errors.issueDate = "Дата выдачи не может быть позже сегодняшнего числа";
    }

    if (!expirationDate) {
        errors.expirationDate = "Укажите дату окончания срока выдачи";
    } else {
        const expiration = new Date(expirationDate);
        expiration.setHours(0, 0, 0, 0);
        if (issueDate && expiration < new Date(issueDate)) {
            errors.expirationDate = "Дата окончания не может быть раньше даты выдачи";
        }
    }

    return errors;
}

const validateTrailerData = (data) => {
    const errors = {};
    const { name, trailerNumber, liftingCapacity, bodyType, loadType, unloadType, length, width, height, volume } = data;

    if (!name) errors.name = "Модель прицепа обязательна";
    if (!/^[АВЕКМНОРСТУХ]{2}\d{4}$/.test(trailerNumber)) errors.trailerNumber = "Введите корректный номер прицепа";
    if (!trailerNumber) errors.trailerNumber = "Номер прицепа обязателен и должен иметь формат АА1111";
    if (!liftingCapacity) errors.liftingCapacity = "Укажите грузоподъемность";
    if (!bodyType) errors.bodyType = "Укажите тип кузова";
    if (!loadType) errors.loadType = "Укажите тип загрузки";
    if (!unloadType) errors.unloadType = "Укажите тип выгрузки";
    if (!length || length > 50) errors.length = "Длина обязательна и не должна превышать 50 метров";
    if (!width || width > 10) errors.width = "Ширина прицепа обязательна и не должна превышать 10 метров";
    if (!height || height > 10) errors.height = "Высота прицепа обязательна и не должна превышать 10 метров";
    if (!volume) errors.volume = "Укажите грузоподъемность";

    return errors;
}

const validateTransportData = (data, autoEmbeddedTrailer, autoAdditionalTrailers) => {
    const errors = {};
    const { driverId,
        brand,
        model,
        manufactureYear,
        transportNumber,
        embeddedTrailerDetails,
        trailersIds } = data;
    const currentYear = new Date().getFullYear();

    if (!driverId) errors.driverId = "Укажите водителя";
    if (!brand) errors.brand = "Укажите марку транспорта";
    if (!model) errors.model = "Укажите модель транспорта";
    if (!manufactureYear) {
        errors.manufactureYearNull = "Укажите год выпуска";
    } else {
        if(manufactureYear < 1900 || manufactureYear > currentYear) errors.manufactureYear = "Транспорт не может быть старше 1900 года и младше текущего года";
    }
    if (!/^\d{4}$/.test(manufactureYear)) errors.manufactureYear = "Укажите корректный год выпуска";
    if (!transportNumber || !/^[А-Я]{1}\d{3}[А-Я]{2}$/.test(transportNumber)) errors.transportNumber = "Номер транспорта обязателен и должен быть в формате: А111АА";

    if (autoEmbeddedTrailer) {
        if (!embeddedTrailerDetails.liftingCapacity || !embeddedTrailerDetails.bodyType
            || !embeddedTrailerDetails.loadType || !embeddedTrailerDetails.unloadType
            || !embeddedTrailerDetails.length || !embeddedTrailerDetails.width
            || !embeddedTrailerDetails.height || !embeddedTrailerDetails.volume
        ) errors.embeddedTrailerDetails = "Заполните все поля для встроенного прицепа";
        if (embeddedTrailerDetails.length > 50) errors.length = "Длина обязательна и не должна превышать 50 метров";
        if (embeddedTrailerDetails.width > 10) errors.width = "Ширина прицепа обязательна и не должна превышать 10 метров";
        if (embeddedTrailerDetails.height > 10) errors.height = "Высота прицепа обязательна и не должна превышать 10 метров";
    };

    if (autoAdditionalTrailers && trailersIds.length < 1) errors.trailersIds = "Выберите хотя бы один дополнительный прицеп";

    return errors;
}

const validatePopupWithRating = (data) => {
    const { comment, rating } = data;

    if (!comment.trim() || !rating) return {popup: 'Необходимо полностью заполнить отзыв'}

}

export { validateRegistration, validateContactData, validateCompanyData, validateIndividaulData, validateCargo, validateDriverData, validateTrailerData, validateTransportData, validatePopupWithRating };