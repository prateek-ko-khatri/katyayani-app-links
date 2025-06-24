const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  fallbackUrl: { type: String, required: false, default: 'https://katyayanikrishidirect.com' },
  destination: { type: String, required: true },
  packageName: { type: String, default: '' },
  deeplink: { type: String, required: false },
  shortId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Url', urlSchema);