import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Header from '../components/Header.jsx'
import '../../../style/profile.style.scss'

const Profile = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const onLogout = async () => {
        await handleLogout()
        navigate('/')
    }

    if (!user) return null

    // Get initials for profile avatar icon
    const initials = user.username ? user.username.slice(0, 2).toUpperCase() : 'US'

    return (
        <>
            <Header />
            <main className="profile-page">
                <div className="profile-card">
                    <div className="profile-card__header">
                        <div className="avatar-placeholder">{initials}</div>
                        <h1>{user.username}</h1>
                        <p>InterviewMaster Member</p>
                    </div>

                    <div className="profile-card__details">
                        <div className="detail-group">
                            <label>Username</label>
                            <div className="value">{user.username}</div>
                        </div>

                        <div className="detail-group">
                            <label>Email Address</label>
                            <div className="value">{user.email}</div>
                        </div>
                    </div>

                    <div className="profile-card__actions">
                        <button onClick={onLogout} className="logout-btn">
                            Log Out
                        </button>
                        <Link to="/home" className="back-btn">
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Profile
