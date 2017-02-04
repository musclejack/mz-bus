const WechatAPI = require('co-wechat-api')
const config = require('../config').wechat
const Redis = require('./db_wechat')

const api = new WechatAPI(config.appid, config.appsecret, function* () {
    // 传入一个获取全局token的方法
    const token = yield Redis.RedisGet('token')
    return JSON.parse(token);
}, function* (token) {
    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
    // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
    yield Redis.RedisSet('token', JSON.stringify(token))
})

api.registerTicketHandle(getTicketToken, saveTicketToken)

function* getTicketToken (type) {
    const token = yield Redis.RedisGet(type)
    return JSON.parse(token)
}

function* saveTicketToken (type, _ticketToken) {
    yield Redis.RedisSet(type, JSON.stringify(_ticketToken))
}
module.exports = api