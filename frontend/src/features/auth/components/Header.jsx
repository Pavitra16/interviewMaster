import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import '../../../style/header.style.scss'

const Header = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const onLogout = async () => {
        await handleLogout()
        navigate('/')
    }

   

    return (
        <header className="app-header">
            <Link to={user ? "/home" : "/"} className="app-header__logo">
                InterviewMaster
            </Link>
            <nav className="app-header__nav">
                {user ? (
                    <>
                        <Link 
                            to="/home" 
                            className={`app-header__link ${location.pathname === '/home' ? 'app-header__link--active' : ''}`}
                        >
                            Dashboard
                        </Link>
                        <Link 
                            to="/profile" 
                            className={`app-header__link app-header__link--profile ${location.pathname === '/profile' ? 'app-header__link--active' : ''}`}
                        >
                            👤 {user.username}
                        </Link>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/" 
                            className={`app-header__link ${location.pathname === '/' ? 'app-header__link--active' : ''}`}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/login" 
                            className={`app-header__link ${location.pathname === '/login' ? 'app-header__link--active' : ''}`}
                        >
                            Login
                        </Link>
                        <Link 
                            to="/register" 
                            className={`app-header__link ${location.pathname === '/register' ? 'app-header__link--active' : ''}`}
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header
