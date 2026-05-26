import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials:true
})


export async function register({username,email,password}){
    try{
    const response = await api.post("/api/auth/register",
    {username,email,password}
   )
   return response; 
}
catch(err){
    throw err
}
}

export async function login({email,password}){
    try{
        const response = await api.post("/api/auth/login",
            {email,password},
           
        )
        return response;
    }
    catch(err){
        throw err
    }
}

export async function logout(){
    try{
        const response = await api.get("/api/auth/logout",
           
        )
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export async function getMe(){
    try{
        const response = await api.get("/api/auth/get-me",
           
        )
        return response.data;
    }
    catch(err){
       throw err
    }
}


export async function forgotPassword({email}){
    try{
        const response = await api.post("/api/auth/forgot-password",{email})
        console.log(response)
        return response;
        
    }
    catch(err){
        throw err
    }
}

export async function resetPassword({password,resetToken}){
    try{
        const response = await api.post("/api/auth/reset-password",{password,resetToken})
        console.log(response.data)
        return response.data
    }
    catch(err){
        throw err;
    }
}