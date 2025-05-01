const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  brand: String,
  model: String,
  serialNumber: String,
  comment: String,
  dateAdded: { type: Date, default: Date.now } // 👈 add this
}, { _id: false }); // _id not needed for subdocuments

module.exports = equipmentSchema;