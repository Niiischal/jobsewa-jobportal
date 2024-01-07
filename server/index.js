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

app.use("/api/users", userRoute); 



app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
