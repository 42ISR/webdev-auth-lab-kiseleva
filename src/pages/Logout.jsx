import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'

const Logout = () => {
    const navigate = useNavigate()
    const clearSession = useUserStore((state) => state.clearSession)

    useEffect(() => {
        clearSession()
        navigate('/')
    }, [clearSession, navigate])

    return <></>
}

export default Logout
