
const Redis = require('ioredis');
// Create a new Redis client using the URI
const redis = new Redis('redis://default:AcDwAAIjcDE0NzY3YzI1NTY4MjE0NWZjYTRjMjdkNTg3NmEwZTIxM3AxMA@renewing-sunbeam-49392.upstash.io:6379', {
    tls: 10
});

module.exports = redis;