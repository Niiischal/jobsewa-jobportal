const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors());

require("dotenv").config();
const dbConfig = require("./config/dbConfig");
dbConfig();

const port = process.env.PORT || 5000;

// Available routes
const userRoute = require("./routes/userRoute"); 
const jobRoute = require("./routes/jobRoute"); 
const interestRoute = require("./routes/interestRoute")
const resumeRoute = require("./routes/resumeRoute")

app.use("/api/users", userRoute); 
app.use("/api/jobs", jobRoute); 
app.use("/api/interests", interestRoute)
app.use("/api/resumes", resumeRoute)



app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
