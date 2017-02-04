const config = {
    mysql: {
        host: "localhost",  
        user: "root",  
        password: "root",  
        database: "bus",  
        port: 3306
    },
    wechat: {
        appid: "wx5a1aa7dc3de2308b",
        appsecret: "d4624c36b6795d1d99dcf0547af5443d",
        token: "weim"
    },
    redis:{
        redis_host: "localhost",
        redis_port: "6379",
        redis_db: 0,
        redis_password:"",
        redis_family: 4,
        cook_key: "mz",
        maxAge: 2 * 3600 * 1000
    }
}

module.exports = config;