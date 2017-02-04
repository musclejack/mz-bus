const fs = require('fs'); 
const OAuth = require('wechat-oauth')
const router = require('koa-router')()
const config = require('../config').wechat
const api = require('../common/api_wehcat')
const cowarp = require('../common/util').cowarp
const client = new OAuth(config.appid, config.appsecret)
const redirectUrl = 'http://iammz.tunnel.2bdata.com/bus/oauth'
const baseUrl = 'http://iammz.tunnel.2bdata.com/bus/index'
const url = client.getAuthorizeURL(redirectUrl, 'state', 'snsapi_base')
const pcUrl = client.getAuthorizeURLForWebsite(redirectUrl)

// const proxy = require('../common/proxy')

const waiting = time => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve (time)
        }, time)
    })
}

const getAccessToken = code => {
    return new Promise((resolve, reject) => {
        client.getAccessToken(code, function (err, result) {
            if (err) resolve(err)
            else resolve(result)
        })
    })
}

const getUser = openid => {
    return new Promise((resolve, reject) => {
        client.getUser(openid, function (err, result) {
            if (err) resolve(err)
            else reject(err)
        })
    })
}

router.get('/index', async (ctx, next) => {
    console.log('index')
    if (ctx.session.openid) {
        //         const options = {
        //     hostname: host,
        //     port: port,
        //     path: path,
        //     method: method,
        //     headers: headers
        // }
        ctx.body = fs.readFileSync('./public/bus/index.html','utf-8') 
        // proxy(ctx.body, 'http://127.0.0.1', '8080', '', 'get')
        // ctx.response.redirect('http://user.mz1639632292.tunnel.2bdata.com/')
    } else {
        ctx.redirect(url)
    }
})

router.get('/oauth', async (ctx, next) => {
    const result = await getAccessToken(ctx.query.code)
    ctx.session.openid = result.data.openid
    console.log(result)
    ctx.session.accessToken = result.data.access_token
    ctx.response.redirect(baseUrl)
})

router.get('/jssdkConfig', async (ctx, next) => {

    const param = {
        debug: true,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQZone'],
        url: baseUrl
    }
    const result = await cowarp(api.getJsConfig(param))
    ctx.body = JSON.stringify(result)
})

module.exports = router

//bug
//没有cookie或者失效的时候，会多次访问接口
//
//
// 我的3000端口有以下逻辑
// index路由判断有没有openid的session，
// 有就跳转相关的前端页面
// 没有session，就静默授权，然后设置session
// 在跳转相关的前端页面
// 然后3000有其它操作后台api的接口
// 但一定要有session才能访问大部分接口

// 开发环境的前端在8080端口,使用了http proxy 中间件，
// 把接口代理到3000接口，但是没有session，所以大部分接口跑不通

// 最后说明下，3000端口用了内网穿透弄出外网给微信的

// 现在问题：我想开发环境的前端能访问3000的接口

