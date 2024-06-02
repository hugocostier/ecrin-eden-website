import PropTypes from 'prop-types'
import { useState } from 'react'
import StyledComponents from 'styled-components'
import { ConfirmationForm } from './ConfirmationForm'
import { DateSelection } from './DateSelection'
import { InformationForm } from './InformationForm'
import { ServiceSelection } from './ServiceSelection'
import { TimeSelection } from './TimeSelection'

const FORM_STEPS = [
    {
        title: 'Select a Service',
        component: ServiceSelection,
    },
    {
        title: 'Select a Date',
        component: DateSelection,
    },
    {
        title: 'Select a Time',
        component: TimeSelection,
    },
    {
        title: 'Enter Your Information',
        component: InformationForm,
    },
    {
        title: 'Review and Confirm',
        component: ConfirmationForm,
    }
]

export const ReservationForm = ({ searchParams, setSearchParams }) => {
    const [step, setStep] = useState(1)
    const [formValues, setFormValues] = useState(searchParams)

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    const StepComponent = FORM_STEPS[step - 1].component

    return (
        <>
            <FormContainer>
                <FormHeader>
                    <h2>{FORM_STEPS[step - 1].title}</h2>
                </FormHeader>

                <StepComponent
                    searchParams={formValues}
                    setSearchParams={setFormValues}
                    nextStep={nextStep}
                    prevStep={prevStep}
                />
            </FormContainer>
        </>
    )
}

ReservationForm.propTypes = {
    searchParams: PropTypes.object.isRequired,
    setSearchParams: PropTypes.func.isRequired,
}

const FormContainer = StyledComponents.div`

`

const FormHeader = StyledComponents.header`

`