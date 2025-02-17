const redis=require('ioredis');

// command to check--1.redis-server --version,  2.redis-server  3.redis-cli

const client=redis.createClient({
    host:process.env.REDIS_HOST || "127.0.0.1",
    port:process.env.REDIS_PORT || 6379,
});

client.on('connect',()=>{
    console.log('Redis client connected');
})

client.on('error',(error)=>{
    console.error(`Error:${error.message}`);
})


module.exports=client;
