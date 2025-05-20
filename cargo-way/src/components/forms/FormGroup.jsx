import React from "react";

const FormGroup = ({ label, children, image, modification }) => (
    <label className={`formGroup ${modification ? `formGroup--${modification}` : ''}`}>
        <span className="formGroup__label">{label}</span>
        <div className={`formGroup__group ${modification ? `formGroup__group--${modification}` : ''} ${image ? 'formGroup__group--img' : ''}`}>
            {children}
        </div>
    </label>

);

export default FormGroup;