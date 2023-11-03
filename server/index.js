const express = require("express");
const app = express();
app.use(express.json())

require("dotenv").config();
const dbConfig = require("./config/dbConfig");
dbConfig();

const port = process.env.PORT || 5000;

// Available routes
const registerRoute = require("./routes/authentication/signup"); 
const loginRoute = require("./routes/authentication/login");

app.use("/api/register", registerRoute); 
app.use("/api/login", loginRoute);

app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
