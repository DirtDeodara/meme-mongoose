const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  top: String,
  image: { 
    type: String,
    required: true
  },
  bottom: String
});

module.exports = mongoose.model('Meme', memeSchema);
