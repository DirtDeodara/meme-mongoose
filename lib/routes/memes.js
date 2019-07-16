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
  })

  .get('/', (req, res, next) => {
    Meme  
      .find()
      .then(memes => res.send(memes))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Meme
      .findById(req.params.id)
      .then(meme => res.send(meme))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Meme  
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedMeme => res.send(updatedMeme))
      .catch(next);

  })

  .delete('/:id', (req, res, next) => {
    Meme  
      .findByIdAndDelete(req.params.id)
      .then(meme => res.send(meme))
      .catch(next);
  });
