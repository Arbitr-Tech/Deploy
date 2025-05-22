import { useEffect, useState } from "react";
import FormGroup from "./FormGroup";
import Select from 'react-select';
import { useMask } from "@react-input/mask";
import { useLocation } from "react-router-dom";

const AutoForm = ({ data, onChange, autoEmbeddedTrailer, autoAdditionalTrailer, onNestedChange, onClickButtonEmbeddedTrailer, onClickButtonAdditionalTrailer, onLoadImage, onChangeImage, typePage, listDrivers, listTrailers }) => {
    const bodyType = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
        { id: 24, name: "Option 5" },
        { id: 36, name: "Option 6" },
        { id: 47, name: "Option 7" },
        { id: 21, name: "Option 8" },
        { id: 34, name: "Option 9" },
        { id: 45, name: "Option 10" },
    ];

    const [uploadedImages, setUploadedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (typePage === 'edit' && data.imagesIds?.length > 0) {
            const newImages = data.imagesIds.map(photo => ({
                id: photo?.id,
                path: photo?.path,
                isNew: false
            }));

            if (JSON.stringify(newImages) !== JSON.stringify(uploadedImages)) {
                setUploadedImages(newImages);
                onChangeImage("imagesIds", newImages.map(img => img.id));
            };
        } else if (typePage === 'add') {
            setUploadedImages([]);
        }
    }, [location.pathname]);

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const filesToUpload = files.slice(0, 5 - uploadedImages.length);
        if (filesToUpload.length === 0) {
            alert('Можно загрузить не более 5 фотографий');
            return;
        };

        setIsLoading(true);

        try {
            const uploadPromises = filesToUpload.map(file =>
                onLoadImage(file)
                    .then(response => ({
                        id: response.id,
                        path: response.path,
                        isNew: true
                    }
                    ))
                    .catch(error => {
                        console.error('Ошибка загрузки фото:', error);
                        return null;
                    })
            );

            const newImages = (await Promise.all(uploadPromises)).filter(Boolean);
            const updatedImages = [...uploadedImages, ...newImages];
            setUploadedImages(updatedImages);
            onChangeImage("imagesIds", updatedImages.map(img => img.id));
        } finally {
            setIsLoading(false);
        };
    };

    const handleRemoveImage = (index) => {
        const updatedImages = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(updatedImages);
        onChangeImage("imagesIds", updatedImages.map(img => img.id));
    };

    const customStyles = {
        container: (provided) => ({
            ...provided,
            maxWidth: '70%',
            marginLeft: '1rem'
        }),
        control: (provided, state) => ({
            ...provided,
            flexDirection: 'column',
            alignItems: 'flex-start',
            borderColor: state.isFocused ? '#E9C17D' : '#2C2C2C', // ваши цвета
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#E9C17D',
            }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#2C2C2C'
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#2C2C2C',
            padding: '8px',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'rgba(233, 193, 125, 0.551)' : provided.backgroundColor,
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            marginLeft: '0.7rem',
            backgroundColor: '#E9C17D',
            width: '100%'
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            width: '100%',
            overflow: 'hidden',
        }),
    };

    const inputTransportNumberMask = useMask({
        mask: 'Ъ___ЪЪ',
        replacement: {
            _: /\d/,
            Ъ: /[А-Яа-я]/
        }
    })


    return (
        <div className="autoForm">
            <div className="autoForm__main">
                <FormGroup label="Автомобиль">
                    <input className="autoForm__input"
                        type="text"
                        name="brand"
                        value={data.brand || ""}
                        placeholder="Марка"
                        onChange={onChange}
                    />
                    <input className="autoForm__input"
                        type="text"
                        name="model"
                        value={data.model || ""}
                        placeholder="Модель"
                        onChange={onChange}
                    />
                    <input className="autoForm__input autoForm__input--short"
                        type="number"
                        name="manufactureYear"
                        value={data.manufactureYear === 0 ? "" : data.manufactureYear}
                        placeholder="Год выпуска"
                        onChange={onChange}
                    />
                </FormGroup>
                <FormGroup label="Номер автомобиля">
                    <input className="autoForm__input"
                        type="text"
                        name="transportNumber"
                        value={data.transportNumber || ""}
                        placeholder="A111AA"
                        onChange={onChange}
                        ref={inputTransportNumberMask}
                    />
                </FormGroup>
                <FormGroup label="Водитель">
                    <select className="autoForm__input"
                        name="driverId"
                        value={data.driverId || ""}
                        onChange={onChange}
                        placeholder='ghjk'
                    >
                        <option value="" disabled>Выберите водителя</option>
                        {listDrivers.map((option) => (
                            <option key={option.id} value={option.id}>{option.fullName}</option>
                        ))}
                    </select>
                </FormGroup>
                <div className="autoForm__photos">
                    <FormGroup label="Фото транспорта" modification='photo'>
                        <div className="autoForm__photos-btnBox">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                                disabled={uploadedImages.length >= 5 || isLoading}
                            />
                            <span className="autoForm__photos-button">Загрузить фото (макс. 5)</span>
                            {isLoading && <div className="autoForm__photos-loader"></div>}
                        </div>
                    </FormGroup>
                    <div className="autoForm__photos-gallery">
                        {uploadedImages.map((image, index) => (
                            <div key={index} className="autoForm__gallery-imgBox">
                                <div className="autoForm__gallery-preview">
                                    {image.path ? (
                                        <img
                                            src={`/uploads/${image.path}`} 
                                            alt={`Фото ${index + 1}`}
                                            className="autoForm__gallery-image"
                                        />
                                    ) : null}
                                    <button
                                        className="autoForm__gallery-button"
                                        onClick={(e) => {
                                            e.stopPropagation(); //  Блокируем всплытие
                                            handleRemoveImage(index);
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="autoForm__btnBox">
                    <button className="autoForm__btnBox-button" onClick={onClickButtonEmbeddedTrailer}>{autoEmbeddedTrailer ? `Отменить${typePage === 'edit' ? ' изменения встроенного прицепа' : ''}` : typePage === 'edit' ? 'Изменить встроенный прицеп' : 'Добавить встроенный прицеп'}</button>
                    <button className="autoForm__btnBox-button" onClick={onClickButtonAdditionalTrailer}>{autoAdditionalTrailer ? `Отменить${typePage === 'edit' ? ' изменения полуприцепа' : ''}` : typePage === 'edit' ? 'Изменить полуприцеп' : 'Добавить полуприцеп'}</button>
                </div>
            </div>
            {
                autoEmbeddedTrailer ? <div className="autoForm__trailer">
                    <h3 className="autoForm__trailer-label">Встроенный прицеп</h3>
                    <FormGroup label="Грузоподъемность (т)">
                        <input className="autoForm__input autoForm__input--short"
                            type="number"
                            name="embeddedTrailerDetails"
                            data-path="liftingCapacity"
                            value={data.embeddedTrailerDetails.liftingCapacity === 0 ? "" : data.embeddedTrailerDetails.liftingCapacity}
                            onChange={onNestedChange}
                        />
                    </FormGroup>
                    <FormGroup label="Габариты">
                        <input className="autoForm__input autoForm__input--short"
                            type="number"
                            name="embeddedTrailerDetails"
                            data-path="length"
                            value={data.embeddedTrailerDetails['length'] === 0 ? "" : data.embeddedTrailerDetails['length']}
                            placeholder="Длина (м)"
                            onChange={onNestedChange}
                        />
                        <input className="autoForm__input autoForm__input--short"
                            type="number"
                            name="embeddedTrailerDetails"
                            data-path="width"
                            value={data.embeddedTrailerDetails.width === 0 ? "" : data.embeddedTrailerDetails.width}
                            placeholder="Ширина (м)"
                            onChange={onNestedChange}
                        />
                        <input className="autoForm__input autoForm__input--short"
                            type="number"
                            name="embeddedTrailerDetails"
                            data-path="height"
                            value={data.embeddedTrailerDetails.height === 0 ? "" : data.embeddedTrailerDetails.height}
                            placeholder="Высота (м)"
                            onChange={onNestedChange}
                        />
                    </FormGroup>
                    <FormGroup label="Объем прицепа (куб.м)">
                        <input className="autoForm__input autoForm__input--short"
                            type="number"
                            name="embeddedTrailerDetails"
                            data-path="volume"
                            value={data.embeddedTrailerDetails.volume === 0 ? "" : data.embeddedTrailerDetails.volume}
                            onChange={onNestedChange}
                        />
                    </FormGroup>
                    <div className="autoForm__section">
                        <label className="autoForm__label">
                            <span className="autoForm__label-text">Тип кузова</span>
                            <div className="autoForm__input-group">
                                {bodyType.map((option) => (
                                    <label key={`body-${option.id}`} className="radiobox-label">
                                        <input
                                            type="radio"
                                            name="bodyTypeGroup"
                                            value={option.name}
                                            checked={data.embeddedTrailerDetails.bodyType === option.name}
                                            onChange={(e) => onNestedChange({
                                                target: {
                                                    name: "embeddedTrailerDetails",
                                                    dataset: { path: "bodyType" },
                                                    value: e.target.value
                                                }
                                            })}
                                        />
                                        {option.name}
                                    </label>
                                ))}
                            </div>
                        </label>
                        <label className="autoForm__label">
                            <span className="autoForm__label-text">Тип загрузки</span>
                            <div className="autoForm__input-group">
                                {bodyType.map((option) => (
                                    <label key={`load-${option.id}`} className="radiobox-label">
                                        <input
                                            type="radio"
                                            name="loadTypeGroup"
                                            value={option.name}
                                            checked={data.embeddedTrailerDetails.loadType === option.name}
                                            onChange={(e) => onNestedChange({
                                                target: {
                                                    name: "embeddedTrailerDetails",
                                                    dataset: { path: "loadType" },
                                                    value: e.target.value
                                                }
                                            })}
                                        />
                                        {option.name}
                                    </label>
                                ))}
                            </div>
                        </label>
                        <label className="autoForm__label">
                            <span className="autoForm__label-text">Тип выгрузки</span>
                            <div className="autoForm__input-group">
                                {bodyType.map((option) => (
                                    <label key={`unload-${option.id}`} className="radiobox-label">
                                        <input
                                            type="radio"
                                            name="unloadTypeGroup"
                                            value={option.name}
                                            checked={data.embeddedTrailerDetails.unloadType === option.name}
                                            onChange={(e) => onNestedChange({
                                                target: {
                                                    name: "embeddedTrailerDetails",
                                                    dataset: { path: "unloadType" },
                                                    value: e.target.value
                                                }
                                            })}
                                        />
                                        {option.name}
                                    </label>
                                ))}
                            </div>
                        </label>
                    </div>
                </div> : ''
            }
            {
                autoAdditionalTrailer ? <div className="autoForm__trailer autoForm__trailer--additional">
                    <h3 className="autoForm__trailer-label">Полуприцеп</h3>
                    <Select
                        styles={customStyles}
                        isMulti
                        options={listTrailers.map(t => ({ value: t.id, label: t.name }))}
                        value={data.trailersIds ? data.trailersIds.map(id => {
                            const driver = listTrailers.find(d => d.id === id);
                            return driver
                                ? { value: driver.id, label: driver.name }
                                : { value: id.toString(), label: `Unknown (${id})` };
                        }) : []}
                        onChange={selected => {
                            const value = selected.map(c => c.value);
                            onChange({
                                target: { name: 'trailersIds', value }
                            })
                        }}
                        placeholder="Номера прицепов"
                    />
                </div> : ''
            }
        </div >
    )
};

export default AutoForm;