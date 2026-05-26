import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth.js'
import Header from '../components/Header.jsx'   

const ForgotPassword = () => {
    const [email,setEmail] = useState("")
    const [errors,setErrors] = useState("")
    const {loading, handleForgotPassword} = useAuth()
    const [timer, setTimer] = useState(0)
    const [isResend, setIsResend] = useState(false)

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);
    const handleSubmit= async (e) => {
        e.preventDefault()
        const response = await  handleForgotPassword({email})
        console.log(response)
        if(response){
            alert("Reset link sent to your email")
            setIsResend(true)
            setTimer(60)
        }
        else{
            alert("Something went wrong. Please try again later")
        }
    }
    if(loading){
        return(
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }
    return (
        <>
        <Header />
        <main>
        <div className="form-container">
            <h1>Forgot Password</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor='email'>Email</label>
                    <input
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                        setErrors(prev => ({
                            ...prev,
                            email:null
                        }))
                    } }
                    type="email" id="email" name='email' placeholder='Enter email address' />
                    {errors.email && 
                    <span className='error-message'>Invalid email</span>
                    }
                </div>

               
                <button 
                    className='button primary-button' 
                    disabled={timer > 0 || loading}
                    style={{ opacity: timer > 0 ? 0.7 : 1, cursor: timer > 0 ? 'not-allowed' : 'pointer' }}
                >
                    {!isResend ? 'Send Reset Link' : timer > 0 ? `Resend Link (${timer}s)` : 'Resend Link'}
                </button>
            </form>

            <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </div>
        </main>
     </>

  )
 
}

export default ForgotPassword