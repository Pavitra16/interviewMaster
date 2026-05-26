const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.contoller");
const upload = require("../middlewares/file.middleware");


const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @desc Generate interview report on the basis of user's resume, self description pdf and job description
 * @access Private
 */
interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)



interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportsController)
module.exports=interviewRouter;
