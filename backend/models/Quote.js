const mongoose = require("mongoose");
const { Schema } = mongoose;

const lineItemSchema = new Schema({
  description: { type: String, required: true },
  quantity:    { type: Number, default: 1, min: 0 },
  unitPrice:   { type: Number, required: true, min: 0 },
}, { _id: false });

const quoteSchema = new Schema({
  quoteNumber:     { type: String, unique: true },
  appointmentId:   { type: Schema.Types.ObjectId, ref: "Schedule", default: null },

  customerName:    { type: String, required: true },
  customerEmail:   { type: String, default: "" },
  customerPhone:   { type: String, default: "" },
  customerAddress: { type: String, default: "" },

  serviceType:     { type: String, default: "" },
  items:           { type: [lineItemSchema], default: [] },

  subtotal:        { type: Number, default: 0 },
  tps:             { type: Number, default: 0 },  // GST 5%
  tvq:             { type: Number, default: 0 },  // QST 9.975%
  total:           { type: Number, default: 0 },

  companyTPS:      { type: String, default: "" },  // filled later
  companyTVQ:      { type: String, default: "" },

  language:        { type: String, enum: ["fr", "en"], default: "fr" },
  notes:           { type: String, default: "" },
  status:          { type: String, enum: ["draft", "sent", "accepted", "declined"], default: "draft" },
}, { timestamps: true });

module.exports = mongoose.model("Quote", quoteSchema);
