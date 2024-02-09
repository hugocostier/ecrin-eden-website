import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { certificationLoader, contactLoader, giftCardLoader, homeLoader, priceLoader, serviceLoader } from './data'
import { StoreRoot } from './layouts'
import { CertificationPage, ContactPage, ErrorPage, GiftCardsPage, HomePage, PricesPage, ServicesPage } from './pages'

const Router = createBrowserRouter(
    createRoutesFromElements(
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
    )
)
    // [
    // {
    //     path: '/', 
    //     element: <StoreRoot />,
    //     errorElement: <ErrorPage />, 
    //     children: [
    //         {
    //             index: true, 
    //             element: <HomePage />, 
    //         }, 
            // {
            //     path: 'about', 
            //     element: <About />,
            // }, 
            // {
            //     path: 'pricing', 
            //     element: <Pricing />, 
            // }, 
            // {
            //     path: 'giftcard', 
            //     element: <GiftCard />, 
            // }, 
            // {
            //     path: 'certification', 
            //     element: <Certification />, 
            // }, 
            // {
            //     path: 'contact', 
            //     element: <Contact />, 
            // }, 
            // {
            //     path: 'login', 
            //     element: <Login />, 
            // }, 
            // {
            //     path: 'dashboard', 
            //     element: <DashboardLayout queryClient={queryClient}/>, 
            //     children: [
            //         {
            //             path: 'admin', 
            //             element: <Admin />, 
            //         },
            //     ]
            // }, 
//         ] 
//     }, 
// ])

export const App = () => { 
    return (
        <RouterProvider router={Router} />
    )
}