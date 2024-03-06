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
    ClientRoot,
    StoreRoot
} from './layouts'

import {
    CertificationPage,
    ContactPage,
    ErrorPage,
    GiftCardsPage,
    HomePage,
    LoginRegisterPage,
    PricesPage,
    ServicesPage
} from './pages'

import { PrivateRoute } from './components/PrivateRoute'

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProvider />} >
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
            </Route>

            <Route
                path='/login'
                element={<LoginRegisterPage />}
                errorElement={<ErrorPage />}
            />

            <Route element={<PrivateRoute />} >
                <Route
                    path='/user'
                    element={<ClientRoot />}
                    errorElement={<ErrorPage />}
                >
                    <Route
                        index={true}
                        element={<ContactPage />}
                        loader={contactLoader}
                    />
                </Route>
            </Route>
        </Route>
    )
)

// {
//     path: 'dashboard', 
//     element: <DashboardLayout queryClient={queryClient}/>, 
//     children: [
//         {
//             path: 'admin', 
//             element: <Admin />, 
//         },
//     ]
// }

export const App = () => {
    return (
        <RouterProvider router={Router} /> // Add fallback element for when the page is loading
    )
}