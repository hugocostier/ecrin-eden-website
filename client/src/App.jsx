import { Suspense } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Bounce, Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { PrivateLogin } from './components/authentication/PrivateLogin'
import { AuthProvider } from './context/auth.context'
import { ClientProvider } from './context/client.context'
import { PasswordRecoveryProvider } from './context/passwordRecovery.context'
import { certificationLoader } from './data/store-front/certification.loader'
import { contactLoader } from './data/store-front/contact.loader'
import { giftCardLoader } from './data/store-front/giftcard.loader'
import { homeLoader } from './data/store-front/home.loader'
import { priceLoader } from './data/store-front/price.loader'
import { serviceLoader } from './data/store-front/service.loader'
import { StoreRoot } from './layouts/store-front/root.layout'
import { lazyLoad } from './utils/lazyLoad.util'

// STORE FRONT PAGES 
const HomePage = lazyLoad('../../src/pages/store-front/Home.page', 'HomePage')
const ServicesPage = lazyLoad('../../src/pages/store-front/Services.page', 'ServicesPage')
const PricesPage = lazyLoad('../../src/pages/store-front/Prices.page', 'PricesPage')
const GiftCardsPage = lazyLoad('../../src/pages/store-front/GiftCards.page', 'GiftCardsPage')
const CertificationPage = lazyLoad('../../src/pages/store-front/Certification.page', 'CertificationPage')
const ContactPage = lazyLoad('../../src/pages/store-front/Contact.page', 'ContactPage')
const LegalNoticePage = lazyLoad('../../src/pages/store-front/LegalNotice.page', 'LegalNoticePage')
const PrivacyPolicyPage = lazyLoad('../../src/pages/store-front/PrivacyPolicy.page', 'PrivacyPolicyPage')
const CookiePolicyPage = lazyLoad('../../src/pages/store-front/CookiePolicy.page', 'CookiePolicyPage')
const TermsOfServicePage = lazyLoad('../../src/pages/store-front/TermsOfService.page', 'TermsOfServicePage')

// APPOINTMENT RESERVATION PAGES
const AppointmentPage = lazyLoad('../../src/pages/store-front/Appointment.page', 'AppointmentPage')
import { ClientInformationPage } from './pages/store-front/appointment-reservation/ClientInfo.page'
import { AppointmentConfirmationPage } from './pages/store-front/appointment-reservation/Confirmation.page'
import { DateSelectionPage } from './pages/store-front/appointment-reservation/DateSelection.page'
import { ServiceSelectionPage } from './pages/store-front/appointment-reservation/ServiceSelection.page'
import { ThankYouPage } from './pages/store-front/appointment-reservation/ThankYou.page'
import { TimeSelectionPage } from './pages/store-front/appointment-reservation/TimeSelection.page'

// AUTHENTICATION PAGES
const LoginRegisterPage = lazyLoad('../../src/pages/authentication/Login.page', 'LoginRegisterPage')
const RecoverPassword = lazyLoad('../../src/pages/authentication/RecoverPassword.page', 'RecoverPassword')
const ResetPassword = lazyLoad('../../src/pages/authentication/ResetPassword.page', 'ResetPassword')
const VerifyEmailPage = lazyLoad('../../src/pages/authentication/VerifyEmail.page', 'VerifyEmailPage')

// USER DASHBOARD PAGES
const UserDashboard = lazyLoad('../../src/pages/private-dashboard/client-space/Dashboard.page', 'UserDashboard')
const UserAppointments = lazyLoad('../../src/pages/private-dashboard/client-space/appointments/Appointments.page', 'UserAppointments')
const UserSeeAppointment = lazyLoad('../../src/pages/private-dashboard/client-space/appointments/SeeAppointment.page', 'SeeAppointment')
const UserUpdateAppointment = lazyLoad('../../src/pages/private-dashboard/client-space/appointments/UpdateAppointment.page', 'UpdateAppointment')
const UserPreferences = lazyLoad('../../src/pages/private-dashboard/client-space/Preferences.page', 'UserPreferences')

// ADMIN DASHBOARD PAGES
const AdminDashboard = lazyLoad('../../src/pages/private-dashboard/admin-space/Dashboard.page', 'AdminDashboard')
const AdminAppointments = lazyLoad('../../src/pages/private-dashboard/admin-space/appointments/Appointments.page', 'AdminAppointments')
const SeeAppointment = lazyLoad('../../src/pages/private-dashboard/admin-space/appointments/SeeAppointment.page', 'SeeAppointment')
const AddAppointment = lazyLoad('../../src/pages/private-dashboard/admin-space/appointments/AddAppointment.page', 'AddAppointment')
const UpdateAppointment = lazyLoad('../../src/pages/private-dashboard/admin-space/appointments/UpdateAppointment.page', 'UpdateAppointment')
const AdminClients = lazyLoad('../../src/pages/private-dashboard/admin-space/clients/Clients.page', 'AdminClients')
const SeeClient = lazyLoad('../../src/pages/private-dashboard/admin-space/clients/SeeClient.page', 'SeeClient')
const AddClient = lazyLoad('../../src/pages/private-dashboard/admin-space/clients/AddClient.page', 'AddClient')
const UpdateClient = lazyLoad('../../src/pages/private-dashboard/admin-space/clients/UpdateClient.page', 'UpdateClient')
const AdminContent = lazyLoad('../../src/pages/private-dashboard/admin-space/content/Content.page', 'AdminContent')
const UpdateContent = lazyLoad('../../src/pages/private-dashboard/admin-space/content/UpdateContent.page', 'UpdateContent')

// SHARED PAGES 
const PrivateRoot = lazyLoad('../../src/layouts/private-dashboard/root.layout', 'PrivateRoot')
const PrivateRoute = lazyLoad('../../src/components/private-dashboard/PrivateRoute', 'PrivateRoute')
const AccountPage = lazyLoad('../../src/pages/private-dashboard/Account.page', 'AccountPage')
const SettingsPage = lazyLoad('../../src/pages/private-dashboard/Settings.page', 'SettingsPage')
const ErrorPage = lazyLoad('../../src/pages/Error.page', 'ErrorPage')

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProvider />} >
            <Route element={<ClientProvider />} >
                <Route
                    path='/'
                    element={<StoreRoot />}
                    errorElement={<ErrorPage />}
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

                    <Route>
                        <Route
                            index={true}
                            path='appointment/service'
                            element={
                                <AppointmentPage>
                                    <ServiceSelectionPage />
                                </AppointmentPage>
                            }
                        />

                        <Route
                            path='appointment/date'
                            element={
                                <AppointmentPage>
                                    <DateSelectionPage />
                                </AppointmentPage>
                            }
                        />

                        <Route
                            path='appointment/time'
                            element={
                                <AppointmentPage>
                                    <TimeSelectionPage />
                                </AppointmentPage>
                            }
                        />

                        <Route
                            path='appointment/info'
                            element={
                                <AppointmentPage>
                                    <ClientInformationPage />
                                </AppointmentPage>
                            }
                        />

                        <Route
                            path='appointment/confirm'
                            element={
                                <AppointmentPage>
                                    <AppointmentConfirmationPage />
                                </AppointmentPage>
                            }
                        />

                        <Route
                            path='appointment/thank-you'
                            element={
                                <AppointmentPage>
                                    <ThankYouPage />
                                </AppointmentPage>
                            }
                        />
                    </Route>

                    <Route
                        path='legal-notice'
                        element={<LegalNoticePage />}
                    />

                    <Route
                        path='privacy-policy'
                        element={<PrivacyPolicyPage />}
                    />

                    <Route
                        path='cookies'
                        element={<CookiePolicyPage />}
                    />

                    <Route
                        path='terms-of-service'
                        element={<TermsOfServicePage />}
                    />
                </Route>

                <Route element={<PasswordRecoveryProvider />}>
                    <Route
                        path='/login'
                        element={<LoginRegisterPage />}
                    />

                    <Route
                        path='/login/verify-email'
                        element={<VerifyEmailPage />}
                    />

                    <Route element={<PrivateLogin />} >
                        <Route
                            path='/recover-password'
                            element={<RecoverPassword />}
                        />

                        <Route
                            path='/reset-password'
                            element={<ResetPassword />}
                        />
                    </Route>
                </Route>

                <Route
                    path='/user'
                    element={<PrivateRoot />}
                    errorElement={<ErrorPage />}
                >
                    <Route
                        index={true}
                        element={
                            <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                <UserDashboard />
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
                            path=':id'
                            element={
                                <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                    <UserSeeAppointment />
                                </PrivateRoute>
                            }
                        />


                        <Route
                            path='update/:id'
                            element={
                                <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                    <UserUpdateAppointment />
                                </PrivateRoute>
                            }
                        />
                    </Route>

                    <Route
                        path='preferences'
                        element={
                            <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                <UserPreferences />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path='account'
                        element={
                            <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                <AccountPage />
                            </PrivateRoute>
                        }
                    />

                    <Route element={<PasswordRecoveryProvider />}>
                        <Route
                            path='settings'
                            element={
                                <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                    <SettingsPage />
                                </PrivateRoute>
                            }
                        />
                    </Route>
                </Route>

                <Route
                    path='/admin'
                    element={<PrivateRoot />}
                    errorElement={<ErrorPage />}
                >
                    <Route
                        index={true}
                        element={
                            <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                <AdminDashboard />
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
                                    <AdminAppointments />
                                </PrivateRoute>
                            }
                        />


                        <Route
                            path=':id'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <SeeAppointment />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path='add'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <AddAppointment />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path='update/:id'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <UpdateAppointment />
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
                                    <AdminClients />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path=':id'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <SeeClient />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path='add'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <AddClient />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path='update/:id'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <UpdateClient />
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
                                    <AdminContent />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path='update/:id'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <UpdateContent />
                                </PrivateRoute>
                            }
                        />
                    </Route>

                    <Route
                        path='account'
                        element={
                            <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                <AccountPage />
                            </PrivateRoute>
                        }
                    />

                    <Route element={<PasswordRecoveryProvider />}>
                        <Route
                            path='settings'
                            element={
                                <PrivateRoute isAllowed={['admin']} redirectPath='/login' >
                                    <SettingsPage />
                                </PrivateRoute>
                            }
                        />
                    </Route>
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