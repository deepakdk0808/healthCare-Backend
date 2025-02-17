const redisClient = require('../config/redis');

const CACHE_EXPIRY=300  //cache expiry in 5 minutes

//function to get data from cache

const getCache=async(key)=>{
    return new Promise((res,rej)=>{
        if(!redisClient.connect){
            console.error('Redis client not connected');
            return rej(new Error('Redis client not connected'));
        }

        redisClient.get(key,(err,data)=>{
            if(err){
                console.error(`Error:${err.message}`);
                return rej(err);
            }
            res(data? JSON.parse(data):null);
        })
    })
}

//function to set Data

const setCache=async(key,value,expiry=CACHE_EXPIRY)=>{
return new Promise((res,rej)=>{
    if(!redisClient.connect){
        console.error("Redis client not connected");
        return rej(new Error("Redis client not connected"));
    }

    redisClient.set(key,JSON.stringify(value), "EX", expiry,(err)=>{
        if(err){
            console.error(`Error:${err.message}`);
            return rej(err);
        }
        res(true)
})
})
}

//delete the cache

const deleteCache=(key)=>{
    return new Promise((res,rej)=>{
        redisClient.del(key,(err,response)=>{
            if(err){
                return rej(err);
            }
            res(response)
        })
    })
}

module.exports={deleteCache,getCache,setCache}