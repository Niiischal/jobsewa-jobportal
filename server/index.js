const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();
const dbConfig = require("./config/dbConfig");
dbConfig();

const port = process.env.PORT || 5000;

// Available routes
const userRoute = require("./routes/userRoute");
const jobRoute = require("./routes/jobRoute");
const interestRoute = require("./routes/interestRoute");
const resumeRoute = require("./routes/resumeRoute");
const notificationRoute = require("./routes/notificationRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");

app.use("/api/users", userRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/interests", interestRoute);
app.use("/api/resumes", resumeRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
