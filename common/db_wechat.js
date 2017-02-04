const Redis = require('ioredis')
const config = require('../config')
const RedisConnect = new Redis({
             port: config.redis.redis_port,       
             host: config.redis.redis_host,  
             family: config.redis.redis_family,          
             password: config.redis.redis_password,
             db: config.redis.redis_db
        })
const RedisGet = key => {
    return RedisConnect.get(key)
}

const RedisSet = (key, val) => {
    return RedisConnect.set(key, val)
}

exports.RedisGet = RedisGet
exports.RedisSet = RedisSet