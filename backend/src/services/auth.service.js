require("dotenv").config();
const jwt  = require("jsonwebtoken")
const userModel = require("../models/user.model")
const nodemailer = require("nodemailer")
const transporter = require("../config/email.config")

async function sendResetLink({email}){
    try{
        const user = await userModel.findOne({email})
                const resetToken = jwt.sign(
                    {id:user._id, email:user.email},
                    process.env.RESET_TOKEN,
                    {expiresIn:"10m"}

                )
                const resetLink =`${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

                console.log(resetLink)
                await transporter.sendMail({
    from: process.env.BREVO_EMAIL,
    to: email,
    subject: "Reset Password",
    html: `
        <h2>Password Reset</h2>
        <p>Click below to reset password:</p>
        <a href="${resetLink}">Reset Password</a>
    `
})

                if(mail.accepted.length > 0){
                    console.log("Email sent successfully")
                    return {
                    success:true,
                    message:"Reset link sent to your email",
                    resetLink
                }
                }
                else{
                    console.log("Failed to send email")
                    return{
                        success:false,
                        message:"Failed to send reset link. Please try again later"
                    }
                }
                
                
}
    catch(err){
        console.log(err)
        return{
            success:false,
            message:"Something went wrong"
        }
    }



   
}



module.exports = sendResetLink