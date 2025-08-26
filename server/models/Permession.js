const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  role_id: { type: Number },
  permission: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Permission', permissionSchema);