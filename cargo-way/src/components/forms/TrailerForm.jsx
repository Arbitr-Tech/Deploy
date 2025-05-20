import { useMask } from "@react-input/mask";
import FormGroup from "./FormGroup";

const TrailerForm = ({ data, onChange }) => {

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

    const inputTrailerNumberMask = useMask({
        mask: 'AA____',
        replacement: {
            A: /[А-Яа-я]/,
            _: /\d/
        }
    })


    return (
        <div className="trailerForm">
            <div className="trailerForm__main">
                <FormGroup label="Прицеп">
                    <input className="trailerForm__input"
                        type="text"
                        name="name"
                        value={data.name || ""}
                        placeholder="Модель"
                        onChange={onChange}
                    />
                    <input className="trailerForm__input"
                        type="text"
                        name="trailerNumber"
                        value={data.trailerNumber || ""}
                        placeholder="Номер прицепа (AA1111)"
                        ref={inputTrailerNumberMask}
                        onChange={onChange}
                    />
                    <input className="trailerForm__input"
                        type="number"
                        name="liftingCapacity"
                        value={data.liftingCapacity === 0 ? '' : data.liftingCapacity}
                        placeholder="Грузоподъемность (т)"
                        onChange={onChange}
                    />
                </FormGroup>
                <div className="trailerForm__section">
                    <label className="trailerForm__label">
                        <span className="trailerForm__label-text">Тип кузова</span>
                        <div className="trailerForm__input-group">
                            {bodyType.map((option) => (
                                <label key={option.id} className="trailerForm__radiobox-label">
                                    <input className="radiobox"
                                        type="radio"
                                        name="bodyType"
                                        value={option.name || ""}
                                        checked={data.bodyType === option.name}
                                        onChange={onChange}
                                    />
                                    {option.name}
                                </label>
                            ))}
                        </div>
                    </label>
                    <label className="trailerForm__label">
                        <span className="trailerForm__label-text">Тип загрузки</span>
                        <div className="trailerForm__input-group">
                            {bodyType.map((option) => (
                                <label key={option.id} className="trailerForm__radiobox-label">
                                    <input className="trailerForm__radiobox"
                                        type="radio"
                                        name="loadType"
                                        value={option.name || ""}
                                        checked={data.loadType === option.name}
                                        onChange={onChange}
                                    />
                                    {option.name}
                                </label>
                            ))}
                        </div>
                    </label>
                    <label className="trailerForm__label">
                        <span className="trailerForm__label-text">Тип выгрузки</span>
                        <div className="trailerForm__input-group">
                            {bodyType.map((option) => (
                                <label key={option.id} className="trailerForm__radiobox-label">
                                    <input className="trailerForm__radiobox"
                                        type="radio"
                                        name="unloadType"
                                        value={option.name || ""}
                                        checked={data.unloadType === option.name}
                                        onChange={onChange}
                                    />
                                    {option.name}
                                </label>
                            ))}
                        </div>
                    </label>
                </div>
                <FormGroup label="Габариты">
                    <input className="trailerForm__input trailerForm__input--short"
                        type="number"
                        name="length"
                        value={data['length'] === 0 ? '' : data['length']}
                        placeholder="Длина (м)"
                        onChange={onChange}
                    />
                    <input className="trailerForm__input trailerForm__input--short"
                        type="number"
                        name="width"
                        value={data.width === 0 ? '' : data.width}
                        placeholder="Ширина (м)"
                        onChange={onChange}
                    />
                    <input className="trailerForm__input trailerForm__input--short"
                        type="number"
                        name="height"
                        value={data.height === 0 ? '' : data.height}
                        placeholder="Высота (м)"
                        onChange={onChange}
                    />
                    <input className="trailerForm__input trailerForm__input--short"
                        type="number"
                        name="volume"
                        value={data.volume === 0 ? '' : data.volume}
                        placeholder="Объем (куб.м)"
                        onChange={onChange}
                    />
                </FormGroup>
            </div>
        </div>
    )
};

export default TrailerForm;