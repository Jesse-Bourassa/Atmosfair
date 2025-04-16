const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

// 🔐 Middleware to restrict to admin only
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) return res.status(401).json({ message: "No token provided" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123"); // Use same key as in login
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  };

const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

// ✅ GET all customers
router.get("/customers", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch customers" });
  }
});

module.exports = router;