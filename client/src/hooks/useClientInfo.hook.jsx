import { useContext } from 'react'
import { ClientContext } from '../context/client.context'

export const useClientInfo = () => {
    return useContext(ClientContext)
}