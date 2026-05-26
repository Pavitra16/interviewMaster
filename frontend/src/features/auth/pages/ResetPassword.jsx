import React from 'react'
import {useState ,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Header from '../components/Header.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import "../auth.form.scss"

const ResetPassword = () => {
    const [password,setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwd,setPasswd]=useState("")
    const [confirm,setConfirm] = useState("")
    const [resetToken, setResetToken] = useState("")
    const {loading, handleResetPassword} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const token = params.get("token")
        setResetToken(token)
    },[location.search])
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            alert("Passwords do not match")
            return{
                success:false,
                message:"Passwords do not match"
            }
        }
        else{
           const response = await handleResetPassword({password, resetToken})
            if(response.success){
                alert("Password reset successful. Please login with your new password.")
                navigate("/login")

            }
            else{
                alert("Something went wrong. Please try again later.")
                navigate("/forgot-password")
            }
        }




    }
   return (
        <>
        <Header />
        <main>
                <div className="form-container">
            <h1>Reset Password</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor='password'>New Password</label>
                    <div className='password-wrapper'>
                    <input
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }} 
                    type={passwd?"password" : "text"} id="password" name='password' placeholder='Enter new password' />
                    <button
                        type='button'
                        className='toggle-password'
                        onClick={()=> setPasswd(prev=>!prev)}
                        aria-label={passwd?"Show password":"Hide password"}
                    >
                    {passwd?<FaEye/>:<FaEyeSlash/>}
                    </button>
                    </div>
                    
                </div>

                <div className="input-group">
                    <label htmlFor='confirmPassword'>Confirm New Password</label>
                    <div className='password-wrapper'>
                    <input
                    value={confirmPassword}
                    onChange={(e)=>{
                        setConfirmPassword(e.target.value)
                        
                    } }
                    type={confirm?"password" : "text"} id="confirmPassword" name='confirmPassword' placeholder='Confirm new password' />
                    <button
                        type='button'
                        className='toggle-password'
                        onClick={()=> setConfirm(prev=>!prev)}
                        aria-label={confirm?"Show password":"Hide password"}
                    >
                    {confirm?<FaEye/>:<FaEyeSlash/>}
                    </button>
                    </div>
                    
                </div>

                <button className='button primary-button'>Reset Password</button>
            </form> 
        </div>
                 
        </main>
     </>

  )
}

export default ResetPassword