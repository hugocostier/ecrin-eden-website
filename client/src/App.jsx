import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Bounce, Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { PrivateRoute } from './components'
import { PrivateLogin } from './components/authentication/PrivateLogin'
import { AuthProvider } from './context/auth.context'
import { ClientProvider } from './context/client.context'
import { PasswordRecoveryProvider } from './context/passwordRecovery.context'
import { certificationLoader, contactLoader, giftCardLoader, homeLoader, priceLoader, serviceLoader } from './data'
import { PrivateRoot, StoreRoot } from './layouts'
import * as page from './pages'

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
                                <page.MyDashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path='appointments'
                        element={
                            <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                <page.MyAppointments />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path='preferences'
                        element={
                            <PrivateRoute isAllowed={['user']} redirectPath='/login' >
                                <page.MyPreferences />
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