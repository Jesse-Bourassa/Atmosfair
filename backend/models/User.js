const mongoose = require("mongoose");
const equipmentSchema = require("./Equipment");


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mainPhone: { type: String, required: true },
  telephone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee', 'customer'], default: 'customer' },
  equipment: [equipmentSchema]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
