const express  = require("express");
const router   = express.Router();
const jwt      = require("jsonwebtoken");
const multer   = require("multer");
const pdfParse = require("pdf-parse");
const Quote    = require("../models/Quote");
const { parsePDF } = require("../utils/pdfParser");

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });

// ── Auth middleware (same pattern as users.js) ───────────────────────────────
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") return res.status(403).json({ message: "Admins only" });
  next();
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function calcTotals(items) {
  const subtotal = items.reduce((s, i) => s + (i.quantity * i.unitPrice), 0);
  const tps      = parseFloat((subtotal * 0.05).toFixed(2));
  const tvq      = parseFloat((subtotal * 0.09975).toFixed(2));
  const total    = parseFloat((subtotal + tps + tvq).toFixed(2));
  return { subtotal: parseFloat(subtotal.toFixed(2)), tps, tvq, total };
}

async function nextQuoteNumber() {
  const year   = new Date().getFullYear();
  const prefix = `ATM-${year}-`;
  const latest = await Quote.findOne({ quoteNumber: { $regex: `^${prefix}` } }).sort({ quoteNumber: -1 });
  if (!latest) return `${prefix}001`;
  const seq = parseInt(latest.quoteNumber.split("-")[2], 10) + 1;
  return `${prefix}${String(seq).padStart(3, "0")}`;
}

// ── Routes ────────────────────────────────────────────────────────────────────

// POST parse a supplier PDF — returns { supplier, supplierName, supplierTotal, items[] }
router.post("/parse-pdf", verifyToken, verifyAdmin, upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const data   = await pdfParse(req.file.buffer);
    const result = parsePDF(data.text);
    res.json(result);
  } catch (err) {
    console.error("PDF parse error:", err.message);
    res.status(500).json({ message: "Impossible de lire le PDF: " + err.message });
  }
});

// GET all quotes (optional ?month=YYYY-MM&status=accepted)
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { month, status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (month) {
      const start = new Date(`${month}-01`);
      const end   = new Date(start);
      end.setMonth(end.getMonth() + 1);
      filter.createdAt = { $gte: start, $lt: end };
    }
    const quotes = await Quote.find(filter).sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single quote
router.get("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "Not found" });
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create quote
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { items = [], ...rest } = req.body;
    const totals      = calcTotals(items);
    const quoteNumber = await nextQuoteNumber();
    const quote       = new Quote({ ...rest, items, ...totals, quoteNumber });
    await quote.save();
    res.status(201).json(quote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update quote (status change, edits, etc.)
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { items, ...rest } = req.body;
    const update = { ...rest };
    if (items) {
      update.items = items;
      Object.assign(update, calcTotals(items));
    }
    const quote = await Quote.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!quote) return res.status(404).json({ message: "Not found" });
    res.json(quote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE quote
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
