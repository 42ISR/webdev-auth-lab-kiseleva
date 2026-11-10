import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import { api } from '../api/api'
import { useUserStore } from '../store/useUserStore'
import { getErrorMessage } from '../utils/getErrorMessage'

const Login = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const setSession = useUserStore((state) => state.setSession)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const user = {
            username: e.target.username.value,
            password: e.target.password.value,
        }

        try {
            const data = await api.loginUser(user)
            setSession(data)
            navigate('/')
        } catch (err) {
            console.error(err)
            setError(getErrorMessage(err))
        }
    }

    return (
        <div className="container">
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-icon">🔐</div>
                    <h1 className="auth-title">Вход</h1>
                    <p className="auth-subtitle">Войдите в свой аккаунт</p>
                </div>

                {error && <div className="alert alert-error active">{error}</div>}

                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Имя пользователя</label>
                        <Input
                            type="text"
                            className="form-input"
                            name="username"
                            placeholder="Введите имя пользователя"
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Пароль</label>
                        <Input
                            type="password"
                            className="form-input"
                            name="password"
                            placeholder="Введите пароль"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <Button type="submit" className="btn-submit">
                        Войти
                    </Button>
                </form>

                <div className="auth-divider">или</div>

                <div className="auth-link">
                    Нет аккаунта?
                    <Link to={'/register'}>Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
