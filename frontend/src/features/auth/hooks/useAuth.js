import { useContext } from "react";
import { AuthContext } from "../services/auth.context.jsx";
import { login, logout, register, getMe, forgotPassword, resetPassword } from "../services/auth.api.js";
import { useEffect } from "react";

export const useAuth = () =>{
    const context = useContext(AuthContext);
    const {user,setUser,loading,setLoading} = context;

    const handleLogin =async ({email,password}) => {
        try{
            setLoading(true);
            const data = await login({email,password});

            setUser(data.data.user);
            return{
                success:true,
                data:data.data.user,
            }
        }
        catch(err){
            return {
                success:false,
                 message: err.response?.data?.message || "Something went wrong"

            }
        }
        finally{
            setLoading(false);
        }

    }

    const handleRegister = async ({username,email,password})=>{
        try{
            setLoading(true);
            const data = await register({username,email,password});
            
            setUser(data.data.user);
            return {
                success:true,
                data:data.data.user,
            }
        }
        catch(err){
          
            return{
                success:false,
                message: err.response?.data?.message || "Something went wrong"
            }
        }
        finally{
            setLoading(false);
        }

        
    }

    const handleLogout = async()=>{
        try{
            setLoading(true);
            const data = await logout();
            setUser(null);
            return{
                success:true
            }
        }
        catch(err){
            return{
                success:false,
                message:err.response?.data?.message || "Something went wrong"
            }

        }
        finally{
            setLoading(false);
        }
        
        
    }

    const handleForgotPassword = async ({email})=>{
        try{
            setLoading(true);
            const data = await forgotPassword({email})
            console.log(data)
            if(data.data.success){
                return{
                    success:true,
                    message:data.data.message
                }
            }
            
        }
        catch(err){
            return{
                success:false,
                message:err.response?.data?.message || "Something went wrong"
            }
        }
        finally{
            setLoading(false);
        }
    }

    const handleResetPassword = async ({password, resetToken})=>{
        try{
            setLoading(true)
            const response = await resetPassword({password,resetToken})
            if(response.success){
                return{
                    success:true,
                    message:response.message
                }
            }
            else{
                return{
                    success:false,
                    message:response.message || "Something went wrong"
                }
            }

        }
        catch(err){
            console.log(err)
            return{
                success:false,
                message:err.response?.data?.message || "Something went wrong"
            }

        }
    }
     useEffect(()=>{
        const getAndSetUser = async()=>{
            try{
                const data = await getMe();
                setUser(data.data.user)
                return{
                    success:true,
                    data:data.data.user,
                }
            }
            catch(err){
                return{
                    success:false,
                    message:""

                }
            }
            finally{
                setLoading(false);
            }
        }
        getAndSetUser();
     },[])

    return {user,loading,handleLogin,handleLogout,handleRegister,handleForgotPassword,handleResetPassword};
}