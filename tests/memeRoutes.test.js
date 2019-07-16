require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
const Meme = require('../lib/models/MemeSchema');

describe('meme routes tests', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a profile with POST', () => {
    return request(app)
      .post('/api/v1/memes')
      .send({
        top: 'the start of something witty',
        image: 'some URL',
        bottom: 'the end of something witty'
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          top: 'the start of something witty',
          image: 'some URL',
          bottom: 'the end of something witty'
        });
      });
  });

  it('can GET all memes from Db', async() => {
    const meme = await Meme.create({ 
      top: 'the start of something witty',
      image: 'some URL',
      bottom: 'the end of something witty'
    });
    return request(app)
      .get('/api/v1/memes')
      .then(res => {
        const memeJSON = JSON.parse(JSON.stringify(meme));
        expect(res.body).toEqual([memeJSON]);
      });
  });

  it('can get a meme by id', async() => {
    const meme = await Meme.create({
      top: 'the start of something witty',
      image: 'some URL',
      bottom: 'the end of something witty'
    });
    return request(app)
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          top: 'the start of something witty',
          image: 'some URL',
          bottom: 'the end of something witty'
        });
      });
  });

  it('can update a meme with PUT', async() => {
    const meme = await Meme.create({
      top: 'the start of something witty',
      image: 'some URL',
      bottom: 'the end of something witty'
    });
    return request(app)
      .put(`/api/v1/memes/${meme._id}`)
      .send({
        top: 'the start of something even more witty',
        image: 'some URL',
        bottom: 'the end of something even more witty'
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          top: 'the start of something even more witty',
          image: 'some URL',
          bottom: 'the end of something even more witty'
        });
      });
      
  });

  it('can DELETE a meme by id', async() => {
    const meme = await Meme.create({
      top: 'the start of something witty',
      image: 'some URL',
      bottom: 'the end of something witty'
    });
    return request(app)
      .delete(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body.image).toEqual('some URL');
      });
  });
});


