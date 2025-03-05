require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("HVAC Scheduling API is runnings");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
