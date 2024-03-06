import { AuthProvider } from './hooks/useAuth'

import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom'

import {
    certificationLoader,
    contactLoader,
    giftCardLoader,
    homeLoader,
    priceLoader,
    serviceLoader
} from './data'

import {
    AdminRoot,
    ClientRoot,
    StoreRoot
} from './layouts'

import * as page from './pages'

// import { PrivateRoute } from './components/PrivateRoute'

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProvider />} >
            <Route
                path='/'
                element={<StoreRoot />}
                errorElement={<page.ErrorPage />}
            >
                <Route
                    index={true}
                    element={<page.HomePage />}
                    loader={homeLoader}
                />

                <Route
                    path='services'
                    element={<page.ServicesPage />}
                    loader={serviceLoader}
                />

                <Route
                    path='prices'
                    element={<page.PricesPage />}
                    loader={priceLoader}
                />

                <Route
                    path='gift-cards'
                    element={<page.GiftCardsPage />}
                    loader={giftCardLoader}
                />

                <Route
                    path='certification'
                    element={<page.CertificationPage />}
                    loader={certificationLoader}
                />

                <Route
                    path='contact'
                    element={<page.ContactPage />}
                    loader={contactLoader}
                />
            </Route>

            <Route
                path='/login'
                element={<page.LoginRegisterPage />}
                errorElement={<page.ErrorPage />}
            />

            {/* <Route element={<PrivateRoute />} > */}
            <Route
                path='/user'
                element={<ClientRoot />}
                errorElement={<page.ErrorPage />}
            >
                <Route
                    index={true}
                    element={<page.MyDashboard />}
                />

                <Route
                    path='appointments'
                    element={<page.MyAppointments />}
                />

                <Route
                    path='preferences'
                    element={<page.MyPreferences />}
                />

                <Route
                    path='account'
                    element={<page.AccountPage />}
                />

                <Route
                    path='settings'
                    element={<page.SettingsPage />}
                />
            </Route>
            {/* </Route> */}

            {/* <Route element={<PrivateRoute />} > */}
            <Route
                path='/admin'
                element={<AdminRoot />}
                errorElement={<page.ErrorPage />}
            >
                <Route
                    index={true}
                    element={<page.AdminDashboard />}
                />

                <Route
                    path='appointments'
                >
                    <Route
                        index={true}
                        element={<page.AdminAppointments />}
                    />


                    <Route
                        path=':id'
                        element={<page.SeeAppointment />}
                    />

                    <Route
                        path='add'
                        element={<page.AddAppointment />}
                    />

                    <Route
                        path='update/:id'
                        element={<page.UpdateAppointment />}
                    />
                </Route>

                <Route
                    path='clients'
                >
                    <Route
                        index={true}
                        element={<page.AdminClients />}
                    />

                    <Route
                        path=':id'
                        element={<page.SeeClient />}
                    />

                    <Route
                        path='add'
                        element={<page.AddClient />}
                    />

                    <Route
                        path='update/:id'
                        element={<page.UpdateClient />}
                    />
                </Route>

                <Route
                    path='content'
                >
                    <Route
                        index={true}
                        element={<page.AdminContent />}
                    />

                    <Route
                        path='update/:id'
                        element={<page.UpdateContent />}
                    />
                </Route>

                <Route
                    path='account'
                    element={<page.AccountPage />}
                />

                <Route
                    path='settings'
                    element={<page.SettingsPage />}
                />
            </Route>
            {/* </Route> */}
        </Route>
    )
)

export const App = () => {
    return (
        <RouterProvider router={Router} /> // Add fallback element for when the page is loading
    )
}