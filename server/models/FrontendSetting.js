const mongoose = require('mongoose');

const frontendSettingSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String } // longtext maps to String
}, { timestamps: true });

module.exports = mongoose.model('FrontendSetting', frontendSettingSchema);