
const {GoogleGenAI} = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");


const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    title: z.string()
        .optional()
        .describe("The title of the job for which the interview report is generated(only give the role of job nothing else )"),

    technicalQuestions: z.array(
        z.object({
            question: z.string().describe("The technical question that can be asked"),
            intention: z.string().describe("The intention of interviewer behind the question"),
            answer: z.string().describe("How to answer this question, what points to be covered in the answer")
        })
    ).describe("A list of technical questions that can be asked in the interview, along with the intention behind the question and how to answer it"),

    behaviouralQuestions: z.array(
        z.object({
            question: z.string().describe("The behavioural question that can be asked"),
            intention: z.string().describe("The intention of interviewer behind the question"),
            answer: z.string().describe("How to answer this question, what points to be covered in the answer")
        })
    ).describe("A list of behavioural questions that can be asked in the interview, along with the intention behind the question and how to answer it"),

    skillGaps: z.array(
        z.object({
            skill: z.string().describe("The skill that the candidate is lacking"),
            severity: z.enum(["low", "medium", "high"])
                .describe("The severity of the skill gap")
        })
    ).describe("A list of skill gaps that the candidate has, along with the severity of each gap"),

    preparationPlan: z.array(
        z.object({
            day: z.number().describe("The day number of the preparation plan"),
            focus: z.string().describe("The topic that the candidate should focus on that day")
        })
    ).describe("A list of days in the preparation plan, along with the topic to focus on each day"),

    matchScore: z.number()
        .describe("A score between 0 and 100 indicating how well the candidate matches the job description"),
})

async function generateInterviewReport({resume,selfDescription,jobDescription}){
   
    const prompt = `You are an interview preparation assistant. Your task is to generate an interview report for a candidate based on their resume, self description and the job description. The interview report should include the following sections:

1. Technical Questions: A list of technical questions that can be asked in the interview, along with the intention behind each question and how to answer it.       
2. Behavioural Questions: A list of behavioural questions that can be asked in the interview, along with the intention behind each question and how to answer it.
3. Skill Gaps: A list of skill gaps that the candidate has, along with the severity of each gap (low, medium, high).
4. Preparation Plan: A list of days in the preparation plan, along with the topic to focus on each day.
5. Match Score: A score between 0 and 100 indicating how well the candidate matches the job description.

Return only valid JSON

Do not include markdown.
Do not include explanations.
Do not include extra text.

Use this EXACT structure:

{
  "title":"",
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "behaviouralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "skillGaps": [
    {
      "skill": "",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": ""
    }
  ],
  "matchScore": 0
}


Here is the candidate's resume:
${resume}   
Here is the candidate's self description:
${selfDescription}
Here is the job description:
${jobDescription}


`
   
    const response = await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
        }
   })

  let parsedData;
  try {
    parsedData = JSON.parse(response.text);
  } catch (parseError) {
    console.error("Failed to parse AI response as JSON:", response.text);
    throw parseError;
  }

  const validatedData = interviewReportSchema.parse(parsedData);

return validatedData;
}

module.exports = generateInterviewReport;