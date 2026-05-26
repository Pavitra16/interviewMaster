const {Router} = require("express")

const authRouter = Router();
const authController = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
 authRouter.post("/register", authController.registerUserController)


 /**
  * @route POST api/auth/logn
  * @desc Login a user with email and password
  * @access Public
  */
 authRouter.post("/login",authController.loginUserController)


 /**
  * @route GET /api/auth/logout
  * @desc Logout a user and blacklist the token 
  * @access Public
  */

    authRouter.get("/logout", authController.logoutUserController)

    /**
     * @route GET /api/auth/get-me
     * @description Get the currently logged in user's details
     * @access Private
     */
     authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

      /**
  * @route POST api/auth/forgot-password
  * @desc Send a password reset link to the user's email
  * @access Public
  */
 authRouter.post("/forgot-password",authController.forgotPasswordController)

/**
 * @route POST /api/auth/reset-pasword
 * @description Reset the user's password using the token sent to their email
 * @access Public
 */
     
authRouter.post("/reset-password",authController.resetPasswordController)
    module.exports = authRouter; 