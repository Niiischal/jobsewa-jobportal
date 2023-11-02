const express = require("express");

require("dotenv").config();
const dbConfig = require("./config/dbConfig");
dbConfig();

const app = express();
const port = 5000;

//Middleware
app.use(express.json())

// Available routes
app.use('/api/register', require('./routes/authentication/signup'))
app.use("/api/login", require("./routes/authentication/login"));

app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
