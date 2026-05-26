import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Header from '../components/Header.jsx'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Register = () => {

    const navigate = useNavigate()

    const { loading, handleRegister } = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")
    const [passwd, setPasswd] = useState(true)

const handleSubmit = async (e) => {

    e.preventDefault()

    setErrors({})

    const response = await handleRegister({
        username,
        email,
        password
    })
    console.log(response)

    if(response.success){

    
        navigate("/home")
 

} else {

        if(response.message === "Username already taken"){

            setErrors({
                username: response.message
            })

        } else if(response.message === "Account already exists with this email id"){

            setErrors({
                email: "Email already taken"
            })

        } else {

            setErrors({
                general: response.message
            })

        }
    }
}
    return (
        <>
        <Header />
        <main className="auth-page">

            <div className="form-container">

                <h1 >
                    Register
                </h1>

                <form  className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="input-group">

                        <label htmlFor='username'>
                            Username
                        </label>

                        <input
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)

                                setErrors(prev => ({
                                    ...prev,
                                    username: null
                                }))
                            }}
                            type="text"
                            id="username"
                            placeholder="Enter username"
                        />  
                         {errors.username && 
                        <span className='error-message'>Username is already taken</span>
                        }

                    </div>

                    <div className="input-group">

                        <label htmlFor='email'>
                            Email
                        </label>

                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setErrors(prev=>({
                                    ...prev,
                                    email:null
                                }))

                            }}
                            type="email"
                            id="email"
                            name='email'
                            placeholder='Enter email address'
                        />

                        {errors.email && 
                        <span className='error-message'>Account is already taken</span>
                        }

                    </div>

                    <div className="input-group">

                        <label htmlFor='password'>
                            Password
                        </label>
                        <div className='password-wrapper'>
                        <input
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setErrors(prev=>({
                                    ...prev,
                                    password:null
                                }))
                            }}
                            type={passwd?"password" : "text"}
                            id="password"
                            name='password'
                            placeholder='Enter password'
                        />
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

                    <button
                        type="submit"
                        className='button primary-button auth-button'
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                <p className="auth-footer">
                    Already have an account?
                    <Link to={"/login"}>
                        Login
                    </Link>
                </p>

            </div>

        </main>
        </>
    )
}

export default Register