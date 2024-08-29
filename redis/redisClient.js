require('dotenv').config();
const Redis = require('ioredis');
// Create a new Redis client using the URI
const redis_uri = process.env.REDIS_URL;
const redis = new Redis(redis_uri);
module.exports = redis;