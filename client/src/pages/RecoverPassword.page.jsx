import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecoveryContext } from '../context/passwordRecovery.context'

export const RecoverPassword = () => {
    const { email, otp } = useContext(RecoveryContext)

    const navigate = useNavigate()

    const [timerCount, setTimerCount] = useState(60)
    const [disable, setDisable] = useState(true)
    const [OTPInput, setOTPInput] = useState([0, 0, 0, 0])

    const resendOTP = () => {
        if (disable) return

        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/v1/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    recipient_email: email,
                    otp
                })
            })
                .then(res => res.json())
                .then(data => {
                    setDisable(true)
                    alert('Un nouveau code a été envoyé à votre adresse email')
                    setTimerCount(60)
                    resolve(data)
                })
                .catch(err => reject(err))
        })
    }

    const verifyOTP = () => {
        if (parseInt(OTPInput.join('')) === otp) {
            return navigate('/reset-password')
        }

        return alert('Code incorrect, veuillez réessayer ou demander un nouveau code')
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimerCount((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval)

                if (lastTimerCount <= 1) {
                    setDisable(false)
                }

                if (lastTimerCount <= 0) {
                    return lastTimerCount
                }

                return lastTimerCount - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [disable])

    return (
        <>
            <div className='flex justify-center items-center w-screen h-screen bg-gray-50'>
                <div className='bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl'>
                    <div className='mx-auto flex w-full max-w-md flex-col space-y-16'>
                        <div className='flex flex-col items-center justify-center text-center space-y-2'>
                            <div className='font-semibold text-3xl'>
                                <p>Email Verification</p>
                            </div>
                            <div className='flex flex-row text-sm font-medium text-gray-400'>
                                <p>We have sent a code to your email {email}</p>
                            </div>
                        </div>

                        <div>
                            <form>
                                <div className='flex flex-col space-y-16'>
                                    <div className='flex flex-row items-center justify-between mx-auto w-full max-w-xs'>
                                        <div className='w-16 h-16 '>
                                            <input
                                                maxLength='1'
                                                className='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700'
                                                type='text'
                                                name='
                                                id='
                                                onChange={(e) =>
                                                    setOTPInput([
                                                        e.target.value,
                                                        OTPInput[1],
                                                        OTPInput[2],
                                                        OTPInput[3],
                                                    ])
                                                }
                                            ></input>
                                        </div>
                                        <div className='w-16 h-16 '>
                                            <input
                                                maxLength='1'
                                                className='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700'
                                                type='text'
                                                name='
                                                id='
                                                onChange={(e) =>
                                                    setOTPInput([
                                                        OTPInput[0],
                                                        e.target.value,
                                                        OTPInput[2],
                                                        OTPInput[3],
                                                    ])
                                                }
                                            ></input>
                                        </div>
                                        <div className='w-16 h-16 '>
                                            <input
                                                maxLength='1'
                                                className='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700'
                                                type='text'
                                                name='
                                                id='
                                                onChange={(e) =>
                                                    setOTPInput([
                                                        OTPInput[0],
                                                        OTPInput[1],
                                                        e.target.value,
                                                        OTPInput[3],
                                                    ])
                                                }
                                            ></input>
                                        </div>
                                        <div className='w-16 h-16 '>
                                            <input
                                                maxLength='1'
                                                className='w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700'
                                                type='text'
                                                name='
                                                id='
                                                onChange={(e) =>
                                                    setOTPInput([
                                                        OTPInput[0],
                                                        OTPInput[1],
                                                        OTPInput[2],
                                                        e.target.value,
                                                    ])
                                                }
                                            ></input>
                                        </div>
                                    </div>

                                    <div className='flex flex-col space-y-5'>
                                        <div>
                                            <a
                                                onClick={() => verifyOTP()}
                                                className='flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm'
                                            >
                                                Verify Account
                                            </a>
                                        </div>

                                        <div className='flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500'>
                                            <p>Didn&apos;t receive code?</p>{' '}
                                            <a
                                                className='flex flex-row items-center'
                                                style={{
                                                    color: disable ? 'gray' : 'blue',
                                                    cursor: disable ? 'none' : 'pointer',
                                                    textDecorationLine: disable ? 'none' : 'underline',
                                                }}
                                                onClick={() => resendOTP()}
                                            >
                                                {disable ? `Resend OTP in ${timerCount}s` : 'Resend OTP'}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}