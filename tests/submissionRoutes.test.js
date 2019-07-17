require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
const Submission = require('../lib/models/SubmissionSchema');

describe('submission routes tests', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a submission with POST', () => {
    return request(app)
      .post('/api/v1/submissions')
      .send({
        name: 'triangle',
        type: 'strangle'
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'triangle',
          type: 'strangle'
        });
      });
  });

  it('can GET an all submissions', async() => {
    const submission = await Submission.create({
      name: 'triangle',
      type: 'strangle'
    });
    return request(app)
      .get('/api/v1/submissions')
      .then(res => {
        const submissionJSON = JSON.parse(JSON.stringify(submission));
        expect(res.body).toEqual([submissionJSON]);
      });
  });
  
  it('can GET a submission by id', async() => {
    const submission = await Submission.create({
      name: 'triangle',
      type: 'strangle'
    });
    return request(app)
      .get(`/api/v1/submissions/${submission._id}`)
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'triangle',
          type: 'strangle'
        });
      });
  });

  it('can update a submission with PUT', async() => {
    const submission = await Submission.create({
      name: 'triangle',
      type: 'strangle'
    });
    return request(app)
      .put(`/api/v1/submissions/${submission._id}`)
      .send({
        name: 'arm bar',
        type: 'joint lock'
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'arm bar',
          type: 'joint lock'
        });
      });
  });

  it('can DELETE a submission from the Db', async() => {
    const submission = await Submission.create({
      name: 'triangle',
      type: 'strangle'
    });
    return request(app)
      .delete(`/api/v1/submissions/${submission._id}`)
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'triangle',
          type: 'strangle'
        });
      });
  });

});
