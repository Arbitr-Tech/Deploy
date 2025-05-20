import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthorizationPage from '../components/pages/AuthorizationPage';
import RegistrationPage from '../components/pages/RegistrationPage';
import CargoPostPage from '../components/pages/customerPages/CagroPostPage';
import AutoPostPage from '../components/pages/carrierPages/AutoPostPage';
import AutoListPage from '../components/pages/carrierPages/AutoListPage';
import PasswordRecoveryPage from '../components/pages/PasswordRecoveryPage';
import ProfilePage from '../components/pages/ProfilePage';
import UserProfile from '../components/pages/UserProfile';
import ActiveListPage from '../components/pages/ActiveListPage';
import MainPage from '../components/pages/MainPage';
import DriverPostPage from '../components/pages/carrierPages/DriverPostPage';
import DriverListPage from '../components/pages/carrierPages/DriverListPage';
import TrailerPostPage from '../components/pages/carrierPages/TrailerPostPage';
import TrailerListPage from '../components/pages/carrierPages/TrailerListPage';
import InfoOrderPage from '../components/pages/InfoOrderPage';
import RespondPage from '../components/pages/customerPages/RespondPage';
import ProtectedRoute from './ProtectedRoute';
import HistoryListPage from '../components/pages/HistoryListPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='*' element={<MainPage />} />

            <Route
                path='/cargo/add'
                element={
                    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                        <CargoPostPage typePage='add' />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/cargo/list/history'
                element={
                    <ProtectedRoute allowedRoles={["CUSTOMER", "CARRIER"]}>
                        <HistoryListPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/cargo/list/active'
                element={
                    <ProtectedRoute allowedRoles={["CUSTOMER", "CARRIER"]}>
                        <ActiveListPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/cargo/edit/:id'
                element={
                    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                        <CargoPostPage typePage='edit' />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/customer/info/active/:id'
                element={
                    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                        <InfoOrderPage typePage='customer_active' />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/customer/info/history/:id'
                element={
                    <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                        <InfoOrderPage typePage='customer_history' />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/carrier/list/active'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER"]}>
                        <ActiveListPage typePage="respond" />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/carrier/info/active/:id'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER"]}>
                        <InfoOrderPage typePage='carrier_active' />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/carrier/info/history/:id'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER"]}>
                        <InfoOrderPage typePage='carrier_history' />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/carrier/info/respond/:id'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER"]}>
                        <InfoOrderPage typePage='carrier_biddings' />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/respond/:id'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER", "CUSTOMER"]}>
                        <RespondPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/driver/list'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER"]}>
                        <DriverListPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/driver/add'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER"]}>
                        <DriverPostPage typePage='add' />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/driver/edit/:id'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER"]}>
                        <DriverPostPage typePage='edit' />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/trailer/list'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER"]}>
                        <TrailerListPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/trailer/add'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER"]}>
                        <TrailerPostPage typePage='add' />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/trailer/edit/:id'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER"]}>
                        <TrailerPostPage typePage='edit' />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/auto/list'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER"]}>
                        <AutoListPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/auto/add'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER"]}>
                        <AutoPostPage typePage='add' />
                    </ProtectedRoute>
                }
            />
            <Route
                path='/auto/edit/:id'
                element={
                    <ProtectedRoute allowedRoles={["CARRIER"]}>
                        <AutoPostPage typePage='edit' />
                    </ProtectedRoute>
                }
            />

            <Route path='/reg' element={<RegistrationPage />} />
            <Route path='/auth' element={<AuthorizationPage />} />
            <Route path="/password-reset/" element={<PasswordRecoveryPage />} />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute allowedRoles={["CARRIER", "CUSTOMER"]}>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/userProfile/:id"
                element={
                    <ProtectedRoute allowedRoles={["CARRIER", "CUSTOMER"]}>
                        <UserProfile />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default AppRouter;