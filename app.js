require('babel-core/register')
const Koa = require('koa')
const convert = require('koa-convert')
const router = require('koa-router')()
const api = require('./router/api')
const admin = require('./router/admin')
const oauth = require('./router/oauth')
const wechat = require('./wechat/index')
const config = require('./config')
const session = require('koa-session2').default
const bodyparser = require('koa-bodyparser')()
const Store = require('./common/db_store')
const Util = require('./common/util')
const app = new Koa()

// 此处开始堆叠各种中间件
//...
console.log('mz')

app.use(convert(bodyparser))
app.use(session({
    key: config.redis.cook_key,
    maxAge: config.redis.maxAge,
    store: new Store({
        redis_port: config.redis.redis_port,
        redis_host: config.redis.redis_host,
        redis_family: config.redis.redis_family,
        redis_password: config.redis.redis_password,
        redis_db: config.redis.redis_db
    })
}))

app.use(require('koa-static')(__dirname + '/public'))

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`) // 打印URL
    await next() // 调用下一个middleware
})

app.use(async (ctx, next) => {
    const start = new Date().getTime() // 当前时间
    await next() // 调用下一个middleware
    const ms = new Date().getTime() - start // 耗费时间
    console.log(`Time: ${ms}ms`) // 打印耗费时间
})

//验证中间件，验证微信端已经api端
app.use(async (ctx, next) => {
    if (/^\/weixin.*/.test(ctx.request.url)) {
        await convert(wechat())(ctx, next)
    } else if (/^\/api.*/.test(ctx.request.url)) {
        if (ctx.session.openid) await next()
        else{ctx.status=403;ctx.body = Util.sendData(403, {msg: '没有openid或者openid过期'}, '没有openid或者openid过期')}
    } else if (/^\/adminapi.*/.test(ctx.request.url)) { 
        await next()
        // if (ctx.session.user||ctx.request.url === '/adminapi/login') await next()
        // else {ctx.status=403;ctx.body = Util.sendData(403, {msg: '没有登录或者登录过期'}, '没有登录或者登录过期')}
    } else {
        await next()
    }
})

router.use('/api', api.routes())
router.use('/adminapi', admin.routes())
router.use('/bus', oauth.routes())
// router.use('/admin')
app.use(router.routes())
app.listen(3000)
