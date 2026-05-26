import React from 'react'
import "../auth.form.scss"
import { Link, useNavigate } from 'react-router';
import {useState} from 'react'

import {useAuth} from "../hooks/useAuth.js"
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Header from '../components/Header.jsx'



const Login = () => { 
    const navigate = useNavigate();
    const {loading,handleLogin} = useAuth();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwd, setPasswd] = useState(true)

    const [errors,setErrors] = useState("")
    
    const handleSubmit =async (e)=>{
        e.preventDefault();
        setErrors({})
       const response = await handleLogin({email,password});
       
       console.log(response)
       if(response.success){
            navigate("/home");
       }
       else{
        if(response.message === "Invalid email"){
         
                setErrors({
                    email:response.message
                })
            
        }
        else if(response.message === "Invalid password"){
            setErrors({password:response.message})
        }
        else{
            setErrors({general:response.message})
        }
       }
        
    }

    if(loading){
        return (
            <main>
                <h1>Loading...........</h1>
            </main>
        )
    }
    return (
        <>
        <Header />
        <main>
                <div className="form-container">
            <h1>Log in</h1>

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

                <div className="input-group">
                    <label htmlFor='password'>Password</label>
                    <div className='password-wrapper'>
                    <input
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                        setErrors(prev=>({
                            ...prev,
                            password:null
                        }))

                    }

                    }
                    type={passwd?"password":"text"} id="password" name='password' placeholder='Enter password' />
                    <button
                        type='button'
                        className='toggle-password'
                        onClick={()=> setPasswd(prev=>!prev)}
                        aria-label={passwd?"Show password":"Hide password"}
                    >
                        {passwd?<FaEye/>:<FaEyeSlash/>}
                    </button>
                    </div>
                    {errors.password && 
                     <span className='error-message'>Wrong password</span>
                        
                    }
                </div>

                <button className='button primary-button'>Login</button>
            </form>
             <p><Link to={"/forgot-password"}>Forgot Password</Link></p>
            <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </div>
        </main>
     </>

  )
 
}

export default Login