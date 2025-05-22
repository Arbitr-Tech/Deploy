import FormGroup from "./FormGroup";
import Select from 'react-select';
import { useMask } from "@react-input/mask";

const DriverForm = ({ data, onChange, categoryChange }) => {

    const VALID_CATEGORIES = [
        'A', 'A1', 'B', 'BE', 'B1',
        'C', 'CE', 'C1', 'C1E',
        'D', 'DE', 'D1', 'D1E',
        'M', 'Tm', 'Tb'
    ];

    const customStyles = {
        container: (provided) => ({
            ...provided,
            maxWidth: '70%',
            marginLeft: '1rem',
            marginRigth: '1rem',
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
            color: '#2C2C2C',
            wordBreak: 'break-all',
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
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            width: '60%',
            overflow: 'hidden',
        }),
    };

    const inputLicenseNumberMask = useMask({
        mask: '____ ______',
        replacement: { _: /\d/ }, // разрешает латинские буквы и цифры
        // replacement: { _: /[a-zA-Z0-9]/ }, // разрешает латинские буквы и цифры
    });

    return (
        <div className="driverForm">
            <FormGroup label="ФИО" modification="driver">
                <input className="driverForm__input"
                    type="text"
                    name="fullName"
                    value={data.fullName || ""}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Категория водительских прав" modification="driver">
                <div className="driverForm__categories">
                    <Select
                        styles={customStyles}
                        isMulti
                        options={VALID_CATEGORIES.map(c => ({ value: c, label: c }))}
                        value={data.licenseCategory ? data.licenseCategory.split(',').map(c => ({ value: c, label: c })) : []}
                        onChange={selected => {
                            const value = selected.map(c => c.value).join(',');
                            onChange({
                                target: { name: 'licenseCategory', value }
                            })
                        }}
                        placeholder="Категории"
                    />
                </div>
            </FormGroup>
            <FormGroup label="Номер водительских прав" modification="driver">
                <input className="driverForm__input"
                    type="text"
                    name="licenseNumber"
                    value={data.licenseNumber || ""}
                    onChange={onChange}
                    ref={inputLicenseNumberMask}
                    placeholder="Например: 1111 111111"
                />
            </FormGroup>
            <FormGroup label="Дата выдачи водительских прав" modification="driver">
                <input className="driverForm__input"
                    type="date"
                    name="issueDate"
                    value={data.issueDate || ""}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Дата окончания срока действия" modification="driver">
                <input className="driverForm__input"
                    type="date"
                    name="expirationDate"
                    value={data.expirationDate || ""}
                    onChange={onChange}
                />
            </FormGroup>
        </div>
    )
}

export default DriverForm;