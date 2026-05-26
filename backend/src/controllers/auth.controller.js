const userModel = require("../models/user.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

const sendResetLink  = require("../services/auth.service");



/**
 * @name registerUserController
 * @desc Register a new user, expecting username, email and password in the request body
 * @access Public
 */

async function registerUserController(req,res){
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"Please provide username, email and password"
        })
    }

    const ifUserExists = await userModel.findOne({
        $or: [{username},{email}]
    })

    if(ifUserExists){
        if(ifUserExists.username == username){
            return res.status(400).json({
                message: "Username already taken"
            })
        }
        else{
            return res.status(400).json({
                message : "Account already taken"
            })
        }
    }

    /*create new user*/

    /*hash the password*/
    const hash = await bcrypt.hash(password,10);
     const user = await userModel.create({
        username,
        email,
        password:hash
     })

     /*generate JWT token*/

     console.log(process.env.JWT_SECRET)

     const token = jwt.sign(
        {id:user._id, username : user.username},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
     )

     /*set in cookie*/

     res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false
     })

     res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
     })



}

/**
 * @name loginUserController
 * @desc Login an existing user, expecting email and password in the request body
 * @access Public
 */
async function loginUserController(req,res){
    const {email,password} = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Invalid email"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign(
        {id: user._id, username : user.username},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
     )
     res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false
     })

     res.status(200).json({
        message:"user logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
     })
    
}

/**
 *@name logoutUserController
 *@desc Logout a user by blacklisting the token and clearing the cookie
 *@access Public
 */
async function logoutUserController(req,res){
    const token = req.cookies.token 

    if(token){
        await tokenBlacklistModel.create({token})
    }
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });
    res.status(200).json({
        message:"user logged out successfully"
    })
}

/**
 * @route GET /api/auth/get-me
 * @description Get the details of the logged in user
 * @access Private
 */
  async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message:"user details fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
  }

  /**
   * @route /api/auth/forgot-password
   * @description Send a password reset link to the user's email
   * @access Public
   */
  async function forgotPasswordController(req,res){
    const { email } = req.body;
    //check if user with the given mail exists or not
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User with this email does not exist"
        })
    }
    const response = await sendResetLink({email})
    try{
    if(response.success){
        res.status(200).json({
            success:true,
            message:"Password reset link sent to your email"
        })
    }
    else {
        res.status(500).json({
           
            response
        })
    }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again later"
        })
    }


  }

  async function resetPasswordController(req,res){
    const {password, resetToken} = req.body
    try{
        const decoded = jwt.verify(resetToken, process.env.RESET_TOKEN)
        const hash = await bcrypt.hash(password,10)
        const response = await userModel.findByIdAndUpdate(decoded.id, {password:hash})
        if(response){
            res.status(200).json({
                success:true,
                message:"Password updated successfully"
            })
        }
        else{
            res.status(500).json({
                success:false,
                message:"Something went wrong! Please try again later"
            })
        }
    } 
    catch(err){
        throw err
    }
  }

module.exports =  {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
    forgotPasswordController,
    resetPasswordController,
}