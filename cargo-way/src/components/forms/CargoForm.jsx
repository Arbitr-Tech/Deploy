import { useEffect, useState } from "react";
import FormGroup from "./FormGroup";
import React from "react";

const CargoForm = ({ data, onChange, onNestedChange, onChangeImage, onLoadImage }) => {

    const bodyType = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
        { id: 25, name: "Option 5" },
        { id: 35, name: "Option 6" },
        { id: 43, name: "Option 7" },
        { id: 27, name: "Option 8" },
        { id: 32, name: "Option 9" },
        { id: 49, name: "Option 10" },
    ];

    const [previewImages, setPreviewImages] = useState([null, null, null, null, null]);
    const [localImages, setLocalImages] = useState([null, null, null, null, null]);
    const [loading, setLoading] = useState([false, false, false, false, false]);


    useEffect(() => {
        const serverPhotos = data.photos || [];
        const previews = serverPhotos.map((photo, index) => 
            localImages[index] || (photo.path ? `https://yourserver.com/${photo.path}` : null)
        );
    
        // Дополняем массив до 5 элементов
        while (previews.length < 5) {
            previews.push(null);
        }
    
        setPreviewImages(previews);
    }, [data.photos, localImages]);



    const handleFileUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading((prev) => {
            const newLoading = [...prev];
            newLoading[index] = true;
            return newLoading;
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            console.log("Чтение файла завершено");
            setLocalImages((prev) => {
                const newLocalImages = [...prev];
                newLocalImages[index] = reader.result; // Обновляем превью
                return newLocalImages;
            });
        };

        reader.readAsDataURL(file);// Чтение файла как Data URL

        try {
            const result = await onLoadImage(file);
            const updatedPhotos = [...(data.photos || [])];
            if (updatedPhotos[index]) {
                updatedPhotos[index] = { id: result.guid };
            } else {
                updatedPhotos.push({ id: result.guid });
            }

            onChangeImage("photos", updatedPhotos);
        } catch (error) {
            console.error("Ошибка при загрузке фото:", error);
        } finally {
            // Останавливаем анимацию загрузки
            setLoading((prev) => {
                const newLoading = [...prev];
                newLoading[index] = false;
                return newLoading;
            });
        }
    };

    const handleCancelUpload = (index) => {
        setLocalImages((prev) => {
            const newLocalImages = [...prev];
            newLocalImages[index] = null;
            return newLocalImages;
        });
    
        const updatedPhotos = (data.photos || []).filter((_, i) => i !== index);
        onChangeImage("photos", updatedPhotos);
    };
    


    return (
        <div className="cargoForm">
            <FormGroup label="Груз">
                <input className="cargoForm__input"
                    type="text"
                    name="name"
                    value={data.name || ''}
                    placeholder="Укажите груз"
                    onChange={onChange}
                />
                <input className="cargoForm__input cargoForm__input--short"
                    type="number"
                    name="weight"
                    value={data.weight === 0 ? '' : data.weight}
                    placeholder="Вес (т)"
                    onChange={onChange}
                />
                <input className="cargoForm__input cargoForm__input--short"
                    type="number"
                    name="volume"
                    value={data.volume === 0 ? '' : data.volume}
                    placeholder="Объем (куб.м)"
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Габариты">
                <input className="cargoForm__input"
                    type="number"
                    name="dimensions"
                    data-path="length"
                    value={data.dimensions['length'] === 0 ? '' : data.dimensions['length']}
                    placeholder="Длина (м)"
                    onChange={onNestedChange}
                />
                <input className="cargoForm__input cargoForm__input--short"
                    type="number"
                    name="dimensions"
                    data-path="width"
                    value={data.dimensions.width === 0 ? '' : data.dimensions.width}
                    placeholder="Ширина (м)"
                    onChange={onNestedChange}
                />
                <input className="cargoForm__input cargoForm__input--short"
                    type="number"
                    name="dimensions"
                    data-path="height"
                    value={data.dimensions.height === 0 ? '' : data.dimensions.height}
                    placeholder="Высота (м)"
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Описание груза">
                <textarea className="cargoForm__textarea"
                    type="text"
                    name="description"
                    value={data.description || ''}
                    placeholder="Опишите груз"
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Возможная загрузка">
                <input className="cargoForm__input"
                    type="date"
                    name="readyDate"
                    value={data.readyDate || ''}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Возможная выгрузка">
                <input className="cargoForm__input"
                    type="date"
                    name="deliveryDate"
                    value={data.deliveryDate || ''}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Место загрузки">
                <input className="cargoForm__input cargoForm__input--long"
                    type="text"
                    name="route"
                    data-path="from"
                    placeholder="Укажите населенный пункт и адрес"
                    value={data.route.from || ''}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Место выгрузки">
                <input className="cargoForm__input cargoForm__input--long"
                    type="text"
                    name="route"
                    data-path="to"
                    placeholder="Укажите населенный пункт и адрес"
                    value={data.route.to || ''}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <div className="cargoForm__section">
                <label className="cargoForm__label">
                    <span className="cargoForm__label-text">Тип кузова</span>
                    <div className="cargoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="cargoForm__radiobox-label">
                                <input className="cargoForm__radiobox"
                                    type="radio"
                                    name="bodyType"
                                    value={option.name || ''}
                                    checked={data.bodyType.includes(option.name)}
                                    onChange={onChange}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                </label>
                <label className="cargoForm__label">
                    <span className="cargoForm__label-text">Тип загрузки</span>
                    <div className="cargoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="cargoForm__radiobox-label">
                                <input className="cargoForm__radiobox"
                                    type="radio"
                                    name="loadType"
                                    value={option.name || ''}
                                    checked={data.loadType.includes(option.name)}
                                    onChange={onChange}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                </label>
                <label className="cargoForm__label">
                    <span className="cargoForm__label-text">Тип выгрузки</span>
                    <div className="cargoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="cargoForm__radiobox-label">
                                <input className="cargoForm__radiobox"
                                    type="radio"
                                    name="unloadType"
                                    value={option.name || ''}
                                    checked={data.unloadType.includes(option.name)}
                                    onChange={onChange}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                </label>
            </div>
            <FormGroup label="Ставка (рубли)">
                <input className="cargoForm__input"
                    type="number"
                    name="price"
                    placeholder="Укажите ставку"
                    value={data.price === 0 ? '' : data.price}
                    onChange={onChange}
                />
                <div className='cargoForm__radio'>
                    <label className='cargoForm__radio-label'>
                        <input className='cargoForm__radio-input'
                            type="radio"
                            name="typePay"
                            value="Без НДС, безнал"
                            checked={data.typePay === "Без НДС, безнал"}
                            onChange={onChange}
                        />
                        Без НДС, безнал
                    </label>
                    <label className='cargoForm__radio-label'>
                        <input className='cargoForm__radio-input'
                            type="radio"
                            name="typePay"
                            value="С НДС, безнал"
                            checked={data.typePay === "С НДС, безнал"}
                            onChange={onChange}
                        />
                        С НДС, безнал
                    </label>
                    <label className='cargoForm__radio-label'>
                        <input className='cargoForm__radio-input'
                            type="radio"
                            name="typePay"
                            value="Наличными"
                            checked={data.typePay === "Наличными"}
                            onChange={onChange}
                        />
                        Наличными
                    </label>
                </div>
            </FormGroup>
            <FormGroup label="Фото груза">
                <div className="cargoForm__photos">
                    {previewImages.map((image, index) => (
                        <div key={index} className="cargoForm__imgBox">
                            <input
                                className="cargoForm__input"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, index)}
                            />
                            {loading[index] ? (
                                <div className="cargoForm__loader"></div>
                            ) : image ? (
                                <div className="cargoForm__preview">
                                    <img className="cargoForm__image" src={image} alt={`Фото ${index + 1}`} />
                                    <button className="cargoForm__button" onClick={() => handleCancelUpload(index)}>Отмена</button>
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </FormGroup>
        </div>
    )
};

export default CargoForm;