// All keys will be stored in a seperate file. Will house the host name and port required to connect to redis
const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    // If loose connection to server try to connect once every second
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib(index){
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}

// watch redis for whenever ther is a new value
sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)));
})

sub.subscribe('insert');