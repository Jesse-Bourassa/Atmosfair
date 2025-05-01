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

router.get('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add new equipment to a customer
router.post('/:id/equipment', verifyToken, verifyAdmin, async (req, res) => {
  const { brand, model, serialNumber, comment } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.equipment.push({ brand, model, serialNumber, comment });
    await user.save();

    res.status(200).json({ message: "Equipment added", equipment: user.equipment });
  } catch (err) {
    console.error("Failed to add equipment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE equipment item by index
router.delete('/:id/equipment/:index', verifyToken, verifyAdmin, async (req, res) => {
  const { id, index } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.equipment.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Deleted", equipment: user.equipment });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE equipment item by index
router.put('/:id/equipment/:index', verifyToken, verifyAdmin, async (req, res) => {
  const { id, index } = req.params;
  const { brand, model, serialNumber, comment } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.equipment[index]) return res.status(404).json({ message: "Equipment not found at this index" });

    // Update the fields
    user.equipment[index].brand = brand;
    user.equipment[index].model = model;
    user.equipment[index].serialNumber = serialNumber;
    user.equipment[index].comment = comment;

    await user.save();

    res.status(200).json({ message: "Equipment updated", equipment: user.equipment });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;