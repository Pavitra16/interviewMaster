import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { useInterview } from '../hooks/useInterview'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import Header from '../../auth/components/Header'

const GenerateReport = () => {

       const { user } = useAuth()
        const { loading, generateReport, reports } = useInterview()
        const [jobDescription, setJobDescription] = useState("")
        const [selfDescription, setSelfDescription] = useState("")
        
        const [resume,setResume] = useState("")
    
        const resumeInputRef = useRef()
        const navigate = useNavigate()
    
        const handleGenerateReport = async () => {
            const resumeFile = resumeInputRef.current.files[0]
            const data = await generateReport({ jobDescription, selfDescription, resumeFile })
            if (data?.id || data?._id) {
                navigate(`/interview/${data._id ?? data.id}`)
            }
        }
    
        if (loading) {
            return (
                <>
                    <Header />
                    <main className='loading-screen'>
                        <h1>Loading Your Interview Plan....</h1>
                    </main>
                </>
            )
        }
    
        const username = user?.username || 'User'
    
  return (
    <>
    <Header />
     <div className="fade-in-content">
        
                        {/* Back Button */}
                        <button 
                            onClick={() => {
                               
                                navigate("/home")}
                            }

                            className="back-to-dash-btn"
                        >
                            ← Back to Dashboard
                        </button>

                        <div className="page-header">
                            <h1>Create Your Custom <span className="highlight">Interview Plan</span></h1>
                            <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                        </div>

                        <div className="interview-card" style={{ marginTop: '1.5rem' }}>
                            <div className="interview-card__body">
                                <div className="panel panel--left">
                                    <div className="panel__header">
                                        <h2>Target Job Description</h2>
                                    </div>
                                    <textarea 
                                        onChange={(e) => { setJobDescription(e.target.value) }}
                                        className="panel__textarea" 
                                        name="jobDescription" 
                                        id="jobDescription" 
                                        placeholder='Paste the full job description here...'
                                    ></textarea>
                                </div>

                                <div className="panel-divider"></div>

                                <div className="panel panel--right">
                                    <div className="panel__header">
                                        <h2>Your Profile</h2>
                                    </div>

                                    <div className="upload-section">
                                        <label className="dropzone" htmlFor="resume">
                                            <div className="dropzone__icon">📤</div>
                                            <h4 className="dropzone__title">
                                                {
                                                    resume? "Resume uploaded successfully":"Click to upload or drag & drop"
                                                }
                                            </h4>
                                            <p className="dropzone__subtitle">
                                                {
                                                    resume || "PDF . Max size 5MB."
                                                }
                                                
                                            </p>
                                        </label>
                                        <input
                                        onChange={(e)=>{
                                            const file = e.target.files[0]
                                            if(file){
                                                setResume(file.name)
                                            }
                                        }} 
                                        ref={resumeInputRef} hidden type="file" name='resume' id='resume' accept='.pdf' />
                                    </div>

                                    <div className="self-description">
                                        <label htmlFor="selfDescription">Quick Self-Description</label>
                                        <textarea
                                            onChange={(e) => { setSelfDescription(e.target.value) }}
                                            className="panel__textarea panel__textarea--short" 
                                            name="selfDescription" 
                                            id="selfDescription" 
                                            placeholder='Briefly describe your experience, key skills, and years of experience...'
                                        ></textarea>
                                    </div>

                                    <div className="info-box">
                                        <div className="info-box__icon">i</div>
                                        <p><strong>Either a Resume</strong> or a Self Description is required to generate a personalized plan.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="interview-card__footer">
                                
                                <button 
                                    onClick={handleGenerateReport}
                                    className="generate-btn"
                                >
                                    Generate Interview Report
                                </button>
                            </div>
                        </div>
                    </div>
    </>
  )
}

export default GenerateReport