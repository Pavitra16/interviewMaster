const mongoose = require('mongoose');

/**
 * USER PROVIDED INFORMATION---
 * job description schema : String
 * interview questions and answers : String
 * self description : String
 * 
 * AI GENERATED INFORMATION---
 * 
 * matchScore:Number
 * 
 * Technical questions -- array[]
 *              [{
 *               question:"",
 *               intention:"",
 *               answer:""
 *               }]
 * 
 * Behavioural questions -- array[]
 *               [{
 *               question:"",
 *               intention:"",
 *               answer:""
 *               }]
 * Skill gaps -- array[]
 *  *              [{
 *               skill:"",
 *               severity:{
 *                type:"",
 *                 enum:["low","medium","high"]},
 *               }]
 * Preparation plan ---[{
 *                      day:Number,
 *                     focus_topic:String,
 *                     tasks:[String]
 *                       },{}..]
 */

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    },
    
},
{
        _id:false
    })

const behaviouralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    },
    
},
{
        _id:false
    })

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is required"]
    }
},
{
        _id:false
    }
)

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus topic is required"]
    },
    tasks:[{
        type:String,
        required:[true,"Task is required"]
    }]
})

const interviewReportSchema = new mongoose.Schema({
    title:{
        type:String
    },
    jobDescription:{
        type:String,
        required:[true,"Job description is required"]
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type:String,
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[ technicalQuestionSchema ],
    behaviouralQuestions:[ behaviouralQuestionSchema ],
    skillGaps:[ skillGapSchema],
    preparationPlan:[ preparationPlanSchema ] ,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }

},
{
    timestamps:true
})

const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema);
module.exports = interviewReportModel;