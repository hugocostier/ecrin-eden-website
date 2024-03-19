import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Bounce, Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { PrivateRoute } from './components'
import { AuthProvider } from './context/auth.context'
import { certificationLoader, contactLoader, giftCardLoader, homeLoader, priceLoader, serviceLoader } from './data'
import { PrivateRoot, StoreRoot } from './layouts'
import * as page from './pages'

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
                path='login'
                element={<page.LoginRegisterPage />}
                errorElement={<page.ErrorPage />}
            />

            <Route element={<PrivateRoute isAllowed={['user', 'admin']} redirectPath='/login' />} >
                <Route
                    path='user'
                    element={
                        <PrivateRoot />
                    }
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
            </Route>

            <Route element={<PrivateRoute isAllowed={['admin']} redirectPath='/login' />} >
                <Route
                    path='/admin'
                    element={<PrivateRoot />}
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
            </Route>
        </Route>
    )
)

export const App = () => {
    return (
        // Add fallback element on the route provider for when the page is loading
        <>
            <RouterProvider router={Router} />
            <ToastContainer
                containerId='notification'
                position='bottom-right'
                newestOnTop
                autoClose={3000}
                pauseOnFocusLoss={false}
                transition={Slide}
            />
            <ToastContainer
                containerId='action-status'
                position='top-center'
                newestOnTop
                autoClose={3000}
                pauseOnFocusLoss={false}
                transition={Bounce}
            />
        </>
    )
}