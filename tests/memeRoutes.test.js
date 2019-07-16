require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
const Meme = require('../lib/models/MemeSchema');

describe('meme routes tests', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/pets', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it.only('can create a profile with POST', () => {
    return request(app)
      .post('/api/v1/memes')
      .send({
        topField: 'the start of something witty',
        image: 'some URL',
        bottomField: 'the end of something witty'
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          topField: 'the start of something witty',
          image: 'some URL',
          bottomField: 'the end of something witty'
        });
      });
  });
})