const redis = require('redis');


const client = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

module.exports = client;