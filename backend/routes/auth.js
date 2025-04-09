const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, confirmPassword, mainPhone, telephone, address, role } = req.body;

  if (!name || !email || !password || !confirmPassword || !mainPhone || !telephone || !address)
    return res.status(400).json({ message: "All fields are required" });

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mainPhone,
      telephone,
      address,
      role
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });
  
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Invalid email or password" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid email or password" });
  
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mainPhone: user.mainPhone,
          telephone: user.telephone,
          address: user.address,
          role: user.role,
        },
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;
