const { PDFParse } = require('pdf-parse');
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * 
 * controller to generate interview report based on user self description, resume and job
 */
async function generateInterviewReportController(req,res){
    try{

    console.log("API HIT")
        let resumeText = ""
        if (req.file) {
            // PDFParse.getText() may return an object with `text` or `pages`,
            // normalize to a single string to satisfy Mongoose string field
            const parsed = await new PDFParse({ data: req.file.buffer }).getText()
            if (parsed && typeof parsed === 'object') {
                if (typeof parsed.text === 'string') {
                    resumeText = parsed.text
                } else if (Array.isArray(parsed.pages)) {
                    resumeText = parsed.pages.map(p => (p && p.text) ? p.text : '').join('\n')
                } else {
                    resumeText = String(parsed)
                }
            } else {
                resumeText = String(parsed)
            }
        }
    console.log("PDF PARSED")
    
    const {selfDescription, jobDescription} = req.body;

    const interviewReportByAI = await generateInterviewReport({
        resume: resumeText,
        selfDescription,
        jobDescription
    })

    console.log("ai response")
    console.log(interviewReportByAI);
    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume: resumeText,
        selfDescription,
        jobDescription,
        ...interviewReportByAI
    })
    console.log("db saved")
    res.status(201).json({
        message:"Interview report generated successfully",
        interviewReport
    })
}
catch(err){
    console.log(err);
}

 
}

/**
 * 
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by the id
 * @access PRIVATE
 */

async function getInterviewReportByIdController(req,res){
    const {interviewId}=req.params
    const interviewReport = await interviewReportModel.findOne({_id:interviewId, user:req.user.id})

    if(!interviewReport){
        return res.status(400).json({
            message:"Interview report not found"
        })
    }
    res.status(200).json({
        message:"Interview Report fetched successfully",
        interviewReport


    })

}

/**
 * @route  
 * @description get all interview reports of the logged in user
 */

async function getAllInterviewReportsController(req,res){
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

module.exports = { generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
 }