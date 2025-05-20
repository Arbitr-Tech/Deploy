import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const VerificationSuccessPage = () => {

    return (
        <div className="verification">
            <div className="container">
                <div className="verification__boxImage">
                    <DotLottieReact
                        src="https://lottie.host/46024fd8-e544-4707-9a78-377db962a3ad/ifOk7pkaAJ.lottie"
                        loop
                        autoplay
                    />
                </div>
                <div className="verification__content">
                    <h2 className="verification__content-text">Подтверждение аккаунта прошло успешно!</h2>
                    <button className="verification__content-btn">Перейти на главную страницу</button>
                </div>
            </div>
        </div>
    )
}

export default VerificationSuccessPage;