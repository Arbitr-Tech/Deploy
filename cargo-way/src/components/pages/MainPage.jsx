import React from "react";
import TopBar from "../TopBar";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import GeneralListPage from "./customerPages/GeneralListPage";
import SearchCargoPage from "./carrierPages/SearchCargoPage";
import { userStore } from "../../stores/UserStore";

const MainPage = observer(() => {

    const getPageContent = () => {
        return userStore.role === "CUSTOMER"
            ? <GeneralListPage />
            : <SearchCargoPage />;
    };

    return (
        <div className="main">
            <div className="container">
                <div className="main__menu">
                    <div className="main__menu-topBar">
                        <TopBar />
                    </div>
                </div>
                <div className="main__text">
                    <h2 className="main__text-label">Транспорт для груза, груз для транспорта — <span>всё</span> у нас</h2>
                    <div className="main__text-link">
                        <p className="main__text-p">Наша платформа поможет вам быстро найти груз или транспорт. Просто, удобно и без лишних усилий.</p>
                        <a href="#content">{`Перейти к ${userStore.role === "CUSTOMER" ? "записям" : "поиску"}`}</a>
                    </div>
                </div>
                <div className="main__img">
                    <img src="/assets/img/truck.svg" alt="Truck" />
                </div>
                <motion.div className="main__content" id="content"
                    initial={
                        {
                            opacity: 0,
                            y: 100
                        }
                    }
                    whileInView={
                        {
                            opacity: 1,
                            y: 0
                        }
                    }
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    {getPageContent()}
                </motion.div>
                <div className="main__packageBox">
                    <div className="main__packageBox-header">
                        <motion.div
                            initial={
                                {
                                    opacity: 0,
                                    y: 100
                                }
                            }
                            whileInView={
                                {
                                    opacity: 1,
                                    y: 0
                                }
                            }
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <h2 className="main__packageBox-text">Логистика</h2>
                        </motion.div>
                        <motion.div
                            initial={
                                {
                                    opacity: 0,
                                    y: 100
                                }
                            }
                            whileInView={
                                {
                                    opacity: 1,
                                    y: 0
                                }
                            }
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="main__packageBox-img">
                                <img src="/assets/img/box.svg" alt="Box" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

        </div >
    )
});

export default MainPage;