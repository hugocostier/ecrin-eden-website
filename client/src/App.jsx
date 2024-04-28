import { Suspense } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Bounce, Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { PrivateLogin } from './components/authentication/PrivateLogin'
import { AuthProvider } from './context/auth.context'
import { ClientProvider } from './context/client.context'
import { PasswordRecoveryProvider } from './context/passwordRecovery.context'
import { certificationLoader, contactLoader, giftCardLoader, homeLoader, priceLoader, serviceLoader } from './data'
import { StoreRoot } from './layouts/store-front/root.layout'
import * as page from './pages'
import { lazyLoad } from './utils/lazyLoad.util'

// STORE FRONT PAGES 
const HomePage = lazyLoad('../../src/pages/store-front/Home.page', 'HomePage')
const ServicesPage = lazyLoad('../../src/pages/store-front/Services.page', 'ServicesPage')
const PricesPage = lazyLoad('../../src/pages/store-front/Prices.page', 'PricesPage')
const GiftCardsPage = lazyLoad('../../src/pages/store-front/GiftCards.page', 'GiftCardsPage')
const CertificationPage = lazyLoad('../../src/pages/store-front/Certification.page', 'CertificationPage')
const ContactPage = lazyLoad('../../src/pages/store-front/Contact.page', 'ContactPage')
const AppointmentPage = lazyLoad('../../src/pages/store-front/Appointment.page', 'AppointmentPage')


// USER DASHBOARD PAGES
// const UserDashboard = lazyLoad('../../src/pages/private-dashboard/client-space/Dashboard.page', 'UserDashboard')
const UserAppointments = lazyLoad('../../src/pages/private-dashboard/client-space/appointments/Appointments.page', 'MyAppointments')
// const UserUpdateAppointment = lazyLoad('../../src/pages/private-dashboard/client-space/appointments/UpdateAppointment.page', 'UserUpdateAppointment')
// const UserPreferences = lazyLoad('../../src/pages/private-dashboard/client-space/Preferences.page', 'UserPreferences')

// ADMIN DASHBOARD PAGES


// SHARED PAGES 
const PrivateRoot = lazyLoad('../../src/layouts/private-dashboard/root.layout', 'PrivateRoot')
const PrivateRoute = lazyLoad('../../src/components/private-dashboard/PrivateRoute', 'PrivateRoute')
// const AccountPage = lazyLoad('../../src/pages/private-dashboard/Account.page', 'AccountPage')
// const SettingsPage = lazyLoad('../../src/pages/private-dashboard/Settings.page', 'SettingsPage')

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProvider />} >
            <Route element={<ClientProvider />} >
                <Route
                    path='/'
                    element={<StoreRoot />}
                    errorElement={<page.ErrorPage />}
                >
                    <Route
                        index={true}
                        element={<HomePage />}
                        loader={homeLoader}
                    />

                    <Route
                        path='services'
                        element={<ServicesPage />}
                        loader={serviceLoader}
                    />

                    <Route
                        path='prices'
                        element={<PricesPage />}
                        loader={priceLoader}
                    />

                    <Route
                        path='gift-cards'
                        element={<GiftCardsPage />}
                        loader={giftCardLoader}
                    />

                    <Route
                        path='certification'
                        element={<CertificationPage />}
                        loader={certificationLoader}
                    />

                    <Route
                        path='contact'
                        element={<ContactPage />}
                        loader={contactLoader}
                    />

                    <Route
                        path='appointment'
                        element={<AppointmentPage />}
                    // loader={contactLoader}
                    />
                </Route>

                <Route element={<PasswordRecoveryProvider />}>
                    <Route
                        path='/login'
                        element={<page.LoginRegisterPage />}
                    />

                    <Route element={<PrivateLogin />} >
                        <Route
                            path='/recover-password'
                            element={<page.RecoverPassword />}
                        />

                        <Route
                            path='/reset-password'
                            element={<page.ResetPassword />}
                        />
                    </Route>
                </Route>

                <Route
                    path='/user'
                    element={<PrivateRoot />}
                    errorElement={<page.ErrorPage />}
                >
                    <Route
                        index={true}
                        element={
                            <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                <page.UserDashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path='appointments'
                    >
                        <Route
                            index={true}
                            element={
                                <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                    <UserAppointments />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path='update/:id'
                            element={
                                <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                    <page.UserUpdateAppointment />
                                </PrivateRoute>
                            }
                        />
                    </Route>

                    <Route
                        path='preferences'
                        element={
                            <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                <page.UserPreferences />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path='account'
                        element={
                            <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                <page.AccountPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path='settings'
                        element={
                            <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                <page.SettingsPage />
                            </PrivateRoute>
                        }
                    />
                </Route>

                <Route
                    path='/admin'
                    element={<PrivateRoot />}
                    errorElement={<page.ErrorPage />}
                >
                    <Route
                        index={true}
                        element={
                            <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                <page.AdminDashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path='appointments'
                    >
                        <Route
                            index={true}
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <page.AdminAppointments />
                                </PrivateRoute>
                            }
                        />


                        <Route
                            path=':id'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <page.SeeAppointment />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path='add'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <page.AddAppointment />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path='update/:id'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <page.UpdateAppointment />
                                </PrivateRoute>
                            }
                        />
                    </Route>

                    <Route
                        path='clients'

                    >
                        <Route
                            index={true}
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <page.AdminClients />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path=':id'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <page.SeeClient />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path='add'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <page.AddClient />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path='update/:id'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <page.UpdateClient />
                                </PrivateRoute>
                            }
                        />
                    </Route>

                    <Route
                        path='content'

                    >
                        <Route
                            index={true}
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <page.AdminContent />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path='update/:id'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <page.UpdateContent />
                                </PrivateRoute>
                            }
                        />
                    </Route>

                    <Route
                        path='account'
                        element={
                            <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                <page.AccountPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path='settings'
                        element={
                            <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                <page.SettingsPage />
                            </PrivateRoute>
                        }
                    />
                </Route>
            </Route>
        </Route>
    )
)

export const App = () => {
    return (
        // Add fallback element on the route provider for when the page is loading
        <Suspense>
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
        </Suspense>
    )
}