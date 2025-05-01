require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users"); 
const scheduleRoutes = require("./routes/schedule");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);            
app.use("/api/schedule", scheduleRoutes);

app.get("/", (req, res) => {
  res.send("HVAC Scheduling API is runnings");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
