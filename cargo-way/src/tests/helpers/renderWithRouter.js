import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from "../../routes/AppRouter"

export const renderWithRouter = (component, initialRoute = '/') => {
    return (
        <MemoryRouter initialEntries={[initialRoute]}>
            <AppRouter />
            {component}
        </MemoryRouter>
    )
}