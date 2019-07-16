const { Router } = require('express');
const Meme = require('../models/MemeSchema');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      topField,
      image,
      bottomField
    } = req.body;

    Meme  
      .create({
        topField,
        image,
        bottomField
      })
      .then(createdMeme => {
        res.send(createdMeme);
      })
      .catch(next);
  });
