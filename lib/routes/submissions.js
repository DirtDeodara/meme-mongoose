const { Router } = require('express');
const Submission = require('../models/SubmissionSchema');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      type
    } = req.body;

    Submission
      .create({
        name,
        type
      })
      .then(createdSubmission => {
        res.send(createdSubmission);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Submission
      .find()
      .then(submissions => res.send(submissions))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Submission  
      .findById(req.params.id)
      .then(submission => res.send(submission))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Submission
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedSub => res.send(updatedSub))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Submission  
      .findByIdAndDelete(req.params.id,)
      .then(submission => res.send(submission))
      .catch(next);
  });
 

