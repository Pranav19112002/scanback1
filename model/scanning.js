// scanModel.js
const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({ 

  sid: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  imageurls: [],
  display: { type: Boolean, default: true },
});

const scanModel = mongoose.model('scans', scanSchema);

module.exports = scanModel;
