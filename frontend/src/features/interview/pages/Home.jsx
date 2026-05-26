import { useState, useRef, useEffect } from 'react'
import "../style/home.style.scss"
import { useInterview } from "../hooks/useInterview.js"
import { useNavigate } from "react-router"
import { useAuth } from '../../auth/hooks/useAuth.js'
import Header from '../../auth/components/Header.jsx'

const Home = () => {
    const { user } = useAuth()
    const { loading, generateReport, reports } = useInterview()
   
    
    const navigate = useNavigate()

  
    if (loading) {
        return (
            <>
                <Header />
                <main className='loading-screen'>
                    <h1>Loading ....</h1>
                </main>
            </>
        )
    }

    const username = user?.username || 'User'

    return (
        <>
            <Header />
            <main className='home-page'>
               
                    <div className="fade-in-content">
                        {/* Welcome greeting card */}
                        <div className="welcome-box">
                            <h1 className="welcome-box__title">Hy! {username}</h1>
                            <p className="welcome-box__subtitle">
                                Ready to ace your next technical or behavioral interview? 
                                Start your preparation by uploading your target job details and profile.
                            </p>
                            <button 
                                onClick={() => {
                                    
                                    navigate("/generate-report")
                                }}
                                className="start-prep-btn"
                            >
                                Start New Preparation ⚡
                            </button>
                        </div>

                        {/* Previous reports listed underneath */}
                        <div className="interview-card" style={{ marginTop: '2.5rem' }}>
                            <div className="reports-section">
                                <div className="reports-section__header">
                                    <h2>Your Previous Reports</h2>
                                    <p>{reports?.length || 0} reports generated</p>
                                </div>

                                <div className="reports-list">
                                    {(reports || []).length > 0 ? (
                                        reports.map(report => (
                                            <div
                                                key={report._id}
                                                className="report-card"
                                                onClick={() => navigate(`/interview/${report._id}`)}
                                            >
                                                <div className="report-card__top">
                                                    <h3>{report.title || "Untitled Position"}</h3>
                                                    <span className={`score-badge ${
                                                        report.matchScore >= 80
                                                            ? "score-badge--high"
                                                            : report.matchScore >= 60
                                                            ? "score-badge--mid"
                                                            : "score-badge--low"
                                                    }`}>
                                                        {report.matchScore}%
                                                    </span>
                                                </div>
                                                <p className="report-card__date">
                                                    {new Date(report.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="empty-reports">
                                            No interview reports generated yet. Click "Start New Preparation" to begin.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
              
            </main>
        </>
    )
}

export default Home