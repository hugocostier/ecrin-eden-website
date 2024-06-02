import { useSearchParams } from 'react-router-dom'
import StyleComponents from 'styled-components'
import { PageTitle } from '../../components'
import { ReservationForm } from '../../components/appointment-reservation'

const appointmentContent = {
    header: [
        {
            title: 'Prendre rendez-vous',
            images: [

            ]
        }
    ]
}

export const AppointmentPage = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        service: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
    })

    return (
        <>
            <PageTitle content={appointmentContent} pageName='appointment'></PageTitle>

            <AppointmentContent className='appointment-main'>
                <ReservationForm searchParams={searchParams} setSearchParams={setSearchParams} />
            </AppointmentContent>
        </>
    )
}

const AppointmentContent = StyleComponents.main`
    
`