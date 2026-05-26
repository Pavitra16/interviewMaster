import axios from "axios"
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials:true
})

/**
 * 
 * @description Generate interview report for the logged in user
 */
export const generateInterviewReport = async ({jobDescription,selfDescription,resumeFile}) =>{
    const formData = new FormData()
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)
    formData.append("resume",resumeFile);

    const response = await api.post("/api/interview/",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    return response.data;
}

/**
 * 
 * @description Get interview report by interviewId
 */
export const getInterviewReportById = async(interviewId) =>{
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data
}

/**
 * 
 * @description Get all interview reports of the logged in user
 */
export const getAllInterviewReports = async() =>{
    const response =await api.get("/api/interview/")
    if(response){
        console.log(response)
    }
    else{
        console.log("no response")
    }
    return response.data;
}