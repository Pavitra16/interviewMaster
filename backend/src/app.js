const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app =express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            "https://interview-master-pi.vercel.app",
            "http://localhost:5173",
            "http://localhost:5174"
        ].filter(Boolean).map(url => url.replace(/\/$/, "")); // Remove trailing slashes

        if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))
// require all the routes here
const authRouter = require("./routes/auth.route");
const interviewRouter = require("./routes/interview.routes");


// using all the routes here
app.use("/api/auth", authRouter);
app.use("/api/interview",interviewRouter);



module.exports=app;